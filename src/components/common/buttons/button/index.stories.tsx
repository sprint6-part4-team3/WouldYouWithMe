import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import Button from ".";

const meta = {
  title: "Components/버튼",
  component: Button,
  args: {
    className: "h-48 w-332",
    children: "버튼",
  },
} as Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const white: Story = {
  args: {
    variant: "white",
  },
};
export const danger: Story = {
  args: {
    variant: "danger",
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};
export const noFill: Story = {
  args: {
    variant: "noFill",
  },
};

export const 버튼_활성화_여부: Story = {
  render: () => {
    const ButtonActive = () => {
      const [isDisabled, setIsDisabled] = useState(true);

      const handleActive = () => {
        setIsDisabled((prev) => !prev);
      };

      return (
        <div className="flex size-[300px] flex-col gap-16">
          <Button
            className="h-48 w-332"
            variant="primary"
            disabled={isDisabled}
          >
            버튼
          </Button>
          <Button className="h-48 w-332" variant="white" disabled={isDisabled}>
            버튼
          </Button>
          <Button
            className="h-48 w-332"
            variant="secondary"
            onClick={handleActive}
          >
            {isDisabled ? "활성화하기" : "비활성화하기"}
          </Button>
        </div>
      );
    };
    return <ButtonActive />;
  },
};
