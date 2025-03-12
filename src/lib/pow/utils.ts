import * as CryptoJS from "crypto-js";

export function calculateHash(message: string, nonce: number): string {
    const blockData = message + nonce.toString();
    return CryptoJS.SHA256(blockData).toString(CryptoJS.enc.Hex);
}