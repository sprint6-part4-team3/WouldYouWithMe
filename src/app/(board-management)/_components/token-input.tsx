"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input } from "@/components/common";
import { BoardAddEditInput } from "@/types/article/add-edit";

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
          <span className="text-brand-tertiary">* </span>
          참여 토큰 or 참여 링크 (둘 중 아무거나 기획에 맟게)
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
