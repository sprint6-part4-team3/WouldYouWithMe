import { useFormContext } from "react-hook-form";

import { Button } from "@/components/common";
import { TeamAddEditInput } from "@/types/team-management";

const SubmitButton = () => {
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
      수정하기
    </Button>
  );
};
export default SubmitButton;
