"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { BoardAddEditInput } from "@/types/board/add-edit";

const TitleInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BoardAddEditInput>();

  return (
    <FieldWrapper
      label={
        <span>
          <abbr
            className="text-brand-tertiary no-underline"
            title="필수입력"
            aria-label="required"
          >
            *
          </abbr>
          &nbsp;제목
        </span>
      }
      id="title"
      errorMessage={errors.title?.message || ""}
    >
      <Input
        {...register("title")}
        id="title"
        placeholder="제목을 입력해주세요"
        isError={!!errors.title}
        value={watch("title")}
      />
    </FieldWrapper>
  );
};

export default TitleInput;
