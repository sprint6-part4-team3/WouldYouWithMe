export type Task = {
  id: number;
  name: string;
  description: string | null;
  date: string;
  doneAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  recurringId: number;
  frequency: string;
  writerId?: number | null;
  displayIndex?: number;
};

export type DayTasks = {
  date: string;
  tasks: Task[];
};

export type MyHistoryData = {
  myHistory: DayTasks[];
};

export type HistoryResponse = {
  tasksDone: Task[];
};
