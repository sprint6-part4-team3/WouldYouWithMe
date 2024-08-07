"use client";

import { UseFormRegisterReturn } from "react-hook-form";

import SelectButton from "./select-button";

interface WeeklyOptionProp {
  register: UseFormRegisterReturn;
  defaultCheckDay: number;
}

const REPEAT_DAYS = [
  { value: 0, label: "일" },
  { value: 1, label: "월" },
  { value: 2, label: "화" },
  { value: 3, label: "수" },
  { value: 4, label: "목" },
  { value: 5, label: "금" },
  { value: 6, label: "토" },
];

const WeeklyOption = ({ register, defaultCheckDay }: WeeklyOptionProp) => (
  <fieldset className="grid grid-cols-3 grid-rows-3 gap-y-6 md:flex md:items-center md:justify-evenly ">
    {REPEAT_DAYS.map(({ value, label }) => (
      <SelectButton
        key={value}
        id={label}
        value={value}
        type="checkbox"
        defaultChecked={value === defaultCheckDay}
        {...register}
      >
        {label}
      </SelectButton>
    ))}
  </fieldset>
);

export default WeeklyOption;
