"use client";

/* eslint-disable no-console */

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import teamAddEditSchema from "@/lib/schemas/team-manage";
import { TeamAddEditInput } from "@/types/team-management";

import ImageInput from "./image-input";
import NameInput from "./name-input";
import SubmitButton from "./submit-button";

type TestTeamData = {
  name: string;
  image?: string;
};

interface EditTeamFormProps {
  teamData: TestTeamData;
}

const EditTeamForm = ({ teamData }: EditTeamFormProps) => {
  const methods = useForm<TeamAddEditInput>({
    resolver: zodResolver(teamAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: teamData.name,
      ...(teamData.image && { image: teamData.image }),
    },
  });

  const handleSubmitTeam: SubmitHandler<TeamAddEditInput> = (data) => {
    // TODO: API 연동 - 그룹 수정 patch 요청
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="my-24 flex w-full flex-col gap-24"
        onSubmit={methods.handleSubmit(handleSubmitTeam)}
      >
        <ImageInput />
        <NameInput />
        <SubmitButton type="edit" />
      </form>
    </FormProvider>
  );
};

export default EditTeamForm;
