import { BoardWriter } from ".";

export type BoardContentType = {
  token: string;
  content: string;
};

export type BoardAddEditInput = {
  title: string;
  content: BoardContentType;
  image?: string;
};

export type BoardCreateEditRequest = {
  title: string;
  content: string;
  image?: string;
};

export type BoardCreateEditResponse = {
  updatedAt: string | Date;
  createdAt: string | Date;
  likeCount: number;
  writer: BoardWriter;
  image: string | null;
  title: string;
  id: number;
};
