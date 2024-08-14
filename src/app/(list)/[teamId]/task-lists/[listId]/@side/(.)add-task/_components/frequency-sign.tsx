"use client";

import { useSearchParams } from "next/navigation";

import { FrequencyType } from "@/types/task-list";

interface FrequencySignProp {
  frequencyOption: Extract<FrequencyType, "DAILY" | "ONCE" | "MONTHLY">;
  monthDay: number;
}

const FrequencySign = ({ frequencyOption, monthDay }: FrequencySignProp) => {
  if (frequencyOption === "MONTHLY") {
    return (
      <div className="flex justify-center text-18-500">
        <p>매월 {monthDay}일 반복됩니다</p>
      </div>
    );
  }

  const message =
    frequencyOption === "DAILY" ? "매일 반복됩니다." : "한 번만 수행합니다";

  return <div className="flex justify-center text-18-500">{message}</div>;
};

export default FrequencySign;
