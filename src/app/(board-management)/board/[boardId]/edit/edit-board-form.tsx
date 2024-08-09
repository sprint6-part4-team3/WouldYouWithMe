/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import boardAddEditSchema from "@/lib/schemas/board";
import { BoardAddEditInput } from "@/types/board/add-edit";

import ContentInput from "../../../_components/content-input";
import BoardFormHeader from "../../../_components/form-header";
import ImageInput from "../../../_components/image-input";
import TitleInput from "../../../_components/title-input";
import TokenInput from "../../../_components/token-input";

interface EditBoardFormProps {
  initialData: BoardAddEditInput;
}

const EditBoardForm = ({ initialData }: EditBoardFormProps) => {
  const methods = useForm<BoardAddEditInput>({
    resolver: zodResolver(boardAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: initialData,
  });

  const handleSubmitBoard: SubmitHandler<BoardAddEditInput> = (data) => {
    const contentString = JSON.stringify(data.content);

    const submitData = {
      ...data,
      content: contentString,
    };

    console.log(submitData);
    // TODO: API 연동 - 게시물 수정 patch 요청
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitBoard)}
        className="my-40"
      >
        <BoardFormHeader type="edit" />
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

export default EditBoardForm;
