import { AxiosResponse, isAxiosError } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { Group } from "@/types/user";

import instance from "../axios-instance";

// 참여하고 있는 팀
const getUserGroups = async () => {
  try {
    const { data }: AxiosResponse<Group[]> = await instance.get("/user/groups");
    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default getUserGroups;
