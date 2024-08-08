import axios, { AxiosResponse } from "axios";

import {
  CreateEditTeamResponse,
  TeamAddEditInput,
} from "@/types/team-management";

import instance from "../axios-instance";

// 팀 생성 POST 요청
const createGroup = async (data: TeamAddEditInput) => {
  try {
    const res: AxiosResponse<CreateEditTeamResponse> = await instance.post(
      `/groups`,
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

export default createGroup;
