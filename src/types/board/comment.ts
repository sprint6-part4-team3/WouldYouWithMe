export type BoardCommentWriter = {
  image: string | null;
  nickname: string;
  id: number;
};

export type BoardCommentResponse = {
  writer: BoardCommentWriter;
  updatedAt: string | Date;
  createdAt: string | Date;
  content: string;
  id: number;
};

export type BoardCommentListResponse = {
  nextCursor: number;
  list: BoardCommentResponse[];
};
