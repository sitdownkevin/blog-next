import { NextResponse } from "next/server";
import { getMatterList } from "@/lib/posts/getMatterList";

export async function GET() {
  try {
    const matterList = getMatterList();
    return NextResponse.json(matterList);
  } catch (error) {
    console.error("Error fetching post list:", error);
    return NextResponse.json(
      { error: "Failed to fetch post list" },
      { status: 500 },
    );
  }
}
