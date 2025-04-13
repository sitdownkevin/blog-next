import { createClient } from "@libsql/client";

const turso = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function GET() {
  const sql = `SELECT COUNT(*) AS visit_count FROM POSTVIEWS WHERE view_ts >= ?`;

  const result = await turso.execute({
    sql,
    args: [Math.floor(Date.now() / 1000) - 3600 * 24 * 1],
  });


  return new Response(
    JSON.stringify({
      count: result['rows'],
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
