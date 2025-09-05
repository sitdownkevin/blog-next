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
  trustedOrigins: (() => {
    const origins: string[] = [
      "http://localhost:3000",
    ];

    if (process.env.VERCEL_URL) {
      origins.push(`https://${process.env.VERCEL_URL}`);
    }

    const addWithVariants = (url?: string) => {
      if (!url) return;
      try {
        origins.push(url);
        const u = new URL(url);
        if (u.hostname.startsWith("www.")) {
          origins.push(`${u.protocol}//${u.hostname.replace("www.", "")}${u.port ? ":" + u.port : ""}`);
        } else {
          origins.push(`${u.protocol}//www.${u.hostname}${u.port ? ":" + u.port : ""}`);
        }
      } catch {
        // ignore malformed
      }
    };

    addWithVariants(process.env.BETTER_AUTH_URL);
    addWithVariants(process.env.NEXT_PUBLIC_SITE_URL);

    return Array.from(new Set(origins.filter(Boolean)));
  })(),
});