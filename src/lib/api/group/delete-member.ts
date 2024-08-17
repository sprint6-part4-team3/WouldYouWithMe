import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { BoardResponse } from "@/types/board";

import instance from "../axios-instance";

// 멤버 삭제 Delete 요청
const deleteMember = async (groupId: number, memberId: number) => {
  try {
    const res: AxiosResponse<BoardResponse> = await instance.delete(
      `/groups/${groupId}/member/${memberId}`,
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

export default deleteMember;
