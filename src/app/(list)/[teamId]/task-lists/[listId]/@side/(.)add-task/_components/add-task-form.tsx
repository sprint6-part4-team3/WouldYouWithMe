"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { PlusButton } from "@/components/common";
import newTaskSchema from "@/lib/schemas/task";
import { NewTask } from "@/types/task-list";
import convertStringArrayToNumberArray from "@/utils/convert-string-array-to-num";

import DescriptionInput from "./description-input";
import NameInput from "./name-input";
import RepeatInput from "./repeat-input";

interface AddTaskFormProps {
  currentTeamId: number;
  initialDate: number;
  initialDay: number;
  currentListId: number;
}

const AddTaskForm = ({
  currentTeamId,
  initialDate,
  initialDay,
  currentListId,
}: AddTaskFormProps) => {
  const methods = useForm<NewTask>({
    resolver: zodResolver(newTaskSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      monthDay: initialDate,
    },
  });
  const { formState } = methods;
  const { isValid } = formState;

  const onSubmit: SubmitHandler<NewTask> = async (data) => {
    let numTypeWeekDays: number[];
    // data.monthlyDay number type으로 바꿔서 쏴야함
    if (data.frequencyType === "WEEKLY" && Array.isArray(data.weekDays)) {
      numTypeWeekDays = convertStringArrayToNumberArray(data.weekDays);
    }
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mt-30 flex flex-col justify-between pb-30"
      >
        <div className="flex flex-col gap-40">
          <NameInput />
          <DescriptionInput />
          <RepeatInput initialDate={initialDate} initialDay={initialDay} />
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
