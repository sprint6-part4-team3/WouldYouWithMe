import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { UserSettingInput } from "@/types/auth";

const PasswordInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserSettingInput>();

  return (
    <FieldWrapper
      label="비밀번호"
      id="password"
      errorMessage={errors.password?.message || ""}
    >
      <Input
        {...register("password")}
        id="password"
        placeholder="비밀번호를 입력해주세요"
        isError={!!errors.password}
        value={watch("password")}
      />
    </FieldWrapper>
  );
};

export default PasswordInput;
