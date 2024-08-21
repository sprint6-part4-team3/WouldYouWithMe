"use client";

import { useFormContext } from "react-hook-form";

import { FieldWrapper, Input, ToolTip } from "@/components/common";
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
        <div className="flex items-center">
          <abbr
            className="text-brand-tertiary no-underline"
            title="필수입력"
            aria-label="required"
          >
            *
          </abbr>
          &nbsp;팀 참여 토큰&nbsp;&nbsp;
          <ToolTip
            message="팀페이지 멤버 추가하기 버튼을 눌러보세요!"
            position="top"
          >
            <span className="cursor-pointer text-13-500 text-brand-primary/70">
              토큰은 어디서 발급받나요?
            </span>
          </ToolTip>
        </div>
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
