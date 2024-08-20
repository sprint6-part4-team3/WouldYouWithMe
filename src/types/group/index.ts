import { GroupMember } from "../user";

export type TaskList = {
  id: number;
  updatedAt: string;
  name: string;
  description: string;
  doneAt: null | string;
  date: string;
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "ONCE";
  recurringId: number;
  userId: null | number;
  deletedAt: null | string;
  writer: {
    id: number;
    nickname: string;
    image: string | null | undefined;
  };
};

export type GroupTask = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  displayIndex: number;
  groupId: number;
  tasks: TaskList[];
};

export type GroupResponse = {
  updatedAt: string;
  createdAt: string;
  image: string | null;
  name: string;
  teamId: string;
  id: number;
  members: GroupMember[];
  taskLists: GroupTask[];
};
