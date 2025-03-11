"use client";

import * as CryptoJS from "crypto-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function calculateHash(data: string, nonce: number): string {
  const blockData = data + nonce.toString();
  return CryptoJS.SHA256(blockData).toString(CryptoJS.enc.Hex);
}

function proofOfWork(
  data: string,
  difficulty: number
): {
  nonce: number;
  hash: string;
} {
  const target = Array(difficulty + 1).join("0");

  let nonce = 0;
  let hash = "";

  console.log("Mining block with difficulty: ", difficulty);
  const startTime = Date.now();

  while (true) {
    hash = calculateHash(data, nonce);

    if (hash.substring(0, difficulty) === target) {
      console.log(`\nFound solution! Nonce: ${nonce}, Hash: ${hash}`);
      break;
    }

    nonce++;

    if (nonce % 1000 === 0) {
      console.log(`\nStill mining... ${nonce} hashes computed ${hash}`);
    }
  }

  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  console.log(`\nMining completed in ${duration} seconds`);

  return {
    nonce,
    hash,
  };
}

export default function Page() {
  const [result, setResult] = useState<{
    nonce: number;
    hash: string;
  } | null>(null);

  return (
    <div className="w-full">
      <h1>POW</h1>
      <Button
        onClick={() => {
          const result = proofOfWork("Hello, world!", 5);
          setResult(result);
        }}
      >
        Mine
      </Button>
      {result && (
        <div>
          <p>Nonce: {result.nonce}</p>
          <p>Hash: {result.hash}</p>
        </div>
      )}
    </div>
  );
}
