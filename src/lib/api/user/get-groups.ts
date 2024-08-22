import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { Group } from "@/types/user";

import instance from "../axios-instance";

// 참여하고 있는 팀
const getGroups = async () => {
  try {
    const { data }: AxiosResponse<Group[]> = await instance.get("/user/groups");
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default getGroups;
