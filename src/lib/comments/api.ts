import { CommentType, CommentToBeSubmittedType } from "@/lib/comments/types";

export async function fetchComments({ postId }: { postId: number }): Promise<CommentType[]> {
  try {
    const response = await fetch(`/api/db/get_comments?postId=${postId}`);
    if (!response.ok) throw new Error("Failed to fetch comments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}


export async function postComment(
  comment: CommentToBeSubmittedType
): Promise<any> {
  try {
    const response = await fetch("/api/db/insert_comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      throw new Error("Failed to post comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting comment:", error);
    return null;
  }
}


export async function deleteComment(
  commentId: number
): Promise<any> {
  try {
    const response = await fetch("/api/db/delete_comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment_id: commentId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  }
}
