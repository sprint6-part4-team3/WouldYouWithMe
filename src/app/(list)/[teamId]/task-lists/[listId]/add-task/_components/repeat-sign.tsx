import { useSearchParams } from "next/navigation";
import React from "react";

import { RepeatType } from "@/types/task-list";

interface RepeatSignProp {
  selectedOption: Extract<RepeatType, "DAILY" | "ONCE" | "MONTHLY">;
}

const RepeatSign = ({ selectedOption }: RepeatSignProp) => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  let day;

  if (date) {
    const dateObj = new Date(date);
    day = dateObj.getDate();
  }
  if (selectedOption === "MONTHLY") {
    return (
      <div>
        <p>매월 {day}일 반복됩니다</p>
      </div>
    );
  }

  const message =
    selectedOption === "DAILY" ? "매일 반복됩니다." : "한 번만 수행합니다";

  return <div>{message}</div>;
};

export default RepeatSign;
