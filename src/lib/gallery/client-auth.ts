import { SiweMessage } from "siwe";
import {
  createWalletClient,
  custom,
  getAddress,
  type Address,
  type Hex,
} from "viem";
import { mainnet } from "viem/chains";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  }
}

export async function connectWallet(): Promise<Address> {
  if (!window.ethereum) {
    throw new Error("NO_WALLET");
  }

  const accounts = (await window.ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];

  if (!accounts?.[0]) {
    throw new Error("NO_ACCOUNT");
  }

  return getAddress(accounts[0]);
}

export async function signInWithEthereum(address: Address): Promise<Address> {
  if (!window.ethereum) {
    throw new Error("NO_WALLET");
  }

  const nonceRes = await fetch("/api/gallery/auth/nonce");
  if (!nonceRes.ok) {
    throw new Error("NONCE_FAILED");
  }
  const { nonce } = (await nonceRes.json()) as { nonce: string };

  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: "Sign in to manage the Gallery image host.",
    uri: window.location.origin,
    version: "1",
    chainId: 1,
    nonce,
  });

  const prepared = message.prepareMessage();
  const walletClient = createWalletClient({
    account: address,
    chain: mainnet,
    transport: custom(window.ethereum),
  });

  const signature = (await walletClient.signMessage({
    account: address,
    message: prepared,
  })) as Hex;

  const verifyRes = await fetch("/api/gallery/auth/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: prepared, signature }),
  });

  if (!verifyRes.ok) {
    const body = (await verifyRes.json().catch(() => null)) as {
      error?: string;
    } | null;
    if (verifyRes.status === 403) {
      throw new Error("NOT_ALLOWED");
    }
    throw new Error(body?.error || "VERIFY_FAILED");
  }

  const data = (await verifyRes.json()) as { address: string };
  return getAddress(data.address);
}

export async function logoutGallerySession(): Promise<void> {
  await fetch("/api/gallery/auth/logout", { method: "POST" });
}

export async function fetchGallerySession(): Promise<Address | null> {
  const res = await fetch("/api/gallery/auth/me");
  if (!res.ok) return null;
  const data = (await res.json()) as { address: string };
  return getAddress(data.address);
}
