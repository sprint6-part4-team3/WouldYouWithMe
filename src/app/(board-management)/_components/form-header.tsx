"use client";

import { useFormContext } from "react-hook-form";

import { Button, FloatButton } from "@/components/common";
import { LoadingSpinner } from "@/public/assets/icons";
import { BoardAddEditInput } from "@/types/board/add-edit";

interface BoardFormHeaderProps {
  type: "write" | "edit";
  isPending?: boolean;
  isImgLoading?: boolean;
}

const BoardFormHeader = ({
  type,
  isPending = false,
  isImgLoading = false,
}: BoardFormHeaderProps) => {
  const {
    formState: { isValid },
  } = useFormContext<BoardAddEditInput>();

  let buttonLabel;

  if (isImgLoading) {
    buttonLabel = "이미지 업로드";
  } else if (type === "write") {
    buttonLabel = "작성중";
  } else {
    buttonLabel = "수정중";
  }

  return (
    <div className="mb-56 flex items-center justify-between">
      <h1 className="text-18-500 md:text-20-700">
        게시글 {type === "write" ? "쓰기" : "수정"}
      </h1>
      {isPending || isImgLoading ? (
        <FloatButton
          Icon={
            <LoadingSpinner width={20} height={20} className="md:size-30" />
          }
          type="submit"
          disabled
          variant="primary"
          className="h-40 w-120 md:h-48 md:w-184"
        >
          {buttonLabel}
        </FloatButton>
      ) : (
        <Button
          disabled={!isValid}
          type="submit"
          variant="primary"
          className="h-40 w-120 md:h-48 md:w-184"
        >
          {type === "write" ? "작성" : "수정"}
        </Button>
      )}
    </div>
  );
};

export default BoardFormHeader;
