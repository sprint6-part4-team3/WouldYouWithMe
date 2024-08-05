export type BoardContentType = {
  // link: string;
  token: string;
  content: string;
};

export type BoardAddEditInput = {
  title: string;
  content: BoardContentType;
  image?: string;
};
