"use client";

import * as CryptoJS from "crypto-js";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

type Task = {
  message: string;
  difficulty: number;
};

function calculateHash(data: string, nonce: number): string {
  const blockData = data + nonce.toString();
  return CryptoJS.SHA256(blockData).toString(CryptoJS.enc.Hex);
}

async function proofOfWork(
  data: string,
  difficulty: number,
  setHash: (hash: string) => void,
  nonce: number,
  setNonce: (nonce: number) => void,
  stopSignal: React.MutableRefObject<boolean>
): Promise<{
  nonce: number;
  hash: string;
} | null> {
  const target = Array(difficulty + 1).join("0");
  let hash = "";

  console.log("Mining block with difficulty: ", difficulty);
  const startTime = Date.now();

  return new Promise((resolve) => {
    function mine() {
      // 检查是否应该停止
      if (stopSignal.current) {
        console.log("Mining stopped by user");
        resolve(null);
        return;
      }

      // 每批次计算的哈希数量
      const batchSize = 100;

      for (let i = 0; i < batchSize; i++) {
        // 再次检查是否应该停止
        if (stopSignal.current) {
          console.log("Mining stopped by user");
          resolve(null);
          return;
        }

        hash = calculateHash(data, nonce);

        if (hash.substring(0, difficulty) === target) {
          console.log(`\nFound solution! Nonce: ${nonce}, Hash: ${hash}`);
          const endTime = Date.now();
          const duration = (endTime - startTime) / 1000;
          console.log(`\nMining completed in ${duration} seconds`);

          resolve({
            nonce,
            hash,
          });
          return;
        }

        nonce++;
      }

      // 更新UI显示当前的哈希和nonce
      setHash(hash);
      setNonce(nonce);

      if (nonce % 1000 === 0) {
        console.log(`\nStill mining... ${nonce} hashes computed ${hash}`);
      }

      // 使用requestAnimationFrame允许UI更新
      requestAnimationFrame(mine);
    }

    // 开始挖矿过程
    mine();
  });
}

export default function Page() {
  const [result, setResult] = useState<{
    nonce: number;
    hash: string;
  } | null>(null);

  const [hash, setHash] = useState<string>("...");
  const [nonce, setNonce] = useState<number>(0);
  const [isMining, setIsMining] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>({
    message: "...",
    difficulty: 0,
  });

  useEffect(() => {
    fetch("/api/pow/initiate")
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, []);

  // 使用ref来存储停止信号
  const stopMining = useRef<boolean>(false);

  // 组件卸载时停止挖矿
  useEffect(() => {
    return () => {
      stopMining.current = true;
      console.log("Component unmounted, mining stopped");
    };
  }, []);

  const handleMine = async () => {
    // 重置停止信号
    stopMining.current = false;
    setIsMining(true);
    try {
      const result = await proofOfWork(
        task?.message,
        task?.difficulty,
        setHash,
        nonce,
        setNonce,
        stopMining
      );
      if (result) {
        setResult(result);
      }
    } finally {
      setIsMining(false);
    }
  };

  const handleStop = () => {
    stopMining.current = true;
  };

  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    calculatedHash: string;
  } | null>(null);

  const handleValidate = async () => {
    const response = await fetch("/api/pow/validate", {
      method: "POST",
      body: JSON.stringify({
        message: task?.message,
        nonce: result?.nonce,
        hash: result?.hash,
      }),
    });
    const data = await response.json();
    setValidationResult(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>PoW</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-0">
            <p className="text-sm font-bold">Message</p>
            <p className="whitespace-pre-wrap break-all">{task?.message}</p>
          </div>
          <div className="flex flex-col space-y-0">
            <p className="text-sm font-bold">Difficulty</p>
            <p className="whitespace-pre-wrap break-all">{task?.difficulty}</p>
          </div>
          <div className="flex flex-col space-y-0">
            <p className="text-sm font-bold">Current Nonce</p>
            <p className="whitespace-pre-wrap break-all">{nonce}</p>
          </div>
          <div className="flex flex-col space-y-0 w-full">
            <p className="text-sm font-bold">Current Hash</p>
            <p className="whitespace-pre-wrap break-all">{hash}</p>
          </div>
          {result && (
            <>
              <div className="flex flex-col space-y-0">
                <p className="text-sm font-bold">Final Nonce</p>
                <p className="whitespace-pre-wrap break-all">{result.nonce}</p>
              </div>
              <div className="flex flex-col space-y-0">
                <p className="text-sm font-bold">Final Hash</p>
                <p className="whitespace-pre-wrap break-all">{result.hash}</p>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex space-x-4">
            <Button onClick={handleMine} disabled={isMining}>
              {isMining ? "Mining..." : "Mine"}
            </Button>
            {isMining && (
              <Button onClick={handleStop} variant="destructive">
                Stop Mining
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Validate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-0">
            <p className="text-sm font-bold">Validation Result</p>
            <p className="whitespace-pre-wrap break-all">
              {validationResult?.isValid ? "Valid" : "Invalid"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleValidate}>Validate</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
