import { CommentType, CommentToBeSubmittedType } from "@/lib/comments/types";

export async function fetchComments({
  postId,
}: {
  postId: string;
}): Promise<CommentType[]> {
  try {
    const response = await fetch(`/api/comments?postId=${postId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to fetch comments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function postComment(comment: {
  postId: string;
  commentText: string;
}): Promise<CommentType> {
  try {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to post comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}

export async function deleteComment(commentId: string): Promise<any> {
  try {
    const response = await fetch("/api/comments/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete comment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
