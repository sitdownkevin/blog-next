import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";
import { headers } from "next/headers";
import { getCollection } from "@/server/db/mongo";
import { logger } from "@/shared/utils/logger";
import { ErrorResponses, handleError } from "@/shared/utils/api-response";
import { deleteCommentSchema } from "@/lib/comments/schemas";

export async function DELETE(request: NextRequest) {
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
    const validation = deleteCommentSchema.safeParse(body);
    if (!validation.success) {
      return ErrorResponses.badRequest(
        validation.error.issues[0]?.message || "Invalid input",
      );
    }

    const { commentId } = validation.data;

    const commentsCollection = await getCollection("comments");

    logger.debug("Deleting comment", {
      commentId,
      userId: session.user.id,
    });

    // 检查评论是否存在且用户有权限删除
    const comment = await commentsCollection.findOne({
      _id: new ObjectId(commentId),
    });

    if (!comment) {
      return ErrorResponses.notFound("评论");
    }

    // 只有评论作者可以删除评论
    if (comment.user_id !== session.user.id) {
      return ErrorResponses.forbidden();
    }

    // 删除评论
    await commentsCollection.deleteOne({
      _id: new ObjectId(commentId),
    });

    logger.info("Comment deleted successfully", {
      commentId,
      userId: session.user.id,
    });

    return NextResponse.json({ message: "评论删除成功" });
  } catch (error) {
    return handleError(error, "删除评论失败");
  }
}
