import type { Meta, StoryObj } from "@storybook/react";

import AddListModalButton from ".";

const meta = {
  title: "Components/Button/새로운 목록 만들기 버튼",
  component: AddListModalButton,
  tags: ["autodocs"],
} as Meta<typeof AddListModalButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const addList: Story = {};
