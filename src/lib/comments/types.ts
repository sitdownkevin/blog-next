// 评论数据类型定义
export type CommentType = {
  comment_id: number;
  user_id: number;
  post_id: string;
  comment_text: string;
  comment_ts: number;
};


export type CommentToBeSubmittedType = {
    user_id: number;
    post_id: string;
    comment_text: string;
    comment_ts: number;
}