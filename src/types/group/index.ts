import { Group, GroupMember } from "../user";

export type GroupTask = Group & {
  tasks: string[];
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
