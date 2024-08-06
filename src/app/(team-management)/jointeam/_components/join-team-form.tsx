/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button, FieldWrapper, Input } from "@/components/common";
import { teamJoinSchema } from "@/lib/schemas/team-manage";
import { TeamJoinInput } from "@/types/team-management";

const JoinTeamForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TeamJoinInput>({
    resolver: zodResolver(teamJoinSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const handleSubmitJoinForm: SubmitHandler<TeamJoinInput> = (data) => {
    // TODO: API 연동 - 현재 사용자 email 담아서 초대수락 post 요청
    console.log(data);
  };

  return (
    <form
      className="my-24 flex w-full flex-col gap-24"
      onSubmit={handleSubmit(handleSubmitJoinForm)}
    >
      <FieldWrapper
        label="팀 링크"
        id="token"
        errorMessage={errors.token?.message || ""}
      >
        <Input
          {...register("token")}
          id="token"
          placeholder="팀 링크를 입력해주세요."
          isError={!!errors.token}
        />
      </FieldWrapper>
      <Button
        disabled={!isValid}
        type="submit"
        variant="primary"
        className="mt-16 h-47 w-full"
      >
        참여하기
      </Button>
    </form>
  );
};

export default JoinTeamForm;
