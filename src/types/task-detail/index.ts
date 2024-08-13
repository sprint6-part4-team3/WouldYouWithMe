export type Comment = {
  userId: number;
  taskId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
};

export type Recurring = {
  groupId: number;
  taskListId: number;
  monthDay: number;
  weekDays: number[];
  frequencyType: string;
  displayIndex: number;
  updatedAt: string;
  createdAt: string;
  startDate: string;
  description: string;
  name: string;
  id: number;
};

export type User = {
  image: string;
  nickname: string;
  id: number;
};

export type TaskDetailData = {
  comments: Comment[];
  recurring: Recurring;
  user: User;
  deletedAt: string | null;
  userId: number;
  recurringId: number;
  frequency: string;
  date: string;
  doneAt: string | null;
  description: string;
  name: string;
  updatedAt: string;
  id: number;
};

export type TaskEdit = { name?: string; description?: string; done: boolean };
export type TaskEditData = { done: boolean };
