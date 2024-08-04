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

export type RepeatType = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
