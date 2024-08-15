"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks";
import EditUser from "@/lib/api/user-setting/edit-user";
import { userSettingSchema } from "@/lib/schemas/auth";
import { pwLengthAtom, userAtom } from "@/stores";
import { UserSettingInput } from "@/types/auth";

import CancelUserComponent from "./cancel-user-component";
import ChangePasswordComponent from "./change-password-component";
import EmailInput from "./email-input";
import ImageInput from "./image-input";
import NameInput from "./name-input";
import PasswordInput from "./password-input";

const UserSettingForm = () => {
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const router = useRouter();
  const setUser = useSetAtom(userAtom);
  const user = useAtomValue(userAtom);
  const pwLength = useAtomValue(pwLengthAtom);
  const { success, error } = useToast();

  const methods = useForm<UserSettingInput>({
    resolver: zodResolver(userSettingSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      image: user.image || "",
      nickname: user.nickname || "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: { nickname: string; image: string | null }) =>
      EditUser(data),
  });

  const handleSubmitUser: SubmitHandler<UserSettingInput> = (data) => {
    const { image, nickname } = data;

    mutate(
      { image, nickname },
      {
        onSuccess: () => {
          success("유저 정보가 수정되었습니다.");
          setUser((prevUser) => ({
            ...prevUser,
            nickname: data.nickname,
            image: data.image || prevUser.image,
          }));
          router.replace(`/user-setting`);
        },
        onError: () => {
          error("수정에 실패했습니다.");
        },
      },
    );
  };

  const handleChangePasswordClick = () => {
    setIsChangeOpen(true);
  };

  const handleCancelUserClick = () => {
    setIsCancelOpen(true);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="mt-80 flex w-full max-w-800 flex-col gap-24"
          onSubmit={methods.handleSubmit(handleSubmitUser)}
        >
          <ImageInput />
          <NameInput />
          <EmailInput />
          {pwLength > 0 && (
            <PasswordInput
              onChangePasswordClick={handleChangePasswordClick}
              onCancelUserClick={handleCancelUserClick}
            />
          )}
        </form>
      </FormProvider>
      <CancelUserComponent
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
      />
      <ChangePasswordComponent
        isOpen={isChangeOpen}
        onClose={() => setIsChangeOpen(false)}
      />
    </>
  );
};

export default UserSettingForm;
