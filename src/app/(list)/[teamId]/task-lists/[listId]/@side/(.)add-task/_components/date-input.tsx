"use client";

import { useFormContext } from "react-hook-form";

import { NewTask } from "@/types/task-list";

import Calendar from "./calendar";

const DateInput = () => {
  const { setValue } = useFormContext<NewTask>();

  return (
    <section>
      <div className="mb-35">
        <h2 className="text-16-500 text-text-primary md:text-18-500">
          시작 날짜
        </h2>
      </div>
      <div className="mx-auto my-0 w-full md:w-400">
        <Calendar
          setValue={(value: string): void => setValue("startDate", value)}
        />
      </div>
    </section>
  );
};

export default DateInput;
