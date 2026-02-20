import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/auth";
import { headers } from "next/headers";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables");
}
const client = new MongoClient(MONGODB_URI);

// 获取评论列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 },
      );
    }

    await client.connect();
    const db = client.db();
    const commentsCollection = db.collection("comments");

    // 先检查是否有评论数据
    const allComments = await commentsCollection
      .find({ post_id: postId })
      .toArray();
    console.log("找到评论数量:", allComments.length);
    console.log("评论数据样例:", allComments[0]);

    // 获取评论并关联用户信息
    const comments = await commentsCollection
      .aggregate([
        {
          $match: { post_id: postId },
        },
        {
          $addFields: {
            user_id_obj: { $toObjectId: "$user_id" },
          },
        },
        {
          $lookup: {
            from: "user",
            localField: "user_id_obj",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $lookup: {
            from: "user",
            localField: "user_id",
            foreignField: "id",
            as: "userInfoById",
          },
        },
        {
          $addFields: {
            user: {
              $cond: {
                if: { $gt: [{ $size: "$userInfo" }, 0] },
                then: { $arrayElemAt: ["$userInfo", 0] },
                else: { $arrayElemAt: ["$userInfoById", 0] },
              },
            },
          },
        },
        {
          $sort: { comment_ts: 1 },
        },
        {
          $project: {
            _id: 1,
            comment_id: { $toString: "$_id" },
            user_id: 1,
            post_id: 1,
            comment_text: 1,
            comment_ts: 1,
            user: {
              id: { $ifNull: ["$user.id", "$user_id"] },
              name: { $ifNull: ["$user.name", "未知用户"] },
              image: { $ifNull: ["$user.image", ""] },
            },
          },
        },
      ])
      .toArray();

    console.log("聚合后评论数量:", comments.length);
    console.log("聚合后评论样例:", comments[0]);

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}

// 创建新评论
export async function POST(request: NextRequest) {
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

    const { postId, commentText } = await request.json();

    if (!postId || !commentText || !commentText.trim()) {
      return NextResponse.json(
        { error: "postId和评论内容不能为空" },
        { status: 400 },
      );
    }

    await client.connect();
    const db = client.db();
    const commentsCollection = db.collection("comments");
    const usersCollection = db.collection("user");

    // 调试：检查用户数据结构
    console.log("当前用户会话信息:", session.user);
    const userInDb = await usersCollection.findOne({ id: session.user.id });
    console.log("数据库中的用户信息:", userInDb);

    const newComment = {
      user_id: session.user.id,
      post_id: postId,
      comment_text: commentText.trim(),
      comment_ts: Math.floor(Date.now() / 1000),
      created_at: new Date(),
    };

    console.log("准备插入的评论:", newComment);
    const result = await commentsCollection.insertOne(newComment);
    console.log("插入结果:", result);

    // 返回新创建的评论，包含用户信息
    const createdComment = {
      ...newComment,
      comment_id: result.insertedId.toString(),
      user: {
        id: session.user.id,
        name: session.user.name,
        image: session.user.image,
      },
    };

    return NextResponse.json(createdComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json({ error: "创建评论失败" }, { status: 500 });
  } finally {
    await client.close();
  }
}
