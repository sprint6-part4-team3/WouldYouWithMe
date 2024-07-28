import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import PlusButton from ".";

const meta = {
  title: "Components/플러스 버튼",
  component: PlusButton,
} as Meta<typeof PlusButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "할 일 추가",
  },
};

export const 버튼_활성화_여부: Story = {
  render: () => {
    const PlusButtonActive = () => {
      const [isDisabled, setIsDisabled] = useState(true);

      const handleActive = () => {
        setIsDisabled((prev) => !prev);
      };

      return (
        <div className="flex flex-col gap-16">
          <PlusButton disabled={isDisabled}>할 일 추가</PlusButton>
          <PlusButton onClick={handleActive}>
            {isDisabled ? "활성화하기" : "비활성화하기"}
          </PlusButton>
        </div>
      );
    };
    return <PlusButtonActive />;
  },
};
