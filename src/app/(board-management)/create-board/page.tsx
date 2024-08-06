/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import boardAddEditSchema from "@/lib/schemas/article";
import { BoardAddEditInput } from "@/types/article/add-edit";

import ContentInput from "../_components/content-input";
import BoardFormHeader from "../_components/form-header";
import ImageInput from "../_components/image-input";
import TitleInput from "../_components/title-input";
import TokenInput from "../_components/token-input";

const CreateBoardPage = () => {
  const methods = useForm<BoardAddEditInput>({
    resolver: zodResolver(boardAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      content: {
        content: "",
        // link: "",
        token: "",
      },
    },
  });

  const handleSubmitBoard: SubmitHandler<BoardAddEditInput> = (data) => {
    // TODO: API 연동 - 게시물 작성 post 요청
    const contentString = JSON.stringify(data.content);

    const submitData = {
      ...data,
      content: contentString,
    };

    console.log(submitData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitBoard)}
        className="my-40"
      >
        <BoardFormHeader type="write" />
        <div className="flex flex-col gap-40">
          <TitleInput />
          <TokenInput />
          <ContentInput />
          <ImageInput />
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateBoardPage;
