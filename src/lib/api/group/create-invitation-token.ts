import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";

import instance from "../axios-instance";

// 초대 토큰 생성 GET 요청
const createInvitationToken = async (groupId: number) => {
  try {
    const res: AxiosResponse<string> = await instance.get(
      `/groups/${groupId}/invitation`,
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

export default createInvitationToken;
