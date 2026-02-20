import { CommentSection } from "./CommentSection";
import { AuthSection } from "./Auth";

interface ContainerProps {
  postId?: string;
}

export function Container({ postId = "default" }: ContainerProps) {
  return (
    <div className="w-full space-y-6">
      {/* 认证区域 */}
      <AuthSection />

      {/* 评论区域 */}
      <CommentSection postId={postId} />
    </div>
  );
}
