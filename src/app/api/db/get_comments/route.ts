import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});


export async function POST(request: Request) {
  const { post_id }: { post_id: string } = await request.json();

  try {
    const result = await turso.execute({
      sql: "SELECT * FROM COMMENTS WHERE post_id = ?",
      args: [post_id],
    });

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