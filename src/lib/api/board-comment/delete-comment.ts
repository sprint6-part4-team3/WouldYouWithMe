import axios from "axios";

import { OTHER_TYPE_ERROR } from "@/constants/error-message";

import instance from "../axios-instance";

// 댓글 삭제 Delete 요청
const deleteBoardComment = async (commentId: number) => {
  try {
    const res = await instance.delete(`/comments/${commentId}`);
    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default deleteBoardComment;
