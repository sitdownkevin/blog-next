import * as CryptoJS from "crypto-js";

function calculateHash(message: string, nonce: number): string {
  const blockData = message + nonce.toString();
  return CryptoJS.SHA256(blockData).toString(CryptoJS.enc.Hex);
}

export async function POST(req: Request) {
  const { message, nonce, hash } = await req.json();

  const calculatedHash = calculateHash(message, nonce);

  return new Response(
    JSON.stringify({
      isValid: (calculatedHash === hash) && hash.startsWith("0".repeat(4)),
      calculatedHash,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
