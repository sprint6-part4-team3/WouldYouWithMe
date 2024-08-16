import { BoardWriter } from "../board";

export type BoardListType = {
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  writer: BoardWriter;
  likeCount: number;
  commentCount: number;
};

export type BoardListResponse = {
  list: BoardListType[];
  totalCount: number;
};
