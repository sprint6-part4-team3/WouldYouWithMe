export type BoardWriter = {
  nickname: string;
  id: number;
};

export type BoardResponse = {
  updatedAt: string | Date;
  createdAt: string | Date;
  likeCount: number;
  writer: BoardWriter;
  image: string | null;
  title: string;
  id: number;
  isLiked: boolean;
  content: string;
};
