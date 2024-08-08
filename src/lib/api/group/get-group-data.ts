import axios, { AxiosResponse } from "axios";

import { GroupResponse } from "@/types/group";

import instance from "../axios-instance";

// 팀 정보 GET 요청
const getGroupData = async (id: number) => {
  try {
    const res: AxiosResponse<GroupResponse> = await instance.get(
      `/groups/${id}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsInRlYW1JZCI6IjYtMyIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzIzMDgyOTIyLCJleHAiOjE3MjMwODY1MjIsImlzcyI6InNwLWNvd29ya2VycyJ9.wpdd2VcsT1WsvAys8Chzg__i1o-Mzwuq_S0vtkDsjko`,
        },
      },
    );
    return res.data;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw e.response?.data.message;
    } else {
      throw new Error("문제가 발생하였습니다.");
    }
  }
};

export default getGroupData;
