import type { Meta, StoryObj } from "@storybook/react";

import Input from ".";

const meta = {
  title: "Components/Form/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    isError: false,
    isDisabled: false,
    type: "text",
  },
  argTypes: {
    isError: {
      control: "boolean",
      description: "input의 error 여부입니다.",
    },
    isDisabled: {
      control: "boolean",
      description: "input의 disabled 여부입니다.",
    },
    type: {
      control: "radio",
      options: ["text", "email", "password"],
      description: "input 의 타입입니다.",
    },
    id: {
      description: "input의 id 속성입니다. name 속성도 동일하게 적용됩니다.",
    },
    placeholder: {
      description: "input의 placeholder 속성입니다.",
    },
  },
} as Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    id: "email",
    placeholder: "이메일을 입력하세요",
    type: "email",
  },
};

export const Password: Story = {
  args: {
    id: "password",
    placeholder: "비밀번호를 입력하세요",
    type: "password",
  },
};
