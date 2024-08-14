"use client";

import { useSearchParams } from "next/navigation";
import { useFormContext } from "react-hook-form";

import { NewTask } from "@/types/task-list";

import FrequencySign from "./frequency-sign";
import WeeklyOption from "./weekly-option";

const REPEAT_OPTIONS = [
  { value: "ONCE", label: "한 번" },
  { value: "DAILY", label: "매일" },
  { value: "WEEKLY", label: "주 반복" },
  { value: "MONTHLY", label: "월 반복" },
];

const FrequencyInput = () => {
  const { register, watch, setValue } = useFormContext<NewTask>();
  const selectedFrequency = watch("frequencyType");
  const startDate = watch("startDate");
  const monthDay = new Date(startDate).getDate();
  const initialDay = new Date(startDate).getDay();

  if (selectedFrequency === "MONTHLY") {
    setValue("monthDay", monthDay);
  }

  return (
    <>
      <fieldset className="grid grid-cols-2 grid-rows-2 gap-y-20 rounded-md border p-25 md:flex md:items-center md:justify-evenly md:space-y-2">
        <legend className="text-16-500 md:text-18-500">반복 주기 선택</legend>
        {REPEAT_OPTIONS.map(({ value, label }, index) => (
          <label
            key={value}
            className="mx-auto my-0 flex cursor-pointer items-center gap-2"
          >
            <input
              type="radio"
              value={value}
              {...register("frequencyType")}
              className="size-15 cursor-pointer  accent-brand-primary"
              defaultChecked={value === selectedFrequency}
            />
            <span className="align-middle text-14-500 md:text-18-500">
              {label}
            </span>
          </label>
        ))}
      </fieldset>
      {selectedFrequency === "WEEKLY" ? (
        <WeeklyOption register={register("weekDays")} initialDay={initialDay} />
      ) : (
        <FrequencySign
          frequencyOption={selectedFrequency}
          monthDay={monthDay}
        />
      )}
    </>
  );
};

export default FrequencyInput;
