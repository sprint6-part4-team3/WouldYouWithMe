"use client";

import { useSearchParams } from "next/navigation";

import { FrequencyType } from "@/types/task-list";

interface FrequencySignProp {
  frequencyOption: Extract<FrequencyType, "DAILY" | "ONCE" | "MONTHLY">;
}

const FrequencySign = ({ frequencyOption }: FrequencySignProp) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const dateObj = new Date(date!);
  const day = dateObj.getDate();

  if (frequencyOption === "MONTHLY") {
    return (
      <div className="flex justify-center text-18-500">
        <p>매월 {day}일 반복됩니다</p>
      </div>
    );
  }

  const message =
    frequencyOption === "DAILY" ? "매일 반복됩니다." : "한 번만 수행합니다";

  return <div className="flex justify-center text-18-500">{message}</div>;
};

export default FrequencySign;
