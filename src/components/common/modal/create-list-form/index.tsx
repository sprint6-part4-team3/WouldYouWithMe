"use client";

import React from "react";

import OneInputForm from "../one-input-form";

/**
 *
 * 목록 만들기 모달 children입니다.
 * @example
 *  <Modal isOpen={value} onClose={handleOff}>
        <CreateListForm />
    </Modal>
 * @author ☯️채종민
 */

const CreateListForm = () => {
  const createList = () => {};
  return (
    <OneInputForm
      id="create-list"
      btnText="만들기"
      placeholder="목록을 입력해주세요"
      onSubmit={createList}
    />
  );
};

export default CreateListForm;
