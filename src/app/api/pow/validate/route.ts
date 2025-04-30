import { ValidateParams, ValidateResult } from "@/lib/pow/types";
import { calculateHash } from "@/lib/pow/utils";
import { wechatBase64 } from "@/lib/pow/data";

export async function POST(req: Request) {
  const { task, nonce }: ValidateParams = await req.json();

  const calculatedHash = calculateHash(task.message, nonce);
  const isValid = calculatedHash.startsWith("0".repeat(task.difficulty));


  try {
    const result: ValidateResult = {
      isValid,
      data: {
        task: task,
        hash: calculatedHash,
        image: `data:image/png;base64,${wechatBase64}`,
      },
    };

    return new Response(
      JSON.stringify(result),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        isValid,
        data: {
          task: task,
          hash: calculatedHash,
          image: `data:image/png;base64,`,
        },
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }


}
