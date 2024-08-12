import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { BoardResponse } from "@/types/board";

import instance from "../axios-instance";

// 게시물 삭제 Delete 요청
const deleteBoard = async (boardId: number) => {
  try {
    const res: AxiosResponse<BoardResponse> = await instance.delete(
      `/articles/${boardId}`,
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

export default deleteBoard;
