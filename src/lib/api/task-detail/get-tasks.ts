import { isAxiosError } from "axios";

import { TaskList } from "@/types/group";
import { Tasks } from "@/types/task-list";

import instance from "../axios-instance";

interface Params {
  groupId: number;
  taskListId: number;
  date: string;
}

type Response = TaskList[];

type GetTasks = (params: Params) => Promise<Response>;

const getTasks: GetTasks = async ({ groupId, taskListId, date }) => {
  try {
    const params = new URLSearchParams({
      date,
    });
    const { data } = await instance.get<Response>(
      `/groups/${groupId}/task-lists/${taskListId}/tasks?${params.toString()}`,
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error("알 수 없는 에러 발생");
    }
  }
};
export default getTasks;
