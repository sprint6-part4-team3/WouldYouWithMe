import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";

import instance from "../axios-instance";

type InvitationRequestType = {
  userEmail: string;
  token: string;
};

// 초대 수락 생성 POST 요청
const acceptInvitation = async (data: InvitationRequestType) => {
  try {
    const res: AxiosResponse<string> = await instance.post(
      `/groups/accept-invitation`,
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

export default acceptInvitation;
