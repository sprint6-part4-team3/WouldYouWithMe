/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef } from "react";

import Input from "../Input";
import Textarea from "../Textarea";
import FieldWrapper from ".";

const meta = {
  title: "Components/Form/FieldWrapper",
  component: FieldWrapper,
  tags: ["autodocs"],
} as Meta<typeof FieldWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "email",
    label: "이메일",
    errorMessage: "알맞은 형식을 입력하세요.",
  },
};

export const InputWrapper: Story = {
  render: () => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        console.log(inputRef.current);
      }
    }, []);

    return (
      <FieldWrapper
        id="password"
        label="비밀번호"
        errorMessage="비밀번호는 8자 이상입니다"
      >
        <Input
          ref={inputRef}
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          isError
        />
      </FieldWrapper>
    );
  },
};

export const TextareaWrapper: Story = {
  render: () => (
    <FieldWrapper
      id="content"
      label={
        <span>
          <span className="text-brand-primary">* </span>
          내용
        </span>
      }
    >
      <Textarea
        id="content"
        placeholder="내용을 입력해주세요"
        maxLength={20}
        rows={5}
        isError={false}
      />
    </FieldWrapper>
  ),
};
