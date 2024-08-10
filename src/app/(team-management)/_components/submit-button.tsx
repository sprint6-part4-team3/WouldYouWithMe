"use client";

import { useFormContext } from "react-hook-form";

import { Button, FloatButton } from "@/components/common";
import { LoadingSpinner } from "@/public/assets/icons";
import { TeamAddEditInput } from "@/types/team-management";

interface SubmitButtonProps {
  type?: "add" | "edit";
  isPending?: boolean;
}

const SubmitButton = ({
  type = "add",
  isPending = false,
}: SubmitButtonProps) => {
  const {
    formState: { isValid },
  } = useFormContext<TeamAddEditInput>();

  return (
    <div>
      {isPending ? (
        <FloatButton
          Icon={<LoadingSpinner width={30} height={30} />}
          type="submit"
          disabled
          variant="primary"
          className="mt-16 h-47 w-full"
        >
          {type === "add" ? "생성중" : "수정중"}
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
