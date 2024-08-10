import { isAxiosError } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { GroupResponse } from "@/types/group";

import instance from "../axios-instance";

interface Params {
  groupId: number;
}

type Response = {
  id: number;
  name: string;
}[];

type GetTaskLists = (params: Params) => Promise<Response>;

const getTaskLists: GetTaskLists = async ({ groupId }) => {
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
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};
export default getTaskLists;
