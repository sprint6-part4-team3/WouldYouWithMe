/* eslint-disable */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Modal, { ModalProps } from "./common-modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    /**
     * isOpen: 모달의 열림/닫힘 상태를 제어합니다.
     * true면 모달이 열리고, false면 닫힙니다.
     */
    isOpen: { control: "boolean" },

    /**
     * onClose: 모달이 닫힐 때 호출되는 함수입니다.
     * 모달 닫기 버튼 클릭이나 외부 클릭 시 실행됩니다.
     */
    onClose: { action: "닫힘" },

    /**
     * title: 모달의 제목을 설정합니다.
     * 모달 상단에 표시됩니다.
     */
    title: { control: "text" },

    /**
     * description: 모달의 본문 내용을 설정합니다.
     * 제목 아래에 표시됩니다.
     */
    description: { control: "text" },

    /**
     * showCloseButton: 모달 닫기 버튼의 표시 여부를 설정합니다.
     * true면 닫기 버튼이 표시되고, false면 숨겨집니다.
     */
    showCloseButton: { control: "boolean" },

    /**
     * showWarningIcon: 경고 아이콘의 표시 여부를 설정합니다.
     * true면 경고 아이콘이 표시되고, false면 표시되지 않습니다.
     */
    showWarningIcon: { control: "boolean" },

    /**
     * className: 모달에 추가적인 CSS 클래스를 적용합니다.
     * 커스텀 스타일링을 위해 사용됩니다.
     */
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

export const CloseOnlyByExternalClick: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: "외부 클릭으로만 닫기",
    description:
      "이 모달은 외부 클릭으로만 닫을 수 있습니다. 닫기 버튼이 없습니다.",
    showCloseButton: false,
  },
};
