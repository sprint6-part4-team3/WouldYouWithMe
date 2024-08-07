export type Task = {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string;
  updatedAt: string;
  deletedAt: string;
  userId: number;
  recurringId: number;
  frequency: string;
};

export type DayTasks = {
  date: string;
  tasks: Task[];
};

export type MyHistoryData = {
  myHistory: DayTasks[];
};
