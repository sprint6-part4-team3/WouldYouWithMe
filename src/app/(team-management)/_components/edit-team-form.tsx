"use client";

/* eslint-disable no-console */

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks";
import editGroup from "@/lib/api/group/edit-group";
import { teamAddEditSchema } from "@/lib/schemas/team-manage";
import { TeamAddEditInput } from "@/types/team-management";

import ImageInput from "./image-input";
import NameInput from "./name-input";
import SubmitButton from "./submit-button";

interface EditTeamFormProps {
  id: number;
  name: string;
  image: string | null;
}

const EditTeamForm = ({ id, name, image }: EditTeamFormProps) => {
  const toast = useToast();
  const router = useRouter();

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
    mutationFn: (data: TeamAddEditInput) => editGroup(data, id),
  });

  const handleSubmitTeam: SubmitHandler<TeamAddEditInput> = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        toast.success("그룹 정보가 수정되었습니다.");
        router.replace(`/${res.id}`);
      },
      onError: (error) => {
        // FIXME: 얘는 존재하는 이름 에러 메시지 없음, 매니저님께 여쭤봐야지
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
        <SubmitButton type="edit" isPending={isPending} />
      </form>
    </FormProvider>
  );
};

export default EditTeamForm;
