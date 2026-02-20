import { z } from "zod";

/**
 * Schema for creating a new comment
 */
export const createCommentSchema = z.object({
  postId: z.string().min(1, "postId不能为空"),
  commentText: z
    .string()
    .min(1, "评论内容不能为空")
    .max(2000, "评论内容不能超过2000个字符")
    .trim(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;

/**
 * Schema for deleting a comment
 */
export const deleteCommentSchema = z.object({
  commentId: z.string().min(1, "commentId不能为空"),
});

export type DeleteCommentInput = z.infer<typeof deleteCommentSchema>;

/**
 * Schema for getting comments by post ID
 */
export const getCommentsSchema = z.object({
  postId: z.string().min(1, "postId不能为空"),
});

export type GetCommentsInput = z.infer<typeof getCommentsSchema>;
