"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input, TextArea } from "@/components/common";
import { BoardAddEditInput } from "@/types/article/add-edit";

const ContentInput = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<BoardAddEditInput>();

  return (
    <FieldWrapper
      label={
        <span>
          <span className="text-brand-tertiary">* </span>
          내용
        </span>
      }
      id="content"
      errorMessage={errors.content?.content?.message || ""}
    >
      <TextArea
        {...register("content.content")}
        id="content"
        placeholder="내용을 입력해주세요"
        rows={6}
        isError={!!errors.content?.content}
        value={watch("content.content")}
      />
    </FieldWrapper>
  );
};

export default ContentInput;
