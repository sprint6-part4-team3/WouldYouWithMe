export type User = {
  id: number;
  email: string;
  encryptedPassword: string;
  nickname: string;
  image: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
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
