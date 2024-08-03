import { useFormContext } from "react-hook-form";

import { Button } from "@/components/common";
import { TeamAddInput } from "@/types/team-management";

const SubmitButton = () => {
  const {
    formState: { isValid },
  } = useFormContext<TeamAddInput>();

  return (
    <Button
      type="submit"
      disabled={!isValid}
      variant="primary"
      className="h-47 w-full"
    >
      생성하기
    </Button>
  );
};
export default SubmitButton;
