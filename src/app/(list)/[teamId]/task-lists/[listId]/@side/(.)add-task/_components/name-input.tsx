"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { NewTask } from "@/types/task-list";

const NameInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<NewTask>();
  return (
    <FieldWrapper id="name" label="제목" errorMessage={errors.name?.message}>
      <Input
        id="name"
        type="text"
        placeholder="할일 제목을 지어주세요"
        {...register("name")}
        isError={!!errors.name}
        value={watch("name")}
      />
    </FieldWrapper>
  );
};

export default NameInput;
