import { createClient } from "@libsql/client";
import { CommentToBeSubmittedType } from "@/lib/comments/types";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function POST(request: Request) {
  const {
    user_id,
    post_id,
    comment_text,
    comment_ts,
  }: CommentToBeSubmittedType = await request.json();

  try {
    const result = await turso.execute({
      sql: "INSERT INTO COMMENTS (user_id, post_id, comment_text, comment_ts) VALUES (?, ?, ?, ?)",
      args: [user_id, post_id, comment_text, comment_ts],
    });

    console.log(result);

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
