import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { GroupResponse } from "@/types/group";

import instance from "../axios-instance";

// 팀 삭제 요청
const deleteGroup = async (id: number) => {
  try {
    const res: AxiosResponse<GroupResponse> = await instance.delete(
      `/groups/${id}`,
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      // 서버에서의 에러 처리
      if (e.response) {
        throw e.response?.data.message || "팀 삭제 중 오류가 발생했습니다.";
      } else {
        throw new Error("팀 삭제 중 오류가 발생했습니다.");
      }
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default deleteGroup;
