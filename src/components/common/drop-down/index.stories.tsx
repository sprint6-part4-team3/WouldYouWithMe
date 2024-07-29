/* eslint-disable no-console */
import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentType } from "react";

import useToggle from "@/hooks/use-toggle";

import DropDown from ".";

const meta = {
  title: "Components/DropDown",
  parameters: {
    componentSubtitle: "컴파운드 패턴으로 작성된 DropDown 컴포넌트",
  },
  component: DropDown,
  subcomponents: {
    Trigger: DropDown.Trigger as ComponentType,
    Menu: DropDown.Menu as ComponentType,
    Item: DropDown.Item as ComponentType,
  },
  tags: ["autodocs"],
} as Meta<typeof DropDown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
    const DropDownStoryBook = () => {
      const { value, handleOff, handleToggle } = useToggle();

      return (
        <div className="flex h-200 justify-center text-14-500">
          <DropDown handleClose={handleOff}>
            <DropDown.Trigger onClick={handleToggle}>
              <span className="cursor-pointer text-16-700 text-text-primary">
                ⋮
              </span>
            </DropDown.Trigger>
            <DropDown.Menu isOpen={value}>
              <DropDown.Item onClick={() => console.log("마이 히스토리 클릭")}>
                마이 히스토리
              </DropDown.Item>
              <DropDown.Item onClick={() => console.log("계정 설정 클릭")}>
                계정 설정
              </DropDown.Item>
              <DropDown.Item onClick={() => console.log("로그아웃 클릭")}>
                로그아웃
              </DropDown.Item>
            </DropDown.Menu>
          </DropDown>
        </div>
      );
    };
    return <DropDownStoryBook />;
  },
};
