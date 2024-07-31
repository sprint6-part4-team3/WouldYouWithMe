"use client";

import { Drawer, Modal } from "@/components/common";
import OneInputForm from "@/components/common/modal/one-input-form";
import { useIsMobile, useToast, useToggle } from "@/hooks";

/**
 * 새로운 목록 추가하기 버튼
 * 목록 만들기 모달 띄우는 버튼입니다.
 * @example
 *  <AddListModalButton />
 * @author ☯️채종민
 */

const AddListModalButton = () => {
  const { value, handleOn, handleOff } = useToggle();
  const toast = useToast();
  const isMobile = useIsMobile();

  const createList = () => {
    toast.success("등록이 완료되었습니다");
    handleOff();
  };

  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <>
      <button onClick={handleOn} type="button">
        <span className="leading-0 text-brand-primary">+ </span>
        <span className="text-14-400 text-brand-primary">
          새로운 목록 추가하기
        </span>
      </button>
      {value && (
        <ModalComponent
          showCloseButton
          isOpen={value}
          onClose={handleOff}
          title="할 일 목록"
        >
          <OneInputForm
            id="create-list"
            btnText="만들기"
            placeholder="목록을 입력해주세요"
            onSubmit={createList}
          />
        </ModalComponent>
      )}
    </>
  );
};

export default AddListModalButton;
