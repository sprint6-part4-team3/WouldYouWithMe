/* eslint-disable import/no-cycle */
import { TaskDetailData } from "../task-detail";

export type Tasks = TaskDetailData[];

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
