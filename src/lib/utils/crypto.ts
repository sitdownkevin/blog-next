import * as CryptoJS from "crypto-js";

function calculateHash(message: string, nonce: number): string {
    /**
     * Calculate the hash of the message and nonce
     * @param message - The message to hash
     * @param nonce - The nonce to hash
     * @returns The hash of the message and nonce
     */
    const blockData = message + nonce.toString();
    return CryptoJS.SHA256(blockData).toString(CryptoJS.enc.Hex);
}

export { calculateHash };