/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import teamAddEditSchema from "@/lib/schemas/team-manage";
import { TeamAddEditInput } from "@/types/team-management";

import ImageInput from "./_components/image-input";
import NameInput from "./_components/name-input";
import SubmitButton from "./_components/submit-button";

interface TestTeamData {
  name: string;
  image?: string;
}

const testTeamData: TestTeamData = {
  name: "코드잇 스프린트",
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/585960601535448881.jpeg",
};

const EditTeamPage = () => {
  const methods = useForm<TeamAddEditInput>({
    resolver: zodResolver(teamAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: testTeamData.name,
      ...(testTeamData.image && { image: testTeamData.image }),
    },
  });

  const handleSubmitTeam: SubmitHandler<TeamAddEditInput> = (data) => {
    // TODO: API 연동 - 그룹 수정 patch 요청
    console.log(data);
  };

  return (
    <>
      <h1 className="text-24-500 md:text-32 lg:text-40">팀 수정하기</h1>
      <p className="mb-24 mt-12 text-14-400 text-text-disabled md:my-36 md:mt-24 md:text-16-400 lg:mb-48">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
      <FormProvider {...methods}>
        <form
          className="my-24 flex w-full flex-col gap-24"
          onSubmit={methods.handleSubmit(handleSubmitTeam)}
        >
          <ImageInput />
          <NameInput />
          <SubmitButton />
        </form>
      </FormProvider>
    </>
  );
};

export default EditTeamPage;
