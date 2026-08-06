"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getAddress, isAddress } from "viem";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WalletsManager() {
  const [wallets, setWallets] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/wallets");
      if (!res.ok) throw new Error("Failed");
      const data = (await res.json()) as { wallets: string[] };
      setWallets(data.wallets);
    } catch {
      toast.error("Failed to load wallets");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function persist(next: string[]) {
    if (next.length === 0) {
      toast.error("At least one wallet is required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/wallets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallets: next }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(err?.error || "Save failed");
      }
      const data = (await res.json()) as { wallets: string[] };
      setWallets(data.wallets);
      toast.success("Wallets updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function handleAdd() {
    if (!isAddress(newAddress)) {
      toast.error("Invalid address");
      return;
    }
    const normalized = getAddress(newAddress);
    if (wallets.includes(normalized)) {
      toast.error("Already in list");
      return;
    }
    void persist([...wallets, normalized]);
    setNewAddress("");
  }

  function handleRemove(address: string) {
    void persist(wallets.filter((w) => w !== address));
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Loading wallets…
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Addresses in this list can sign in to admin and gallery.
      </p>

      <ul className="divide-y rounded-md border">
        {wallets.map((wallet) => (
          <li
            key={wallet}
            className="flex items-center justify-between gap-3 px-3 py-2"
          >
            <code className="truncate text-xs sm:text-sm">{wallet}</code>
            <Button
              variant="ghost"
              size="icon"
              disabled={saving || wallets.length <= 1}
              onClick={() => handleRemove(wallet)}
            >
              <Trash2 className="size-4" />
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          placeholder="0x…"
          className="font-mono"
        />
        <Button onClick={handleAdd} disabled={saving}>
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Plus className="size-4" />
          )}
          Add
        </Button>
      </div>
    </div>
  );
}
