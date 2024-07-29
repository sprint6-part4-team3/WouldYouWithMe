import type { Meta, StoryObj } from "@storybook/react";

import Input from "../Input";
import ErrorMessage from ".";

const meta = {
  title: "Components/Form/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
} as Meta<typeof ErrorMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    message: "알맞은 형식을 입력하세요.",
  },
};

export const TextareaWrapper: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Input
        id="email"
        isError
        type="email"
        placeholder="내용을 입력해주세요"
      />
      <ErrorMessage message="모달창에 있는 인풋은 label이 없는 것도 있음" />
    </div>
  ),
};
