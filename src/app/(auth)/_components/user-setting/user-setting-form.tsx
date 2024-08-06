/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { userSettingSchema } from "@/lib/schemas/auth";
import { UserSettingInput } from "@/types/auth";

import EmailInput from "./email-input";
import ImageInput from "./image-input";
import NameInput from "./name-input";
import PasswordInput from "./password-input";

type TestUserData = {
  image?: string;
  name: string;
  email: string;
  password: string;
};

interface UserSettingFormProps {
  userData: TestUserData;
}

const UserSettingForm = ({ userData }: UserSettingFormProps) => {
  const methods = useForm<UserSettingInput>({
    resolver: zodResolver(userSettingSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      ...(userData.image && { image: userData.image }),
    },
  });

  const handleSubmitUser: SubmitHandler<UserSettingInput> = (data) => {
    // TODO: API 연동 - 계정 수정 patch 요청
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="mt-80 flex w-full max-w-800 flex-col gap-24"
        onSubmit={methods.handleSubmit(handleSubmitUser)}
      >
        <ImageInput />
        <NameInput />
        <EmailInput />
        <PasswordInput />
      </form>
    </FormProvider>
  );
};

export default UserSettingForm;
