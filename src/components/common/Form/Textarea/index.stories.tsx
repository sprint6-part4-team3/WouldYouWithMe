import type { Meta, StoryObj } from "@storybook/react";

import Textarea from ".";

const meta = {
  title: "Components/Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    isError: false,
    rows: 3,
  },
} as Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    id: "content",
    placeholder: "내용을 입력하세요",
  },
};
