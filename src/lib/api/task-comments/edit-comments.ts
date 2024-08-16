import { AxiosError } from "axios";

import instance from "../axios-instance";

interface EditCommentResponse {
  success: boolean;
  message?: string;
}

const editComment = async (
  taskId: number,
  commentId: number,
  content: string,
): Promise<EditCommentResponse> => {
  try {
    const response = await instance.patch<EditCommentResponse>(
      `/tasks/${taskId}/comments/${commentId}`,
      {
        content,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(`본인의 댓글만 수정가능합니다`);
      } else if (error.request) {
        throw new Error("서버로부터 응답을 받지 못했습니다");
      } else {
        throw new Error("요청을 설정하는 중 오류가 발생했습니다");
      }
    }
    throw new Error("예상치 못한 오류가 발생했습니다");
  }
};

export default editComment;
