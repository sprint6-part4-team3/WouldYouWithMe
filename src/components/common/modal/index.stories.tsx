/* eslint-disable */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Modal from ".";
import { ModalProps } from "@/types/modal-drawer/index";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "닫힘" },
    title: { control: "text" },
    description: { control: "text" },
    showCloseButton: { control: "boolean" },
    showWarningIcon: { control: "boolean" },
    className: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWrapper: React.FC<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-brand-primary px-4 py-2 font-bold text-white hover:bg-interaction-hover"
      >
        모달 열기
      </button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose?.();
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "기본 모달",
    description: "이것은 기본 모달입니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
  },
};

export const WithWarningIcon: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "경고 모달",
    description:
      "이것은 경고 아이콘이 있는 모달입니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
    showWarningIcon: true,
  },
};

export const CustomStyle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "커스텀 스타일 모달",
    description:
      "클래스네임으로 디자인 수정 가능합니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
    className: "bg-brand-primary border-2 border-blue-500",
  },
};

export const TitleOnly: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "제목만 있는 모달",
    showCloseButton: true,
  },
};

export const DescriptionOnly: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    description: "설명만 있는 모달입니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
  },
};

export const NoCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "닫기 버튼 없는 모달",
    description: "닫기 버튼이 없지만, 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: false,
  },
};
