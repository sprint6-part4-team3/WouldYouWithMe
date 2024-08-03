import React from "react";

import { Input } from "@/components/common";

import SelectButton from "./select-button";

interface TimeInputProp {
  title: "마감 시간" | "시작 시간";
}

const TimeInput = ({ title }: TimeInputProp) => {
  const id = title === "마감 시간" ? "end-time-input" : "start-time-input";
  return (
    <section className="flex items-center justify-center gap-10">
      <fieldset>
        <div className="flex h-55 items-center gap-10">
          <SelectButton
            id="am"
            value="오전"
            type="radio"
            name="time"
            defaultChecked
          >
            오전
          </SelectButton>
          <SelectButton id="pm" value="오후" name="time" type="radio">
            오후
          </SelectButton>
        </div>
      </fieldset>
      <Input id={id} placeholder="3:30" />
    </section>
  );
};

export default TimeInput;
