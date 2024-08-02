import React from "react";

import { IconButton } from "@/components/common";

const CommentInput = () => (
  <div className="relative mt-16 border-y-[0.2px] border-text-disabled">
    <input
      type="text"
      placeholder="댓글을 달아주세요"
      className="w-full rounded-lg border-none bg-background-primary p-13 text-white placeholder:text-gray-400 focus-visible:outline-none"
    />
    <IconButton
      type="submit"
      icon="IconComment"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
    />
  </div>
);

export default CommentInput;
