"use client";

import Drawer from "@/components/common/drawer";
import Modal from "@/components/common/modal";
import OneInputForm from "@/components/common/modal/one-input-form";
import { useIsMobile, useToast, useToggle } from "@/hooks";
import { IconPlusCurrent } from "@/public/assets/icons";


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
      <button
        onClick={handleOn}
        type="button"
        className="group flex items-center gap-4 text-14-400 text-brand-primary hover:text-interaction-hover"
      >
        <IconPlusCurrent className="stroke-brand-primary group-hover:stroke-interaction-hover" />
        새로운 목록 추가하기
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
