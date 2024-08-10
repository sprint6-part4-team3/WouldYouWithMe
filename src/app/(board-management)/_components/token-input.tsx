"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { BoardAddEditInput } from "@/types/board/add-edit";

const TokenInput = () => {
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
          &nbsp;팀 참여 토큰
        </span>
      }
      id="token"
      errorMessage={errors.content?.token?.message || ""}
    >
      <Input
        {...register("content.token")}
        id="token"
        placeholder="팀에 참여하기 위한 토큰을 입력해주세요"
        isError={!!errors.content?.token}
        value={watch("content.token")}
      />
    </FieldWrapper>
  );
};

export default TokenInput;
