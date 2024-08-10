/* eslint-disable no-console */

import { AxiosError } from "axios";

import { TaskDetailData } from "@/types/task-detail";

import instance from "../axios-instance";

const getTaskDetail = async (
  groupId: number,
  taskListId: number,
  taskId: number,
): Promise<TaskDetailData | null> => {
  try {
    const response = await instance.get(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
      {
        authorization: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error in getTaskDetail:", error);
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error(
          `태스크 상세 정보를 가져오는데 실패했습니다: ${error.response.status} ${error.response.statusText}`,
        );
      } else if (error.request) {
        console.error("서버로부터 응답을 받지 못했습니다");
      } else {
        console.error("요청을 설정하는 중 오류가 발생했습니다");
      }
    } else {
      console.error("예상치 못한 오류가 발생했습니다");
    }
    return null;
  }
};

export default getTaskDetail;
