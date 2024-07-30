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
  argTypes: {
    isError: {
      control: "boolean",
      description: "textarea 의 error 여부입니다.",
    },
    id: {
      description: "textarea id 속성입니다. name 속성도 동일하게 적용됩니다.",
    },
    placeholder: {
      description: "textarea placeholder 속성입니다.",
    },
    rows: {
      description: "textarea 의 줄 수입니다.",
    },
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
