/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import teamAddSchema from "@/lib/schemas/team-manage";
import { TeamAddInput } from "@/types/team-management";

import ImageInput from "./_components/image-input";
import NameInput from "./_components/name-input";
import SubmitButton from "./_components/submit-button";

const AddTeamPage = () => {
  const methods = useForm<TeamAddInput>({
    resolver: zodResolver(teamAddSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const handleSubmitTeam: SubmitHandler<TeamAddInput> = (data) => {
    // TODO: API 연동 - 이미지 URL 만들고, 바로 그룹 생성 POST 요청
    console.log(data);
  };

  return (
    <>
      <h1 className="text-24-500 md:text-32 lg:text-40">팀 생성하기</h1>
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
      <p>
        팀에 참여하고 싶으신가요?
        <Link className="ml-12 text-brand-primary underline" href="/jointeam">
          팀 참여하기
        </Link>
      </p>
    </>
  );
};

export default AddTeamPage;
