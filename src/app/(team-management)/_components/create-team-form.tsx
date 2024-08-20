"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { DUPLICATE_TEAM_NAME } from "@/constants/error-message";
import { useToast } from "@/hooks";
import createGroup from "@/lib/api/group/create-group";
import { teamAddEditSchema } from "@/lib/schemas/team-manage";
import recentTeamAtom from "@/stores/recent-team-atom";
import { TeamAddEditInput } from "@/types/team-management";

import ImageInput from "./image-input";
import NameInput from "./name-input";
import SubmitButton from "./submit-button";

const CreateTeamForm = () => {
  const queryClient = useQueryClient();

  const toast = useToast();
  const router = useRouter();

  const setRecentTeam = useSetAtom(recentTeamAtom);

  const [isImgLoading, setIsImgLoading] = useState(false);

  const methods = useForm<TeamAddEditInput>({
    resolver: zodResolver(teamAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: TeamAddEditInput) => createGroup(data),
  });

  const handleSubmitTeam: SubmitHandler<TeamAddEditInput> = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("그룹이 생성되었습니다.");
        setRecentTeam({
          teamName: res.name,
          groupId: res.id,
        });
        router.push(`/team/${res.id}`);
        queryClient.invalidateQueries({ queryKey: ["userData"] });
      },
      onError: (error) => {
        if (error.message === DUPLICATE_TEAM_NAME) {
          methods.setError("name", {
            message: error.message,
          });
        } else {
          toast.error(error.message);
        }
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="my-24 flex w-full flex-col gap-24"
        onSubmit={methods.handleSubmit(handleSubmitTeam)}
      >
        <ImageInput setIsImgLoading={setIsImgLoading} />
        <NameInput />
        <SubmitButton
          isImgLoading={isImgLoading}
          isPending={isPending || isSuccess}
        />
      </form>
    </FormProvider>
  );
};

export default CreateTeamForm;
