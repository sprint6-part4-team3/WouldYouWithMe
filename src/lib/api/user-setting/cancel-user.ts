import axios from "axios";

import instance from "../axios-instance";

const CancelUser = async () => {
  try {
    const response = await instance.delete(`/user`);

    if (response.status === 204) {
      return { success: true, message: "회원 탈퇴가 완료되었습니다." };
    }

    return { success: false, message: "회원 탈퇴 중 오류가 발생했습니다." };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: "회원 탈퇴 중 서버 오류가 발생했습니다.",
      };
    }
    return {
      success: false,
      message: "회원 탈퇴 중 네트워크 오류가 발생했습니다.",
    };
  }
};

export default CancelUser;
