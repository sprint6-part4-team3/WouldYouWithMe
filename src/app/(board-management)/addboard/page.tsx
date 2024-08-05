/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/common";
import boardAddEditSchema from "@/lib/schemas/article";
import { BoardAddEditInput } from "@/types/article/add-edit";

import ContentInput from "../_components/content-input";
import ImageInput from "../_components/image-input";
import TitleInput from "../_components/title-input";
import TokenInput from "../_components/token-input";

const AddBoardPage = () => {
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
        className="my-40 md:mt-56"
      >
        <div className="mb-56 flex items-center justify-between">
          <h1 className="text-18-500 md:text-20-700">게시글 쓰기</h1>
          <Button
            disabled={!methods.formState.isValid}
            type="submit"
            variant="primary"
            className="h-32 w-74 md:h-48 md:w-184"
          >
            등록
          </Button>
        </div>
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

export default AddBoardPage;
