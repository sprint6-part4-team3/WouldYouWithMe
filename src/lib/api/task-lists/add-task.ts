import { NewTask } from "@/types/task-list";

import instance from "../axios-instance";

interface Params {
  groupId: number;
  taskListId: number;
  newTask: NewTask;
}

type Response = boolean;

type AddTask = (params: Params) => Promise<Response>;

const addTask: AddTask = async ({ groupId, taskListId, newTask }) => {
  const response = await instance.post<Response>(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    { ...newTask },
  );
  return response.status === 200;
};
export default addTask;
