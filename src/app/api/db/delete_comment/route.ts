import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function POST(request: Request) {
  const { comment_id }: { comment_id: number } = await request.json();

  try {
    const result = await turso.execute({
      sql: "DELETE FROM COMMENTS WHERE comment_id = ?",
      args: [comment_id],
    });

    return new Response(JSON.stringify(result.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete comment." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
