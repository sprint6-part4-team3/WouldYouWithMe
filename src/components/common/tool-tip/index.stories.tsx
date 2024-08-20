import type { Meta, StoryObj } from "@storybook/react";

import Button from "../buttons/button";
import ToolTip from ".";

const meta = {
  title: "Components/ToolTip",
  component: ToolTip,
  tags: ["autodocs"],
  args: {
    message: "툴팁 메시지",
    position: "top",
  },
} as Meta<typeof ToolTip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Email: Story = {
  args: {
    children: (
      <Button variant="primary" className="h-40 w-100">
        안뇽하세요
      </Button>
    ),
    position: "right",
    message: "툴팁",
  },
};

export const ToolTipStory: Story = {
  render: () => (
    <div className="mt-100 size-500">
      <ToolTip message="툴팁입니다!" position="top">
        <Button variant="primary" className="h-40 w-100">
          안뇽하세요
        </Button>
      </ToolTip>
    </div>
  ),
};
