"use client";

import { useAtomValue } from "jotai";

import { Button, FieldWrapper, FloatButton, Input } from "@/components/common";
import { IconSecession } from "@/public/assets/icons";
import { pwLengthAtom } from "@/stores";

interface PasswordInputProps {
  onChangePasswordClick: () => void;
  onCancelUserClick: () => void;
}

const PasswordInput = ({
  onChangePasswordClick,
  onCancelUserClick,
}: PasswordInputProps) => {
  const passwordLength = useAtomValue(pwLengthAtom) || 0;
  const defaultPassword = "•".repeat(passwordLength);

  return (
    <FieldWrapper label="비밀번호" id="password">
      <div className="relative">
        <Input
          id="password"
          placeholder=""
          value={defaultPassword}
          readOnly
          className="w-full rounded-xl bg-background-tertiary px-16 py-15 text-16-500 text-text-primary  outline-none ring-1 transition-all duration-300"
        />
        <Button
          variant="primary"
          className="absolute right-16 top-9 z-[5] h-32 w-100"
          onClick={onChangePasswordClick}
        >
          비밀번호 변경
        </Button>
        <FloatButton
          variant="cancel"
          Icon={<IconSecession />}
          className="absolute top-80"
          onClick={onCancelUserClick}
        >
          회원 탈퇴하기
        </FloatButton>
      </div>
    </FieldWrapper>
  );
};

export default PasswordInput;
