import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { UserSettingInput } from "@/types/auth";

const EmailInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserSettingInput>();

  return (
    <FieldWrapper
      label="이메일"
      id="email"
      errorMessage={errors.email?.message || ""}
    >
      <Input
        {...register("email")}
        id="email"
        placeholder="이메일을 입력해주세요"
        isError={!!errors.email}
        value={watch("email")}
      />
    </FieldWrapper>
  );
};

export default EmailInput;
