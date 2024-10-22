"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, TextArea } from "@/components/common";
import { BoardAddEditInput } from "@/types/board/add-edit";

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
          <abbr
            className="text-brand-tertiary no-underline"
            title="필수입력"
            aria-label="required"
          >
            *
          </abbr>
          &nbsp;내용
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
