import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getCollection } from "@/server/db/mongo";
import { logger } from "@/shared/utils/logger";
import { ErrorResponses, handleError } from "@/shared/utils/api-response";
import { createCommentSchema, getCommentsSchema } from "@/lib/comments/schemas";

// 获取评论列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    // Validate input
    const validation = getCommentsSchema.safeParse({ postId });
    if (!validation.success) {
      return ErrorResponses.badRequest(
        validation.error.issues[0]?.message || "postId is required",
      );
    }

    const commentsCollection = await getCollection("comments");

    logger.debug("Fetching comments", { postId });

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

    logger.info("Comments fetched successfully", {
      postId,
      count: comments.length,
    });

    return NextResponse.json(comments);
  } catch (error) {
    return handleError(error, "获取评论失败");
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
      return ErrorResponses.unauthorized();
    }

    const body = await request.json();

    // Validate input
    const validation = createCommentSchema.safeParse(body);
    if (!validation.success) {
      return ErrorResponses.badRequest(
        validation.error.issues[0]?.message || "Invalid input",
      );
    }

    const { postId, commentText } = validation.data;

    const commentsCollection = await getCollection("comments");

    const newComment = {
      user_id: session.user.id,
      post_id: postId,
      comment_text: commentText,
      comment_ts: Math.floor(Date.now() / 1000),
      created_at: new Date(),
    };

    logger.debug("Creating comment", {
      userId: session.user.id,
      postId,
    });

    const result = await commentsCollection.insertOne(newComment);

    logger.info("Comment created successfully", {
      commentId: result.insertedId.toString(),
      userId: session.user.id,
      postId,
    });

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
    return handleError(error, "创建评论失败");
  }
}
