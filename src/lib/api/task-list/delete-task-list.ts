import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { GroupTask } from "@/types/group";

import instance from "../axios-instance";

// 팀 목록 DELETE 요청
const deleteTaskList = async (
  groupId: number,
  id: number,
): Promise<GroupTask> => {
  try {
    const res: AxiosResponse<GroupTask> = await instance.delete(
      `/groups/${groupId}/task-lists/${id}`,
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

export default deleteTaskList;
