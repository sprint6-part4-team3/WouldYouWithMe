import type { Meta, StoryObj } from "@storybook/react";

import IconButton from ".";

const meta = {
  title: "components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    isBorder: false,
    icon: "IconUser",
  },
} as Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Gray: Story = {
  args: {
    variant: "gray",
  },
};

export const CustomBorder: Story = {
  args: {
    variant: "green",
    icon: "IconProfile",
    isBorder: true,
  },
};
