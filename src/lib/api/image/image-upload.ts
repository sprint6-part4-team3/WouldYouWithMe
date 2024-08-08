import axios, { AxiosResponse } from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";

import instance from "../axios-instance";

export type ImageResponse = {
  url: string;
};

// 이미지 업로드 POST 요청
const imageUpload = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);
  try {
    const res: AxiosResponse<ImageResponse> = await instance.post(
      `/images/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default imageUpload;
