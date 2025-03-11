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
import { Send, Loader2, RefreshCw } from "lucide-react";

// 评论数据类型定义
type CommentType = {
  comment: number;
  user_id: number;
  post_id: number;
  comment_text: string;
  comment_ts: number;
};

// API 服务函数
const commentService = {
  // 获取评论列表
  async fetchComments(postId: number): Promise<CommentType[]> {
    try {
      const response = await fetch(`/api/db/get_comments?postId=${postId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return await response.json();
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  },

  // 发布新评论
  async postComment(comment: Omit<CommentType, "comment">): Promise<any> {
    const response = await fetch("/api/db/insert_comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });

    if (!response.ok) {
      throw new Error("Failed to post comment");
    }

    return await response.json();
  }
};

// 评论骨架屏组件
function CommentSkeleton() {
  return (
    <>
      {Array(3).fill(0).map((_, index) => (
        <div key={index} className="flex space-x-4 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      ))}
    </>
  );
}

// 单条评论组件
function CommentItem({ comment, isLast }: { comment: CommentType, isLast: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarFallback>{`U${comment.user_id}`}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-0">
            <p className="font-medium">User #{comment.user_id}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(comment.comment_ts * 1000).toLocaleString()}
            </p>
          </div>
          <p className="text-sm">{comment.comment_text}</p>
        </div>
      </div>
      {!isLast && <Separator className="my-4" />}
    </div>
  );
}

// 评论列表组件
function CommentList({ comments, isLoading, onRefresh }: { 
  comments: CommentType[], 
  isLoading: boolean,
  onRefresh: () => void
}) {
  if (isLoading) {
    return <CommentSkeleton />;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </p>
        <Button variant="ghost" size="sm" onClick={onRefresh} className="h-8">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentItem 
            key={comment.comment} 
            comment={comment} 
            isLast={index === comments.length - 1} 
          />
        ))
      ) : (
        <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
}

// 评论表单组件
function CommentForm({ 
  postId, 
  onCommentAdded 
}: { 
  postId: number, 
  onCommentAdded: (comment: CommentType) => void 
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
      const commentData = {
        user_id: 1, // 假设当前用户ID为1
        post_id: postId,
        comment_text: commentText,
        comment_ts: Math.floor(Date.now() / 1000),
      };
      
      await commentService.postComment(commentData);
      
      // 创建新评论对象并通知父组件
      const newComment: CommentType = {
        ...commentData,
        comment: Date.now(), // 临时ID
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
  );
}

// 主评论组件
export function Comment({ postId = 1 }: { postId?: number }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await commentService.fetchComments(postId);
      setComments(data);
    } catch (err) {
      setError("加载评论失败，请刷新重试");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentAdded = (newComment: CommentType) => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      
      <CardContent>
        {error ? (
          <div className="text-center py-4">
            <p className="text-red-500 mb-2">{error}</p>
            <Button variant="outline" onClick={fetchComments}>
              <RefreshCw className="h-4 w-4 mr-2" />
              重试
            </Button>
          </div>
        ) : (
          <CommentList 
            comments={comments} 
            isLoading={isLoading} 
            onRefresh={fetchComments}
          />
        )}
      </CardContent>
      
      <Separator />
      
      <CardFooter className="p-4 pt-6">
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      </CardFooter>
    </Card>
  );
}
