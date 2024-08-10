export type BoardWriter = {
  nickname: string;
  id: number;
};

export type BoardResponse = {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: BoardWriter;
  image: string | null;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
};
