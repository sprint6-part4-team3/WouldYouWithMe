import type { Meta, StoryObj } from "@storybook/react";

import Input from ".";

const meta = {
  title: "Components/Form/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    isError: false,
    isDisabled: false,
  },
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "name",
    placeholder: "이름을 입력하세요",
  },
};
