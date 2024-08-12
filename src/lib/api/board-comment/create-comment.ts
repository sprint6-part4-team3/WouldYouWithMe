import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { BoardCommentInput, BoardCommentResponse } from "@/types/board/comment";

import instance from "../axios-instance";

// 댓글 작성 POST 요청
const createBoardComment = async (
  boardId: number,
  content: BoardCommentInput,
) => {
  try {
    const res: AxiosResponse<BoardCommentResponse> = await instance.post(
      `/articles/${boardId}/comments`,
      content,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default createBoardComment;
