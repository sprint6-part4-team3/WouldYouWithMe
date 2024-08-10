import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
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
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default editGroup;
