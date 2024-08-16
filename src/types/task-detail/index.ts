// export type Comment = {
//   userId: number;
//   taskId: number;
//   updatedAt: string;
//   createdAt: string;
//   content: string;
//   id: number;
// };

export type Recurring = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  startDate: string;
  frequencyType: string;
  weekDays: number[];
  monthDay: number | null;
  taskListId: number;
  groupId: number;
  writerId: number;
};

export type User = {
  id: number;
  nickname: string;
  image: string;
};

export type DoneBy = {
  user: User | null;
};

export type TaskDetailData = {
  id: number;
  updatedAt: string;
  date: string;
  doneAt: string | null;
  recurringId: number;
  name: string;
  description: string;
  frequency: string;
  deletedAt: string | null;
  displayIndex: number;
  recurring: Recurring;
  writer: User;
  doneBy: DoneBy;
  commentCount: number;
};

export type TaskEdit = { name?: string; description?: string; done: boolean };
export type TaskEditData = { done: boolean };
