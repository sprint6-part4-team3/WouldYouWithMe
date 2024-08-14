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
      if (error.response?.status === 400) {
        throw new Error("로그인 후 댓글 삭제가 가능합니다.");
      }
      throw error.response?.data;
    } else {
      throw new Error(OTHER_TYPE_ERROR);
    }
  }
};

export default deleteBoardComment;
