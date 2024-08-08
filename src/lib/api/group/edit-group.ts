import axios, { AxiosResponse } from "axios";

import {
  CreateEditTeamResponse,
  TeamAddEditInput,
} from "@/types/team-management";

import instance from "../axios-instance";

// 팀 수정 PATCH 요청
const editGroup = async (data: TeamAddEditInput, id: number) => {
  try {
    const res: AxiosResponse<CreateEditTeamResponse> = await instance.patch(
      `/groups/${id}`,
      data,
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error("예상치 못한 에러가 발생하였습니다.");
    }
  }
};

export default editGroup;
