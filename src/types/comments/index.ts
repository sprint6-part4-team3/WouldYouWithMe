export type User = {
  id: number;
  email: string;
  nickname: string;
  image: string | null;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: User;
};

export type GetCommentsResponse = {
  comments: Comment[];
};
