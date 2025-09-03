import { createAuthClient } from "better-auth/react"

// const baseURL = process.env.VERCEL_URL
//     ? `https://${process.env.VERCEL_URL}`
//     : `http`

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    // baseURL
})