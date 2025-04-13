import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

async function insertViewRecord(postId: string) {
  const viewTs = Math.floor(Date.now() / 1000);
  const sql = `INSERT INTO POSTVIEWS (post_id, view_ts) VALUES (?, ?)`;
  const result = await turso.execute({
    sql,
    args: [postId, viewTs],
  });

  return result;
}

export async function POST(request: Request) {
  const { postId }: { postId: string } = await request.json();

  try {
    const result = await insertViewRecord(postId);
    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
