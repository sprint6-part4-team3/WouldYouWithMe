import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { GroupTask } from "@/types/group";
import { TaskListAddEditInput } from "@/types/task-list";

import instance from "../axios-instance";

// 팀 목록 생성 POST 요청
const createTaskList = async (
  data: TaskListAddEditInput,
  groupId: number,
): Promise<GroupTask> => {
  try {
    const res: AxiosResponse<GroupTask> = await instance.post(
      `/groups/${groupId}/task-lists`,
      data,
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default createTaskList;
