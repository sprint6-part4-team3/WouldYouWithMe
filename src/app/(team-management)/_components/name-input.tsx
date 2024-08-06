"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { TeamAddEditInput } from "@/types/team-management";

const NameInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<TeamAddEditInput>();

  return (
    <FieldWrapper
      label="팀 이름"
      id="name"
      errorMessage={errors.name?.message || ""}
    >
      <Input
        {...register("name")}
        id="name"
        placeholder="팀 이름을 입력해주세요"
        isError={!!errors.name}
        value={watch("name")}
      />
    </FieldWrapper>
  );
};

export default NameInput;
