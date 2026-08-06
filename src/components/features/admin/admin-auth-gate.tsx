"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { Address } from "viem";

import { Button } from "@/components/ui/button";
import {
  connectWallet,
  fetchAdminSession,
  logoutAdminSession,
  signInWithEthereum,
} from "@/lib/auth/client";

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const refresh = useCallback(async () => {
    const session = await fetchAdminSession();
    setAddress(session);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function handleSignIn() {
    setSigningIn(true);
    try {
      const wallet = await connectWallet();
      const signed = await signInWithEthereum(wallet);
      setAddress(signed);
      toast.success("Signed in");
    } catch (error) {
      const message = error instanceof Error ? error.message : "LOGIN_FAILED";
      if (message === "NO_WALLET") {
        toast.error("No wallet detected");
      } else if (message === "NOT_ALLOWED") {
        toast.error("Address not allowed");
      } else {
        toast.error("Sign-in failed");
      }
    } finally {
      setSigningIn(false);
    }
  }

  async function handleLogout() {
    await logoutAdminSession();
    setAddress(null);
    toast.success("Signed out");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Checking session…
      </div>
    );
  }

  if (!address) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="text-sm text-muted-foreground">
          Sign in with an allowlisted Ethereum wallet to manage posts.
        </p>
        <Button onClick={handleSignIn} disabled={signingIn}>
          {signingIn ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Wallet className="size-4" />
          )}
          Sign in with Ethereum
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="font-medium">Admin</span>
          <span className="text-muted-foreground">{shortAddress(address)}</span>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}
