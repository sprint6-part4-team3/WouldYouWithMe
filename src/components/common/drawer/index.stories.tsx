/* eslint-disable */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import Drawer from "./index";
import { DrawerProps } from "@/types/modal-drawer/index";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
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
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerWrapper: React.FC<DrawerProps> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded bg-brand-primary px-4 py-2 font-bold text-white hover:bg-interaction-hover"
      >
        Drawer 열기
      </button>
      <Drawer
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
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "기본 Drawer",
    description: "이것은 기본 Drawer입니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
  },
};

export const WithWarningIcon: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "경고 Drawer",
    description:
      "이것은 경고 아이콘이 있는 Drawer입니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
    showWarningIcon: true,
  },
};

export const CustomStyle: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "커스텀 스타일 Drawer",
    description:
      "클래스네임으로 디자인 수정 가능합니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
    className: "bg-brand-primary border-t-2 border-blue-500",
  },
};

export const TitleOnly: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "제목만 있는 Drawer",
    showCloseButton: true,
  },
};

export const DescriptionOnly: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    description: "설명만 있는 Drawer입니다. 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: true,
  },
};

export const NoCloseButton: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "닫기 버튼 없는 Drawer",
    description: "닫기 버튼이 없지만, 외부 클릭으로 닫을 수 있습니다.",
    showCloseButton: false,
  },
};

export const LongContent: Story = {
  render: (args) => <DrawerWrapper {...args} />,
  args: {
    title: "긴 내용 Drawer",
    description: "이 Drawer는 긴 내용을 포함하고 있어 스크롤이 가능합니다.",
    showCloseButton: true,
    children: (
      <div>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={`long-content-${i}`} className="mb-4">
            이것은 긴 내용의 문단 {i + 1}입니다. Drawer 내에서 스크롤이 가능한지
            확인하세요.
          </p>
        ))}
      </div>
    ),
  },
};
