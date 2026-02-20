// 评论数据类型定义
export type CommentType = {
  comment_id: string;
  user_id: string;
  post_id: string;
  comment_text: string;
  comment_ts: number;
  user?: {
    id: string;
    name: string;
    image?: string;
  };
};

export type CommentToBeSubmittedType = {
  user_id: string;
  post_id: string;
  comment_text: string;
  comment_ts: number;
};
