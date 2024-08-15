"use client";

import { useFormContext } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
import { UserSettingInput } from "@/types/auth";

const NameInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<UserSettingInput>();

  return (
    <FieldWrapper
      label="이름"
      id="nickname"
      errorMessage={errors.nickname?.message || ""}
    >
      <div className="relative">
        <Input
          {...register("nickname")}
          id="nickname"
          placeholder="이름을 입력해주세요"
          isError={!!errors.nickname}
          value={watch("nickname")}
        />
        <Button
          type="submit"
          variant="primary"
          className="absolute right-16 top-9 z-[5] h-32 w-50"
        >
          변경
        </Button>
      </div>
    </FieldWrapper>
  );
};

export default NameInput;
