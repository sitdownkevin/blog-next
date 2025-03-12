"use client";

import { useState, useRef, useEffect, JSX } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { calculateHash } from "@/lib/pow/utils";
import { Task, ValidateParams, ValidateResult } from "@/lib/pow/types";

async function proofOfWork(
  data: string,
  difficulty: number,
  setHash: (hash: string) => void,
  nonce: number,
  setNonce: (nonce: number) => void,
  stopSignal: React.RefObject<boolean>
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

async function initiateTask(setTask: (task: Task) => void) {
  fetch("/api/pow/initiate", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => setTask(data));
}

async function validateTask(
  task: Task,
  nonce: number
): Promise<ValidateResult> {
  const response = await fetch("/api/pow/validate", {
    method: "POST",
    body: JSON.stringify({
      task,
      nonce,
    } as ValidateParams),
  });
  const data: ValidateResult = await response.json();
  return data;
}

function PoWCard({
  task,
  hash,
  nonce,
  result,
  isMining,
  handleMine,
  handleStop,
}: {
  task: Task | null;
  hash: string | null;
  nonce: number;
  result: { nonce: number; hash: string } | null;
  isMining: boolean;
  handleMine: () => void;
  handleStop: () => void;
}): JSX.Element {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>PoW</CardTitle>
        <CardDescription>
          Proof of Work is a mechanism used in blockchain technology to ensure
          the integrity of the blockchain.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-sm font-bold">Message</span>
          <span className="w-full whitespace-pre-wrap break-all">
            {task?.message}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">Difficulty</span>
          <span className="w-full whitespace-pre-wrap break-all">
            {task?.difficulty}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold">Current Nonce</span>
          <span className="w-full whitespace-pre-wrap break-all">{nonce}</span>
        </div>
        {hash && (
          <div className="flex flex-col">
            <span className="text-sm font-bold">Current Hash</span>
            <span className="w-full whitespace-pre-wrap break-all">
              {hash}
            </span>
          </div>
        )}
        {result && (
          <div className="flex flex-col">
            <span className="text-sm font-bold">Final Nonce</span>
            <span className="w-full whitespace-pre-wrap break-all">
              {result.nonce}
            </span>
          </div>
        )}
        {result && (
          <div className="flex flex-col">
            <span className="text-sm font-bold">Final Hash</span>
            <span className="w-full whitespace-pre-wrap break-all">
              {result.hash}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex space-x-4">
          <Button onClick={handleMine} disabled={isMining} variant="outline">
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
  );
}

function ValidateCard({
  task,
  nonce,
}: {
  task: Task;
  nonce: number;
}): JSX.Element {
  const [validationResult, setValidationResult] =
    useState<ValidateResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleValidate = async () => {
    setIsLoading(true);
    const result = await validateTask(task, nonce);
    setValidationResult(result);
    setIsLoading(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Validate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-sm font-bold">Validation Result</p>
          <p className="whitespace-pre-wrap break-all">
            {validationResult?.isValid ? "Valid" : "Invalid"}
          </p>
          {validationResult?.data?.image && (
            <img src={validationResult.data.image} alt="Wechat QR Code" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleValidate} disabled={isLoading}>
          {isLoading ? "Validating..." : "Validate"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Page() {
  const [result, setResult] = useState<{
    nonce: number;
    hash: string;
  } | null>(null);

  const [hash, setHash] = useState<string | null>(null);
  const [nonce, setNonce] = useState<number>(0);
  const [isMining, setIsMining] = useState<boolean>(false);
  const [task, setTask] = useState<Task | null>(null);

  const stopMining = useRef<boolean>(false);

  useEffect(() => {
    initiateTask(setTask);

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
        setHash(result.hash);
        setNonce(result.nonce);
        setResult(result);
      }
    } finally {
      setIsMining(false);
    }
  };

  const handleStop = () => {
    stopMining.current = true;
  };

  return (
    <div className="flex flex-col gap-4">
      <PoWCard
        task={task}
        hash={hash}
        nonce={nonce}
        result={result}
        isMining={isMining}
        handleMine={handleMine}
        handleStop={handleStop}
      />
      {result && <ValidateCard task={task} nonce={result.nonce} />}
    </div>
  );
}
