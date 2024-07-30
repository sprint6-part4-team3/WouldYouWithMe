import type { Meta, StoryObj } from "@storybook/react";

import useToast from "@/hooks/use-toast";

import Toast from ".";
import ToastContainer from "./container";

const meta = {
  title: "Components/Toast",
  component: Toast,
  argTypes: {
    type: {
      control: "radio",
      options: ["success", "error"],
    },
  },
  tags: ["autodocs"],
} as Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const ToastStoryBook = () => {
      const toast = useToast();

      return (
        <>
          <ToastContainer />
          <div className="flex flex-col items-start gap-16">
            <button
              className="text-text-primary"
              type="button"
              onClick={() => toast.success("성공 토스트창입니다.")}
            >
              성공 토스트 버튼
            </button>
            <button
              className="text-text-primary"
              type="button"
              onClick={() =>
                toast.error("실제 page 만들어서 테스트 해봤는데 잘 됩니다.")
              }
            >
              실패 토스트 버튼
            </button>
          </div>
        </>
      );
    };
    return <ToastStoryBook />;
  },
};
