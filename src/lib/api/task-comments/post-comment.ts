/*eslint-disable */
import { AxiosError } from "axios";

import { PostCommentRequest } from "@/types/comments/index";

import instance from "../axios-instance";

const createComment = async (
  taskId: number,
  content: string,
): Promise<PostCommentRequest> => {
  try {
    const response = await instance.post<PostCommentRequest>(
      `/tasks/${taskId}/comments`,
      {
        content,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in postComment:", error);
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(
          `댓글을 작성하는데 실패했습니다: ${error.response.status} ${error.response.statusText}`,
        );
      } else if (error.request) {
        throw new Error("서버로부터 응답을 받지 못했습니다");
      } else {
        throw new Error("요청을 설정하는 중 오류가 발생했습니다");
      }
    }
    throw new Error("예상치 못한 오류가 발생했습니다");
  }
};

export default createComment;
