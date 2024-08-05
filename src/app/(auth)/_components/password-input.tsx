import { useFormContext } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
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
      <div className="relative">
        <Input
          {...register("password")}
          id="password"
          placeholder="비밀번호를 입력해주세요"
          isError={!!errors.password}
          value={watch("password")}
        />
        <Button variant="primary" className="absolute right-16 top-9 h-32 w-74">
          변경하기
        </Button>
      </div>
    </FieldWrapper>
  );
};

export default PasswordInput;
