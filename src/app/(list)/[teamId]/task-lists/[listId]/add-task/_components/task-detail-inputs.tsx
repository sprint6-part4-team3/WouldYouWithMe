"use client";

import clsx from "clsx";
import React, { MouseEvent, ReactNode, useState } from "react";

import MemoInput from "./memo-input";
import RepeatInput from "./repeat-input";
import TimeInput from "./time-input";

type MenuType = "memo" | "startTime" | "endTime" | "repeat";

// 메뉴 아이템 인터페이스 정의
interface MenuItem {
  key: MenuType;
  label: string;
}

// 메뉴 아이템 배열
const MENU_ITEMS: MenuItem[] = [
  { key: "memo", label: "메모" },
  { key: "startTime", label: "시작 시각" },
  { key: "endTime", label: "마감 시각" },
  { key: "repeat", label: "반복" },
];

const MENU_COMPONENTS: Record<MenuType, ReactNode> = {
  memo: <MemoInput />,
  startTime: <TimeInput title="시작 시간" />,
  endTime: <TimeInput title="마감 시간" />,
  repeat: <RepeatInput />,
};

const TaskDetailInputs = () => {
  const [menu, setMenu] = useState<MenuType>("memo");

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenu(event.currentTarget.value as MenuType);
  };

  return (
    <div>
      <menu className=" flex h-45 w-full list-none border-b border-text-default">
        {MENU_ITEMS.map(({ key, label }) => (
          <li key={key} className="grow text-center">
            <button
              type="button"
              value={key}
              onClick={handleMenuClick}
              className={clsx(
                " size-full text-16-500 hover:text-text-tertiary md:text-18-500",
                {
                  "text-text-tertiary pb-3": menu === key,
                  "text-text-default": menu !== key,
                },
              )}
            >
              {label}
            </button>
          </li>
        ))}
      </menu>
      <div className="mt-40">{MENU_COMPONENTS[menu]}</div>
    </div>
  );
};

export default TaskDetailInputs;
