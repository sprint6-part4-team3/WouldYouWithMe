export type BoardContentType = {
  token: string;
  content: string;
};

export type BoardAddEditInput = {
  title: string;
  content: BoardContentType;
  image?: string;
};
