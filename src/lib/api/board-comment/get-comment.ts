import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { BoardCommentListResponse } from "@/types/board/comment";

import instance from "../axios-instance";

// 게시물 댓글 GET 요청
const getBoardComment = async (boardId: number, cursor?: number) => {
  try {
    const res: AxiosResponse<BoardCommentListResponse> = await instance.get(
      `/articles/${boardId}/comments`,
      {
        params: {
          limit: 7,
          cursor,
        },
        authorization: false,
      },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default getBoardComment;
