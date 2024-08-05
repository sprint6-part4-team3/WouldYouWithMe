import { forwardRef } from "react";

const REPEAT_OPTIONS = [
  { value: "ONCE", label: "한 번" },
  { value: "DAILY", label: "매일" },
  { value: "WEEKLY", label: "주 반복" },
  { value: "MONTHLY", label: "월 반복" },
];

const RepeatInput = forwardRef<HTMLInputElement>((props, ref) => {
  const a = 0;

  return (
    <fieldset className="grid grid-cols-2 grid-rows-2 gap-y-20 rounded-md border p-25 md:flex md:items-center md:justify-evenly md:space-y-2">
      <legend className="text-14-500">반복 주기 선택</legend>
      {REPEAT_OPTIONS.map(({ value, label }, index) => (
        <label
          key={value}
          className="mx-auto my-0 flex cursor-pointer items-center gap-2"
        >
          <input
            type="radio"
            value={value}
            ref={ref}
            className="size-15 cursor-pointer appearance-none rounded-full border-2 border-solid border-white checked:border-8 checked:border-brand-primary"
            defaultChecked={index === 0}
            {...props}
          />
          <span className="align-middle text-14-500 md:text-18-500">
            {label}
          </span>
        </label>
      ))}
    </fieldset>
  );
});
RepeatInput.displayName = "RepeatInput";

export default RepeatInput;
