"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { calculateHash } from "@/lib/utils/crypto";
import { Task, ValidateParams, ValidateResult } from "@/lib/types/pow";

async function proofOfWork(
  data: string,
  difficulty: number,
  setHash: (hash: string) => void,
  nonce: number,
  setNonce: (nonce: number) => void,
  stopSignal: React.RefObject<boolean>,
): Promise<{
  nonce: number;
  hash: string;
} | null> {
  const target = Array(difficulty + 1).join("0");
  let hash = "";

  return new Promise((resolve) => {
    function mine() {
      if (stopSignal.current) {
        resolve(null);
        return;
      }

      const batchSize = 100;

      for (let i = 0; i < batchSize; i++) {
        if (stopSignal.current) {
          resolve(null);
          return;
        }

        hash = calculateHash(data, nonce);

        if (hash.substring(0, difficulty) === target) {
          resolve({
            nonce,
            hash,
          });
          return;
        }

        nonce++;
      }

      setHash(hash);
      setNonce(nonce);
      requestAnimationFrame(mine);
    }

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
  nonce: number,
): Promise<ValidateResult> {
  const response = await fetch("/api/pow/validate", {
    method: "POST",
    body: JSON.stringify({
      task,
      nonce,
    } as ValidateParams),
  });
  return response.json();
}

function FieldRow({
  label,
  value,
  mono = true,
}: {
  label: string;
  value?: string | number | null;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-border sm:flex-row sm:items-baseline sm:gap-6">
      <span className="shrink-0 text-xs font-medium tracking-wide text-muted-foreground sm:w-28">
        {label}
      </span>
      <span
        className={cn(
          "min-w-0 text-sm break-all text-foreground/90",
          mono && "font-mono tabular-nums text-[0.8rem]",
        )}
      >
        {value === undefined || value === null || value === "" ? "—" : value}
      </span>
    </div>
  );
}

const primaryBtnClass =
  "inline-flex items-center justify-center rounded-md bg-claude-orange px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-claude-orange/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const outlineBtnClass =
  "inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:border-claude-orange hover:text-claude-orange dark:border-white/15 dark:hover:border-claude-orange active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export function PowPanel() {
  const t = useTranslations("GetMyWx");

  const [result, setResult] = useState<{
    nonce: number;
    hash: string;
  } | null>(null);
  const [hash, setHash] = useState<string | null>(null);
  const [nonce, setNonce] = useState<number>(0);
  const [isMining, setIsMining] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const [validationResult, setValidationResult] =
    useState<ValidateResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const stopMining = useRef(false);

  useEffect(() => {
    initiateTask(setTask);

    return () => {
      stopMining.current = true;
    };
  }, []);

  const handleMine = async () => {
    if (!task?.message || task?.difficulty === undefined) {
      return;
    }

    stopMining.current = false;
    setResult(null);
    setValidationResult(null);
    setIsMining(true);

    try {
      const mineResult = await proofOfWork(
        task.message,
        task.difficulty,
        setHash,
        nonce,
        setNonce,
        stopMining,
      );
      if (mineResult) {
        setHash(mineResult.hash);
        setNonce(mineResult.nonce);
        setResult(mineResult);
      }
    } finally {
      setIsMining(false);
    }
  };

  const handleStop = () => {
    stopMining.current = true;
  };

  const handleValidate = async () => {
    if (!task || !result) return;
    setIsValidating(true);
    try {
      const data = await validateTask(task, result.nonce);
      setValidationResult(data);
    } finally {
      setIsValidating(false);
    }
  };

  const displayNonce = result?.nonce ?? nonce;
  const displayHash = result?.hash ?? hash;

  return (
    <div className="space-y-10">
      <section>
        <div className="border-t border-border">
          <FieldRow label={t("message")} value={task?.message} />
          <FieldRow label={t("difficulty")} value={task?.difficulty} />
          <FieldRow
            label={result ? t("finalNonce") : t("currentNonce")}
            value={displayNonce}
          />
          <FieldRow
            label={result ? t("finalHash") : t("currentHash")}
            value={displayHash}
          />
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          {!task
            ? t("loadingTask")
            : isMining
              ? t("miningStatus")
              : result
                ? t("mineComplete")
                : t("description")}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleMine}
            disabled={isMining || !task}
            className={primaryBtnClass}
          >
            {isMining ? t("mining") : t("mine")}
          </button>
          {isMining && (
            <button
              type="button"
              onClick={handleStop}
              className={outlineBtnClass}
            >
              {t("stop")}
            </button>
          )}
        </div>
      </section>

      {result && task && (
        <section className="space-y-5 border-t border-border pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleValidate}
              disabled={isValidating}
              className={primaryBtnClass}
            >
              {isValidating ? t("validating") : t("validate")}
            </button>
            {validationResult && (
              <span
                className={cn(
                  "text-sm font-medium",
                  validationResult.isValid
                    ? "text-claude-orange"
                    : "text-destructive",
                )}
              >
                {t("validationResult")}:{" "}
                {validationResult.isValid ? t("valid") : t("invalid")}
              </span>
            )}
          </div>

          {validationResult?.data?.image && (
            <div className="flex justify-center sm:justify-start pt-2">
              <div className="relative w-full max-w-[280px] rounded-[1.75rem] bg-white px-8 pt-10 pb-7 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] ring-1 ring-black/5 dark:bg-[#1c1a17] dark:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] dark:ring-white/10">
                <span
                  aria-hidden
                  className="absolute top-5 right-5 size-2 rounded-full bg-claude-orange"
                />

                <Image
                  src={validationResult.data.image}
                  alt={t("qrAlt")}
                  width={280}
                  height={280}
                  className="mx-auto w-[72%] h-auto"
                />

                <div className="relative mt-8 mb-5">
                  <div className="h-px bg-border dark:bg-white/10" />
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-claude-orange"
                  />
                </div>

                <p className="text-center text-sm tracking-wide text-muted-foreground">
                  {t("qrHint")}
                </p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
