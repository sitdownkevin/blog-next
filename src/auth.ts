import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db),
  socialProviders: {
    github: {
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
      scope: ["user:email", "read:user"]
    },
  },
  trustedOrigins: [
    // local dev
    "http://localhost:3000",
    // vercel system URL, e.g. my-app.vercel.app
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    // custom site url (production). Prefer BETTER_AUTH_URL, fallback to NEXT_PUBLIC_SITE_URL
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.NEXT_PUBLIC_SITE_URL ? [process.env.NEXT_PUBLIC_SITE_URL] : []),
    // optionally allow apex and www variants if SITE_URL is apex or www
    ...(process.env.NEXT_PUBLIC_SITE_URL?.includes("www.")
      ? [process.env.NEXT_PUBLIC_SITE_URL.replace("https://www.", "https://")] 
      : process.env.NEXT_PUBLIC_SITE_URL
      ? [process.env.NEXT_PUBLIC_SITE_URL.replace("https://", "https://www.")]
      : []),
  ],
});