import { NextResponse } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { getSessionAddress } from "@/lib/gallery/auth";

export async function GET() {
  try {
    const address = await getSessionAddress();
    if (!address) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ address });
  } catch (error) {
    unstable_rethrow(error);
    console.error("Gallery me error:", error);
    return NextResponse.json({ error: "Session check failed" }, { status: 500 });
  }
}
