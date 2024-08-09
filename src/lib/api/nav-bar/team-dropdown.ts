/* eslint-disable no-console */

"use server";

import axios from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";
import { User } from "@/types/user";

import instance from "../axios-instance";

const getUserData = async (): Promise<User> => {
  try {
    const response = await instance.get<User>(`/user`);

    return response.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default getUserData;
