import { GroupMember } from "../user";

export type TaskList = {
  id: number;
  updatedAt: string | Date;
  name: string;
  description: null | string;
  doneAt: null | string | Date;
  date: string | Date;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "ONCE";
  recurringId: number;
  userId: null | number;
  deletedAt: null | string | Date;
};

export type GroupTask = {
  id: number;
  name: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  displayIndex: number;
  groupId: number;
  tasks: TaskList[];
};

export type GroupResponse = {
  updatedAt: string | Date;
  createdAt: string | Date;
  image: string | null;
  name: string;
  teamId: string;
  id: number;
  members: GroupMember[];
  taskLists: GroupTask[];
};
