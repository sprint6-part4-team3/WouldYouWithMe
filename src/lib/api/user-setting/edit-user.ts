import axios from "axios";

import { UserSettingInput } from "@/types/auth";

import instance from "../axios-instance";

const editUser = async (data: UserSettingInput) => {
  try {
    const response = await instance.patch(`/user`, data);

    return { success: true, response };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        data: error.response.data,
      };
    }

    return {
      success: false,
      data: { message: "수정 요청 중 오류가 발생했습니다." },
    };
  }
};

export default editUser;
