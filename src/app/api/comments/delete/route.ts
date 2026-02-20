import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/auth";
import { headers } from "next/headers";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
const client = new MongoClient(MONGODB_URI);

export async function DELETE(request: NextRequest) {
  try {
    // 验证用户身份
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        { error: "未授权访问，请先登录" },
        { status: 401 },
      );
    }

    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { error: "commentId is required" },
        { status: 400 },
      );
    }

    await client.connect();
    const db = client.db();
    const commentsCollection = db.collection("comments");

    // 检查评论是否存在且用户有权限删除
    const comment = await commentsCollection.findOne({
      _id: new ObjectId(commentId),
    });

    if (!comment) {
      return NextResponse.json({ error: "评论不存在" }, { status: 404 });
    }

    // 只有评论作者可以删除评论
    if (comment.user_id !== session.user.id) {
      return NextResponse.json({ error: "无权限删除此评论" }, { status: 403 });
    }

    // 删除评论
    await commentsCollection.deleteOne({
      _id: new ObjectId(commentId),
    });

    return NextResponse.json({ message: "评论删除成功" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json({ error: "删除评论失败" }, { status: 500 });
  } finally {
    await client.close();
  }
}
