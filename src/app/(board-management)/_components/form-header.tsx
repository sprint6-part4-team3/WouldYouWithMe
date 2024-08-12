"use client";

import { useFormContext } from "react-hook-form";

import { Button, FloatButton } from "@/components/common";
import { LoadingSpinner } from "@/public/assets/icons";
import { BoardAddEditInput } from "@/types/board/add-edit";

interface BoardFormHeaderProps {
  type: "write" | "edit";
  isPending?: boolean;
}

const BoardFormHeader = ({ type, isPending = false }: BoardFormHeaderProps) => {
  const {
    formState: { isValid },
  } = useFormContext<BoardAddEditInput>();

  return (
    <div className="mb-56 flex items-center justify-between">
      <h1 className="text-18-500 md:text-20-700">
        게시글 {type === "write" ? "쓰기" : "수정"}
      </h1>
      {isPending ? (
        <FloatButton
          Icon={<LoadingSpinner width={30} height={30} />}
          type="submit"
          disabled
          variant="primary"
          className="h-32 w-74 md:h-48 md:w-184"
        >
          {type === "write" ? "작성중" : "수정중"}
        </FloatButton>
      ) : (
        <Button
          disabled={!isValid}
          type="submit"
          variant="primary"
          className="h-32 w-74 md:h-48 md:w-184"
        >
          {type === "write" ? "작성" : "수정"}
        </Button>
      )}
    </div>
  );
};

export default BoardFormHeader;
