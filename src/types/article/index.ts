export type ArticleWriter = {
  nickname: string;
  id: number;
};

export type ArticleResponse = {
  updatedAt: string | Date;
  createdAt: string | Date;
  likeCount: number;
  writer: ArticleWriter;
  image: string | null;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
};
