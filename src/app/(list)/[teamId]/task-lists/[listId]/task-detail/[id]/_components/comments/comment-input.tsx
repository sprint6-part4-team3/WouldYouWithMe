"use client";

import React, { useState } from "react";

import { IconButton } from "@/components/common";

const CommentInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="relative border-y-[0.2px] border-text-disabled">
      <input
        type="text"
        placeholder="댓글을 달아주세요"
        className="w-full !border-0 bg-background-primary p-13 placeholder:text-gray-400 focus:!outline-none"
        value={inputValue}
        onChange={handleInputChange}
      />
      <IconButton
        type="submit"
        icon="IconComment"
        variant={inputValue ? "green" : "darkest"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
        disabled={!inputValue}
      />
    </form>
  );
};

export default CommentInput;
