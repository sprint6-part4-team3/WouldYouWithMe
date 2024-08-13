import { AxiosError } from "axios";

import { TaskDetailData } from "@/types/task-detail";

import instance from "../axios-instance";

const getTaskDetail = async (
  groupId: number,
  taskListId: number,
  taskId: number,
): Promise<TaskDetailData> => {
  try {
    const response = await instance.get(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `태스크 상세 정보를 가져오는데 실패했습니다: ${error.response.status} ${error.response.statusText}`,
        );
      } else if (error.request) {
        throw new Error("서버로부터 응답을 받지 못했습니다");
      } else {
        throw new Error("요청을 설정하는 중 오류가 발생했습니다");
      }
    } else {
      throw new Error("예상치 못한 오류가 발생했습니다");
    }
  }
};

export default getTaskDetail;
