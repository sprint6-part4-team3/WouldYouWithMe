import { isAxiosError } from "axios";

import { GroupResponse, TaskList } from "@/types/group";

import instance from "../axios-instance";
import getTasks from "../task-detail/get-tasks";

interface Params {
  groupId: number;
  taskListId: number;
  date: string;
}

type Response = {
  id: number;
  name: string;
}[];

type GetTaskLists = (params: Params) => Promise<Response>;

const getTaskLists: GetTaskLists = async ({ groupId, taskListId, date }) => {
  try {
    const { data: listData } = await instance.get<GroupResponse>(
      `/groups/${groupId}`,
    );

    // 할 일 종류 받아와서 id랑 name만 뽑기
    const taskLists = listData.taskLists.map(({ id, name }) => ({
      id,
      name,
    }));
    return taskLists;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error("알 수 없는 에러 발생");
    }
  }
};
export default getTaskLists;
