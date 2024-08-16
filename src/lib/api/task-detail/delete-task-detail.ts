import { isAxiosError } from "axios";

import instance from "../axios-instance";

const deleteTaskDetail = async (
  taskId: string,
  groupId: string,
  taskListId: string,
) => {
  try {
    const response = await instance.delete(
      `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `테스크 삭제에 실패했습니다:${error.response.statusText}`,
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

export default deleteTaskDetail;
