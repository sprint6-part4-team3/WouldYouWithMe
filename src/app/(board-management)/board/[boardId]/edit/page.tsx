/* eslint-disable no-useless-escape */
/* eslint-disable no-console */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import boardAddEditSchema from "@/lib/schemas/article";
import { BoardAddEditInput } from "@/types/board/add-edit";

import ContentInput from "../../../_components/content-input";
import BoardFormHeader from "../../../_components/form-header";
import ImageInput from "../../../_components/image-input";
import TitleInput from "../../../_components/title-input";
import TokenInput from "../../../_components/token-input";

const testBoardData = {
  title: "개발자 취준생 스터디 모집",
  content: `{\"token\":\"참여 토큰 or 팀 링크 여기에 넣어서 게시판에서 링크 누르면 복사 or 링크 접속되면 좋을 듯\",\"content\":\"안녕하세요.\\n저랑 같이 개발자 취준생 스터디 하실 분 구합니다.\\n같이 열심히 공부합시다!\\n٩( ᐛ )و \\n\"}`,
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/85/585960601535448881.jpeg",
};

const parsedContent = JSON.parse(testBoardData.content);

const EditBoardPage = () => {
  const methods = useForm<BoardAddEditInput>({
    resolver: zodResolver(boardAddEditSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      title: testBoardData.title,
      content: {
        content: parsedContent.content,
        token: parsedContent.token,
      },
      ...(testBoardData.image && { image: testBoardData.image }),
    },
  });

  const handleSubmitBoard: SubmitHandler<BoardAddEditInput> = (data) => {
    // TODO: API 연동 - 게시물 수정 patch 요청
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

export default EditBoardPage;
