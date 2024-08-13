import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import {
  BoardCreateEditRequest,
  BoardCreateEditResponse,
} from "@/types/board/add-edit";

import instance from "../axios-instance";

// 게시글 수정 PATCH 요청
const editBoard = async (data: BoardCreateEditRequest, id: number) => {
  try {
    const res: AxiosResponse<BoardCreateEditResponse> = await instance.patch(
      `/articles/${id}`,
      data,
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

export default editBoard;
