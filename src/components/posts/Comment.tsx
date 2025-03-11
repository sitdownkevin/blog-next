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
import { Send, Loader2 } from "lucide-react";

type CommentType = {
  comment: number;
  user_id: number;
  post_id: number;
  comment_text: string;
  comment_ts: number;
};

async function fetchData({
  setData,
  setIsLoading,
}: {
  setData: (data: CommentType[]) => void;
  setIsLoading: (loading: boolean) => void;
}) {
  try {
    const response = await fetch("/api/db");
    const data = await response.json();
    setData(data);
    setIsLoading(false);
  } catch (error) {
    console.error("Error fetching data:", error);
    setIsLoading(false);
  }
}

async function postComment({
  commentText,
  postId,
  userId = 1, // 默认用户ID，实际应用中应该从认证系统获取
  onSuccess,
  onError,
}: {
  commentText: string;
  postId: number;
  userId?: number;
  onSuccess: () => void;
  onError: (error: any) => void;
}) {
  try {
    const response = await fetch("/api/db/insert_comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        post_id: postId,
        comment_text: commentText,
        comment_ts: Math.floor(Date.now() / 1000),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to post comment");
    }

    onSuccess();
  } catch (error) {
    onError(error);
  }
}

export function Comment({ postId = 1 }: { postId?: number }) {
  const [data, setData] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData({ setData, setIsLoading });
  }, []);

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      setError("评论内容不能为空");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    await postComment({
      commentText,
      postId,
      onSuccess: () => {
        // 添加新评论到列表（实际应用中应该重新获取数据）
        const newComment: CommentType = {
          comment: Date.now(), // 临时ID
          user_id: 1, // 假设当前用户ID为1
          post_id: postId,
          comment_text: commentText,
          comment_ts: Math.floor(Date.now() / 1000),
        };
        setData([...data, newComment]);
        setCommentText("");
        setIsSubmitting(false);
      },
      onError: (err) => {
        console.error("Error posting comment:", err);
        setError("发布评论失败，请稍后重试");
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          // 加载状态显示骨架屏
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[30%]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              </div>
            ))
        ) : data.length > 0 ? (
          data.map((comment) => (
            <div key={comment.comment} className="mb-4">
              <div className="flex items-start space-x-4 mb-2">
                <Avatar>
                  <AvatarFallback>{`U${comment.user_id}`}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="font-medium">User #{comment.user_id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(comment.comment_ts * 1000).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-sm">{comment.comment_text}</p>
              {comment !== data[data.length - 1] && (
                <Separator className="my-4" />
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">No comments yet</p>
        )}
      </CardContent>
      <Separator />
      <CardFooter className="p-4">
        <div className="w-full space-y-4">
          <div className="flex items-start gap-4">
            <Avatar className="mt-1">
              <AvatarFallback>U1</AvatarFallback>
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
      </CardFooter>
    </Card>
  );
}
