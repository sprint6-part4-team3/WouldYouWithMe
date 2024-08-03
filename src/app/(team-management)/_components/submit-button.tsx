import { useFormContext } from "react-hook-form";

import { Button } from "@/components/common";
import { TeamAddEditInput } from "@/types/team-management";

interface SubmitButtonProps {
  type?: "add" | "edit";
}

const SubmitButton = ({ type = "add" }: SubmitButtonProps) => {
  const {
    formState: { isValid },
  } = useFormContext<TeamAddEditInput>();

  return (
    <Button
      type="submit"
      disabled={!isValid}
      variant="primary"
      className="mt-16 h-47 w-full"
    >
      {type === "add" ? "생성하기" : "수정하기"}
    </Button>
  );
};
export default SubmitButton;
