export type ArticleCommentWriter = {
  image: string | null;
  nickname: string;
  id: number;
};

export type ArticleCommentResponse = {
  writer: ArticleCommentWriter;
  updatedAt: string | Date;
  createdAt: string | Date;
  content: string;
  id: number;
};

export type ArticleCommentListResponse = {
  nextCursor: number;
  list: ArticleCommentResponse[];
};
