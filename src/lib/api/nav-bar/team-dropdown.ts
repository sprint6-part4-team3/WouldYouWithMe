/* eslint-disable no-console */

"use server";

import axios from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { Group } from "@/types/user";

import instance from "../axios-instance";

const getTeamData = async (): Promise<Group[]> => {
  try {
    const response = await instance.get<Group[]>(`/user/groups`);

    console.log("Team Data:", response.data);

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default getTeamData;
