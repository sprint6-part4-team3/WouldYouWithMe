/* eslint-disable import/no-cycle */
import { TaskDetailData } from "../task-detail";

export type Tasks = TaskDetailData[];

export type TaskListAddEditInput = {
  name: string;
};

export type TaskListEditIndex = {
  displayIndex: number;
};

export type FrequencyType = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";

export type NewTaskBase = {
  name: string;
  description?: string;
  frequencyType: FrequencyType;
  startDate: string;
};

export type WeeklyTaskForm = NewTaskBase & {
  frequencyType: "WEEKLY";
  weekDays: string[];
};
export type WeeklyTask = NewTaskBase & {
  frequencyType: "WEEKLY";
  weekDays: number[];
};

export type MonthlyTask = NewTaskBase & {
  frequencyType: "MONTHLY";
  monthDay: number;
};

export type OtherTask = NewTaskBase & {
  frequencyType: "ONCE" | "DAILY";
};

export type NewTaskForm = WeeklyTaskForm | MonthlyTask | OtherTask;
export type NewTask = WeeklyTask | MonthlyTask | OtherTask;

export type EditTaskType = {
  name: string;
  description?: string;
  done: boolean;
};
