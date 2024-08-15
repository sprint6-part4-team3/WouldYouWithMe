import axios, { AxiosResponse } from "axios";

import { OrderType } from "@/constants/board-order-option";
import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { BoardListResponse } from "@/types/board-list";

import instance from "../axios-instance";

type BoardListParamType = {
  page?: number;
  orderBy?: OrderType;
  keyword?: string;
};

// 게시물 정보 GET 요청
const getBoardList = async ({
  page = 1,
  orderBy = "recent",
  keyword = "",
}: BoardListParamType) => {
  try {
    const res: AxiosResponse<BoardListResponse> = await instance.get(
      `/articles`,
      {
        params: {
          page,
          orderBy,
          keyword,
          pageSize: 6,
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

export default getBoardList;
