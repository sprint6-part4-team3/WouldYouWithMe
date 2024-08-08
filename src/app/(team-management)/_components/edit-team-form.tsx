"use client";

/* eslint-disable no-console */

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import editGroup from "@/lib/api/group/edit-group";
import { teamAddEditSchema } from "@/lib/schemas/team-manage";
import { TeamAddEditInput } from "@/types/team-management";

import ImageInput from "./image-input";
import NameInput from "./name-input";
import SubmitButton from "./submit-button";

interface EditTeamFormProps {
  name: string;
  image: string | null;
}

const EditTeamForm = ({ name, image }: EditTeamFormProps) => {
  const methods = useForm<TeamAddEditInput>({
    resolver: zodResolver(teamAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name,
      ...(image && { image }),
    },
  });

  const { mutate, isPending } = useMutation({
    // TODO: 팀 id 넣기
    mutationFn: (data: TeamAddEditInput) => editGroup(data, 1),
  });

  const handleSubmitTeam: SubmitHandler<TeamAddEditInput> = (data) => {
    // TODO: API 연동 - 그룹 수정 POST 요청
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        // TODO: 성공 토스트
        // TODO: 생성된 팀 페이지로 이동
      },
      onError(error) {
        // TODO: 실패 토스트
        console.log(error);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="my-24 flex w-full flex-col gap-24"
        onSubmit={methods.handleSubmit(handleSubmitTeam)}
      >
        <ImageInput />
        <NameInput />
        <SubmitButton type="edit" isPending={isPending} />
      </form>
    </FormProvider>
  );
};

export default EditTeamForm;
