import { isAxiosError } from "axios";

import instance from "../axios-instance";

const getMyHistory = async () => {
  try {
    const response = await instance.get("/user/history");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        throw new Error(`마이 히스토리를 가져오는데 실패했습니다`);
      } else if (error.request) {
        throw new Error("서버로부터 응답을 받지 못했습니다");
      } else {
        throw new Error("요청을 설정하는 중 오류가 발생했습니다");
      }
    } else {
      throw new Error("예상치 못한 오류가 발생했습니다");
    }
  }
};

export default getMyHistory;
