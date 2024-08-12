"use server";

import axios from "axios";

import instance from "@/lib/api/axios-instance";

const SendEmail = async (email: string, redirectUrl: string) => {
  try {
    const response = await instance.post(`/user/send-reset-password-email`, {
      email,
      redirectUrl,
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        return {
          success: false,
          data: { message: "존재하지 않는 유저입니다." },
        };
      }
      return {
        success: false,
        data: error.response.data,
      };
    }

    return {
      success: false,
      data: {
        message: "비밀번호 재설정 이메일 전송 요청 중 오류가 발생했습니다.",
      },
    };
  }
};

export default SendEmail;
