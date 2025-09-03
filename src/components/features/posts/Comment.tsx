"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, RefreshCw, Trash } from "lucide-react";

import { CommentToBeSubmittedType, CommentType } from "@/lib/comments/types";
import { fetchComments, postComment, deleteComment } from "@/lib/comments/api";

// 单条评论组件
function CommentItem({
  comment,
  isLast,
  onRefresh,
}: {
  comment: CommentType;
  isLast: boolean;
  onRefresh: () => void;
}) {
  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.comment_id);
      onRefresh();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="shrink-0">
              <Avatar>
                {/* <AvatarFallback>{`U${comment.user_id}`}</AvatarFallback> */}
                <AvatarFallback>Guest</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col space-y-0">
              <p className="font-medium">Guest</p>
              <p className="text-sm text-muted-foreground">
                {new Date(comment.comment_ts * 1000).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
          </div>
        </div>
        <div className="w-full p-2">
          <p className="text-sm">{comment.comment_text}</p>
        </div>
      </div>
      {!isLast && <Separator className="my-4" />}
    </div>
  );
}

// 评论列表组件
function CommentList({
  comments,
  onRefresh,
}: {
  comments: CommentType[];
  onRefresh: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </p>
        <Button variant="ghost" size="sm" onClick={onRefresh} className="h-8">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentItem
            key={index}
            comment={comment}
            isLast={index === comments.length - 1}
            onRefresh={onRefresh}
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}

// 评论表单组件
function CommentForm({
  postId,
  onCommentAdded,
}: {
  postId: string;
  onCommentAdded: (comment: CommentType) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      setError("评论内容不能为空");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const commentToBeSubmitted: CommentToBeSubmittedType = {
        user_id: 1, // 假设当前用户ID为1
        post_id: postId,
        comment_text: commentText,
        comment_ts: Math.floor(Date.now() / 1000),
      };

      await postComment(commentToBeSubmitted);

      // 创建新评论对象并通知父组件
      const newComment: CommentType = {
        ...commentToBeSubmitted,
        comment_id: 0, // 临时ID
      };

      onCommentAdded(newComment);
      setCommentText("");
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("发布评论失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-start gap-4">
        <Avatar>
          <AvatarFallback>Guest</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="写下你的评论..."
            className="resize-none min-h-[100px]"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !commentText.trim()}
          className="flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              发布中...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              发布评论
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// 添加骨架屏组件
function CommentSkeleton() {
  return (
    <div className="mb-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
        <div className="w-full p-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
      </div>
    </div>
  );
}

// 主评论组件
export function Comment({ postId = '1' }: { postId?: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchComments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchComments({ postId });
        setComments(data);
      } catch (err) {
        setError("加载评论失败，请刷新重试");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    handleFetchComments();
  }, [postId]);

  const handleCommentAdded = (newComment: CommentType) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <Card className="shadow-none border-none">
      <CardHeader className="pb-3">
        <CardTitle>Comments</CardTitle>
      </CardHeader>

      <CardContent>
        {error ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">{error}</p>
            <Button variant="outline" onClick={() => {
              const handleFetchComments = async () => {
                setIsLoading(true);
                setError(null);

                try {
                  const data = await fetchComments({ postId });
                  setComments(data);
                } catch (err) {
                  setError("加载评论失败，请刷新重试");
                  console.error(err);
                } finally {
                  setIsLoading(false);
                }
              };
              handleFetchComments();
            }}>
              <RefreshCw className="h-4 w-4 mr-2" />
              重试
            </Button>
          </div>
        ) : isLoading ? (
          <>
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
            {[1,].map((_, index) => (
              <CommentSkeleton key={index} />
            ))}
          </>
        ) : (
          <CommentList comments={comments} onRefresh={() => {
            const handleFetchComments = async () => {
              setIsLoading(true);
              setError(null);

              try {
                const data = await fetchComments({ postId });
                setComments(data);
              } catch (err) {
                setError("加载评论失败，请刷新重试");
                console.error(err);
              } finally {
                setIsLoading(false);
              }
            };
            handleFetchComments();
          }} />
        )}
      </CardContent>

      <Separator />

      <CardFooter className="p-4 pt-6">
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </CardFooter>
    </Card>
  );
}
