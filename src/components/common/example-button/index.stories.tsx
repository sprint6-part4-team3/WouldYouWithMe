import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import ExampleButton from ".";

const meta = {
  title: "Components/ExampleButton",
  component: ExampleButton,
  tags: ["autodocs"],
  args: {
    isDisabled: false,
  },
} as Meta<typeof ExampleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// 기본적으로 이런식으로만 적어도 될 듯
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "버튼",
  },
};

// 여기까진 안 적어도 되는데 그냥 이런식으로 render 하는 게 있다~ 정도만
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
  render: (args) => (
    <div className="flex size-200 items-center justify-center bg-background-tertiary">
      <ExampleButton {...args}>안녕</ExampleButton>
    </div>
  ),
};

// 이것도 그냥 이런식으로 할 수 있다~ 근데 모달 같은 거는 이렇게 만들면 될 듯?!?
// 참고로 한글 이름도 작성가능
export const 버튼_활성화_여부: Story = {
  render: () => {
    const ButtonActive = () => {
      const [isActive, setIsActive] = useState(true);

      const handleActive = () => {
        setIsActive(!isActive);
      };

      return (
        <div className="flex size-300 flex-col gap-16">
          <ExampleButton variant="primary" isDisabled={isActive}>
            {isActive ? "비활성화" : "활성화"}
          </ExampleButton>
          <ExampleButton variant="secondary" onClick={handleActive}>
            버튼 상태 변경하기
          </ExampleButton>
        </div>
      );
    };
    return <ButtonActive />;
  },
};
