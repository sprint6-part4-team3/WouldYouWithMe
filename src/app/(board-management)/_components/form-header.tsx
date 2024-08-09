"use client";

import { useFormContext } from "react-hook-form";

import { Button } from "@/components/common";
import { BoardAddEditInput } from "@/types/board/add-edit";

interface BoardFormHeaderProps {
  type: "write" | "edit";
}

const BoardFormHeader = ({ type }: BoardFormHeaderProps) => {
  const {
    formState: { isValid },
  } = useFormContext<BoardAddEditInput>();

  return (
    <div className="mb-56 flex items-center justify-between">
      <h1 className="text-18-500 md:text-20-700">
        게시글 {type === "write" ? "쓰기" : "수정"}
      </h1>
      <Button
        disabled={!isValid}
        type="submit"
        variant="primary"
        className="h-32 w-74 md:h-48 md:w-184"
      >
        등록
      </Button>
    </div>
  );
};

export default BoardFormHeader;
