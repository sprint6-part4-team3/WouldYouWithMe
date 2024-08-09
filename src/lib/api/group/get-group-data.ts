import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { GroupResponse } from "@/types/group";

import instance from "../axios-instance";

// 팀 정보 GET 요청
const getGroupData = async (id: number) => {
  try {
    const res: AxiosResponse<GroupResponse> = await instance.get(
      `/groups/${id}`,
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default getGroupData;
