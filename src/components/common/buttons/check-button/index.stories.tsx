import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import CheckButton from ".";

const meta = {
  title: "Components/체크 버튼",
  component: CheckButton,
} as Meta<typeof CheckButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "완료하기",
  },
};

export const white: Story = {
  args: {
    variant: "white",
    children: "완료하기 취소하기",
  },
};

export const 버튼_활성화_여부: Story = {
  render: () => {
    const CheckButtonActive = () => {
      const [isDisabled, setIsDisabled] = useState(true);

      const handleActive = () => {
        setIsDisabled((prev) => !prev);
      };

      return (
        <div className="flex flex-col gap-16">
          <CheckButton variant="primary" disabled={isDisabled}>
            버튼
          </CheckButton>
          <CheckButton variant="white" disabled={isDisabled}>
            버튼
          </CheckButton>
          <CheckButton variant="primary" onClick={handleActive}>
            {isDisabled ? "활성화하기" : "비활성화하기"}
          </CheckButton>
        </div>
      );
    };
    return <CheckButtonActive />;
  },
};
