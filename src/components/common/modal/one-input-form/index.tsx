"use client";

import React from "react";

import Button from "@/components/common/buttons/button";
import Input from "@/components/common/forms/input";

interface OneInputFormProps {
  id: string;
  placeholder: string;
  btnText: string;
  onSubmit?: () => void;
}

/**
 *
 * input 하나 짜리 모달 children입니다. 
 * @example
 *  <OneInputForm
      id="create-list"
      btnText="만들기"
      placeholder="목록을 입력해주세요"
      onSubmit={createList}
    />
 * @param id input id
 * @param btnText 버튼 text
 * @param placeholder input placeholder
 * @param onSubmit 제출 action
 * @author ☯️채종민
 */

const OneInputForm = ({
  id,
  placeholder,
  btnText,
  onSubmit,
}: OneInputFormProps) => (
  <form className="flex flex-col gap-24" onSubmit={onSubmit}>
    <Input id={id} placeholder={placeholder} />
    <Button variant="primary" className="h-48 w-full" type="submit">
      {btnText}
    </Button>
  </form>
);

export default OneInputForm;
