"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { PlusButton } from "@/components/common";
import { useToast } from "@/hooks";
import newTaskSchema from "@/lib/schemas/task";
import { NewTask } from "@/types/task-list";
import convertStringArrayToNumberArray from "@/utils/convert-string-array-to-num";

import DateInput from "./date-input";
import DescriptionInput from "./description-input";
import RepeatInput from "./frequency-input";
import NameInput from "./name-input";

interface AddTaskFormProps {
  currentTeamId: number;
  initialDate: Date;
  currentListId: number;
}

type Tap = "memo" | "date" | "frequency";

const tapButtons: { value: Tap; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "memo", label: "Memo" },
  { value: "frequency", label: "Frequency" },
];

const AddTaskForm = () => {
  const toast = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDate = searchParams.get("date");
  const params = useParams<{ teamId: string; listId: string }>();
  const methods = useForm<NewTask>({
    resolver: zodResolver(newTaskSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      startDate: initialDate!,
      frequencyType: "ONCE",
    },
  });
  const { formState } = methods;
  const { isValid } = formState;

  const [tap, setTap] = useState<Tap>("date");
  const Inputs: Record<Tap, () => JSX.Element> = {
    date: DateInput,
    memo: DescriptionInput,
    frequency: RepeatInput,
  };

  const SelectedInput = Inputs[tap];

  const { mutate, isPending } = useMutation({
    // mutationFn: () => {},
  });

  const onSubmit: SubmitHandler<NewTask> = async (data) => {
    let submitData;

    // data.monthlyDay number type으로 바꿔서 쏴야함
    if (data.frequencyType === "WEEKLY" && Array.isArray(data.weekDays)) {
      const numTypeWeekDays = convertStringArrayToNumberArray(data.weekDays);
      submitData = {
        ...data,
        weekDays: numTypeWeekDays,
      };
    } else {
      submitData = data;
    }

    // eslint-disable-next-line no-console
    console.log(submitData);

    // mutate(submitData, {
    //   onSuccess: (res) => {
    //     router.push(`/${params.teamId}/task-lists/?date=${initialDate}`);
    //     toast.success("등록되었습니다");
    //   },
    //   onError: (error) => {
    //     toast.error("등록 오류");
    //   },
    // });
  };

  const handleTapChange = (e: MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value as Tap;
    setTap(value);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mt-30 flex flex-col justify-between pb-30"
      >
        <div className="flex flex-col gap-40">
          <NameInput />
          <nav className="flex h-25 gap-12">
            {tapButtons.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={handleTapChange}
                className={clsx(
                  "px-4 py-2 text-16-500 md:text-18-500",
                  tap === value
                    ? "border-b border-text-tertiary  text-text-tertiary"
                    : "text-text-default",
                )}
                value={value}
              >
                {label}
              </button>
            ))}
          </nav>

          <SelectedInput />
        </div>
        <div className="mt-130 flex justify-end pb-20">
          <PlusButton type="submit" onClick={() => {}} disabled={!isValid}>
            할 일 추가
          </PlusButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddTaskForm;
