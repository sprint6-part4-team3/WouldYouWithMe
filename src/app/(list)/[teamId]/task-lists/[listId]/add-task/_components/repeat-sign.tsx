import { useSearchParams } from "next/navigation";
import React from "react";

import { RepeatType } from "@/types/task-list";

interface RepeatSignProp {
  repeatOption: Extract<RepeatType, "DAILY" | "ONCE" | "MONTHLY">;
  MonthlyDate: number;
}

const RepeatSign = ({ repeatOption, MonthlyDate }: RepeatSignProp) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  let day;

  if (date) {
    const dateObj = new Date(date);
    day = dateObj.getDate();
  }
  if (repeatOption === "MONTHLY") {
    return (
      <div className="flex justify-center text-18-500">
        <p>매월 {MonthlyDate}일 반복됩니다</p>
      </div>
    );
  }

  const message =
    repeatOption === "DAILY" ? "매일 반복됩니다." : "한 번만 수행합니다";

  return <div className="flex justify-center text-18-500">{message}</div>;
};

export default RepeatSign;
