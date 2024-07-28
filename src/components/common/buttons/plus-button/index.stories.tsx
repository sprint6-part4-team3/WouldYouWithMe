import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import PlusButton from ".";

const meta = {
  title: "Components/플러스 버튼",
  component: PlusButton,
  args: {
    children: "완료하기",
  },
} as Meta<typeof PlusButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 버튼_활성화_여부: Story = {
  render: () => {
    const PlusButtonActive = () => {
      const [isDisabled, setIsDisabled] = useState(true);

      const handleActive = () => {
        setIsDisabled((prev) => !prev);
      };

      return (
        <div className="flex flex-col gap-16">
          <PlusButton disabled={isDisabled}>버튼</PlusButton>
          <PlusButton onClick={handleActive}>
            {isDisabled ? "활성화하기" : "비활성화하기"}
          </PlusButton>
        </div>
      );
    };
    return <PlusButtonActive />;
  },
};
