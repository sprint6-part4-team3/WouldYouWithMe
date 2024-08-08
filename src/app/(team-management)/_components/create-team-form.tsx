"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks";
import createGroup from "@/lib/api/group/create-group";
import { teamAddEditSchema } from "@/lib/schemas/team-manage";
import { TeamAddEditInput } from "@/types/team-management";

import ImageInput from "./image-input";
import NameInput from "./name-input";
import SubmitButton from "./submit-button";

const CreateTeamForm = () => {
  const toast = useToast();
  const router = useRouter();

  const methods = useForm<TeamAddEditInput>({
    resolver: zodResolver(teamAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TeamAddEditInput) => createGroup(data),
  });

  const handleSubmitTeam: SubmitHandler<TeamAddEditInput> = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("그룹이 생성되었습니다");
        router.push(`/${res.id}`);
      },
      onError: (error) => {
        if (error.message === "이미 존재하는 그룹 이름입니다.") {
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
        <ImageInput />
        <NameInput />
        <SubmitButton isPending={isPending} />
      </form>
    </FormProvider>
  );
};

export default CreateTeamForm;
