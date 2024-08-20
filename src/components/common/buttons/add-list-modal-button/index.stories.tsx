import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AddListModalButton from ".";

const queryClient = new QueryClient();

const meta = {
  title: "Components/Button/새로운 목록 만들기 버튼",
  component: AddListModalButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
    ),
  ],
} as Meta<typeof AddListModalButton>;

export default meta;

type Story = StoryObj<typeof meta>;
export const addList: Story = {};
