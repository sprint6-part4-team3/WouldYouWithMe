import type { Meta, StoryObj } from "@storybook/react";

import Motion from ".";

const meta = {
  title: "Components/framer-motion",
  component: Motion,
} as Meta<typeof Motion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const fadeIn: Story = {
  args: {
    animation: "fade-in",
    children: (
      <h1 className="text-14-700 text-brand-primary">Hello, Framer Motion!</h1>
    ),
  },
};
export const exampleButton: Story = {
  args: {
    initial: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    children: (
      <button type="button" className="size-100 bg-brand-primary text-14-700">
        애니메이션 버튼
      </button>
    ),
  },
};
