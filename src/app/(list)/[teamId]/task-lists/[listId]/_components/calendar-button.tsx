"use client";

import React, { ReactNode } from "react";

import { IconButton } from "@/components/common";
import { useClickOutside, useToggle } from "@/hooks";

interface CalendarButtonProps {
  children: ReactNode;
}

const CalendarButton = ({ children }: CalendarButtonProps) => {
  const { value, handleOff, handleOn, handleToggle } = useToggle();
  const ref = useClickOutside(handleOff);

  return (
    <div className="relative" ref={ref}>
      <IconButton
        variant="gray"
        icon="IconCalendar"
        className="p-6"
        onClick={handleToggle}
      />
      {value && (
        <div className="absolute left-[-105px] w-282 md:left-5">{children}</div>
      )}
    </div>
  );
};

export default CalendarButton;
