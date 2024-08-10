export type Task = {
  id: number;
  name: string;
  date: string;
  frequency: string;
  userId: number;
  doneAt: string | null;
  updatedAt: string;
  deletedAt: string | null;
  recurringId: number;
};

export type TaskListAddEditInput = {
  name: string;
};

export type RepeatType = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";

export type NewTaskBase = {
  name: string;
  frequencyType: RepeatType;
  description?: string;
  displayIndex?: number;
};

export type WeeklyTask = NewTaskBase & {
  frequencyType: "WEEKLY";
  weekDays: string[];
};

export type MonthlyTask = NewTaskBase & {
  frequencyType: "MONTHLY";
  monthDay: number;
};

export type OtherTask = NewTaskBase & {
  frequencyType: "ONCE" | "DAILY";
};

export type NewTask = WeeklyTask | MonthlyTask | OtherTask;
