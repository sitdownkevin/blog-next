"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/auth-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Send, Loader2, RefreshCw, Trash2, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { CommentType, CommentToBeSubmittedType } from "@/lib/comments/types";
import { fetchComments, postComment, deleteComment } from "@/lib/comments/api";

interface User {
  id: string;
  name: string;
  email?: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionData {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string;
    userAgent?: string;
  };
}

// 单条评论组件
function CommentItem({
  comment,
  currentUser,
  onDelete,
}: {
  comment: CommentType;
  currentUser: User | null;
  onDelete: (commentId: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("确定要删除这条评论吗？")) return;

    setIsDeleting(true);
    try {
      await deleteComment(comment.comment_id);
      onDelete(comment.comment_id);
    } catch (error) {
      console.error("删除评论失败:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-4 py-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.user.image} alt={comment.user.name} />
        <AvatarFallback>
          {comment.user.name?.charAt(0)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">{comment.user.name}</h4>
            <span className="text-muted-foreground text-xs">
              {new Date(comment.comment_ts * 1000).toLocaleString("zh-CN")}
            </span>
          </div>

          {currentUser?.id === comment.user_id && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <p className="text-sm leading-relaxed">{comment.comment_text}</p>
      </div>
    </div>
  );
}

// 评论骨架屏
function CommentSkeleton() {
  return (
    <div className="flex gap-4 py-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

// 评论表单组件
function CommentForm({
  postId,
  currentUser,
  onCommentAdded,
}: {
  postId: string;
  currentUser: User | null;
  onCommentAdded: (comment: CommentType) => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      setError("评论内容不能为空");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = await postComment({
        postId: postId,
        commentText: commentText.trim(),
      });

      onCommentAdded(newComment);
      setCommentText("");
    } catch (error: any) {
      setError(error.message || "发布评论失败，请稍后重试");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <Alert>
        <MessageSquare className="h-4 w-4" />
        <AlertDescription>请先登录后再发表评论</AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={currentUser.image} alt={currentUser.name} />
          <AvatarFallback>
            {currentUser.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <Textarea
            placeholder="写下你的评论..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
            className="min-h-[100px] resize-none"
          />
          {error && <p className="text-sm text-destructive mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || !commentText.trim()}
          className="gap-2"
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
    </form>
  );
}

// 主评论组件
export function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取用户信息
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await authClient.getSession();
        if (!error && data) {
          setCurrentUser(data.user);
        }
      } catch (err) {
        console.error("获取用户信息失败:", err);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  // 获取评论
  const loadComments = async () => {
    setIsLoadingComments(true);
    setError(null);

    try {
      const data = await fetchComments({ postId });
      setComments(data);
    } catch (err) {
      setError("加载评论失败，请稍后重试");
      console.error("获取评论失败:", err);
    } finally {
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleCommentAdded = async (newComment: CommentType) => {
    // 重新加载评论列表以确保数据同步
    await loadComments();
  };

  const handleCommentDeleted = (commentId: string) => {
    setComments((prev) =>
      prev.filter((comment) => comment.comment_id !== commentId)
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            评论 ({comments.length})
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadComments}
            disabled={isLoadingComments}
            className="gap-2"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoadingComments ? "animate-spin" : ""}`}
            />
            刷新
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 评论表单 */}
        {!isLoadingUser && (
          <CommentForm
            postId={postId}
            currentUser={currentUser}
            onCommentAdded={handleCommentAdded}
          />
        )}

        <Separator />

        {/* 评论列表 */}
        <div className="space-y-1">
          {error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : isLoadingComments ? (
            <div className="space-y-1">
              {[1, 2, 3].map((i) => (
                <CommentSkeleton key={i} />
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                还没有评论，来发表第一条评论吧！
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.comment_id}
                  comment={comment}
                  currentUser={currentUser}
                  onDelete={handleCommentDeleted}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
