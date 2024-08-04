"use client";

import { ReactNode, useState } from "react";

import { RepeatType } from "@/types/task-list";

import RepeatSign from "./repeat-sign";

const REPEAT_OPTIONS = [
  { value: "ONCE", label: "한 번" },
  { value: "DAILY", label: "매일" },
  { value: "WEEKLY", label: "주 반복" },
  { value: "MONTHLY", label: "월 반복" },
];

const REPEAT_COMPONENTS: Record<RepeatType, ReactNode> = {
  ONCE: <RepeatSign selectedOption="ONCE" />,
  DAILY: <RepeatSign selectedOption="DAILY" />,
  WEEKLY: <div>잠시만</div>,
  MONTHLY: <RepeatSign selectedOption="MONTHLY" />,
};
const RepeatInput = () => {
  // 화면에 선택된 값을 표시하기 위한 상태
  const [selectedOption, setSelectedOption] = useState<RepeatType>("ONCE");

  // 라디오 버튼의 값이 변경되면 호출되는 핸들러
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as RepeatType);
  };

  return (
    <section>
      <fieldset className="rounded-md border p-20">
        <legend className="text-14-500">반복 주기 선택</legend>
        <div className="flex justify-evenly space-y-2">
          {REPEAT_OPTIONS.map(({ value, label }, index) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-7"
            >
              <input
                type="radio"
                name="repeatOption"
                value={value}
                onChange={handleOptionChange}
                className="size-10 cursor-pointer appearance-none rounded-full border-2 border-white checked:border-8 checked:border-solid checked:border-brand-primary"
                defaultChecked={index === 0}
              />
              <span className="text-14-500 md:text-18-500">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-40">{REPEAT_COMPONENTS[selectedOption]}</div>
    </section>
  );
};

export default RepeatInput;
