import type { Meta, StoryObj } from "@storybook/react";

import IconButton from ".";

const meta = {
  title: "components/아이콘 버튼",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    border: false,
    icon: "IconUser",
    borderColorName: "#99a3ff",
  },
} as Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const gray: Story = {
  args: {
    variant: "gray",
  },
};

export const customBorder: Story = {
  args: {
    variant: "green",
    icon: "IconProfile",
    border: true,
  },
};
