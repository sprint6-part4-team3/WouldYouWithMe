import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { InvitationRequestType } from "@/types/team-management";

import instance from "../axios-instance";

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
      if (error.response?.data.message === "Validation Failed") {
        throw new Error("로그인 후 팀 참여가 가능합니다.");
      }
      throw error.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default acceptInvitation;
