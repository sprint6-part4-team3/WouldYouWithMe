"use client";

import { useAtomValue } from "jotai";

import { FieldWrapper, Input } from "@/components/common";
import userAtom from "@/stores/user-atom";

const EmailInput = () => {
  const user = useAtomValue(userAtom);

  return (
    <FieldWrapper label="이메일" id="email">
      <Input
        id="email"
        placeholder=""
        value={user.email}
        readOnly
        className="w-full rounded-xl bg-background-tertiary px-16 py-15 text-16-500 text-text-primary  outline-none ring-1 transition-all duration-300"
      />
    </FieldWrapper>
  );
};

export default EmailInput;
