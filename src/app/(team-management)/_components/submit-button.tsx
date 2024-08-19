"use client";

import { useFormContext } from "react-hook-form";

import { Button, FloatButton } from "@/components/common";
import { LoadingSpinner } from "@/public/assets/icons";
import { TeamAddEditInput } from "@/types/team-management";

interface SubmitButtonProps {
  type?: "add" | "edit";
  isPending?: boolean;
  isImgLoading?: boolean;
}

const SubmitButton = ({
  type = "add",
  isPending = false,
  isImgLoading = false,
}: SubmitButtonProps) => {
  const {
    formState: { isValid },
  } = useFormContext<TeamAddEditInput>();

  let buttonLabel;

  if (isImgLoading) {
    buttonLabel = "이미지 업로드 중";
  } else if (type === "add") {
    buttonLabel = "생성중";
  } else {
    buttonLabel = "수정중";
  }

  return (
    <div>
      {isPending || isImgLoading ? (
        <FloatButton
          Icon={<LoadingSpinner width={30} height={30} />}
          type="submit"
          disabled
          variant="primary"
          className="mt-16 h-47 w-full"
        >
          {buttonLabel}
        </FloatButton>
      ) : (
        <Button
          type="submit"
          disabled={!isValid}
          variant="primary"
          className="mt-16 h-47 w-full"
        >
          {type === "add" ? "생성하기" : "수정하기"}
        </Button>
      )}
    </div>
  );
};
export default SubmitButton;
