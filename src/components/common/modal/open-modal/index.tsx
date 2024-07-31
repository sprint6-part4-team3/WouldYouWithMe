"use client";

import { ReactNode } from "react";

import useToggle from "@/hooks/use-toggle";
import { ModalProps } from "@/types/modal-drawer/index";

import Modal from "..";

interface OpenModalProps extends Omit<ModalProps, "isOpen" | "onClose"> {
  children: ReactNode;
  modalChildren: ReactNode;
}

/**
 *
 * 모달을 여는 버튼이 서버 컴포넌트에 있는 경우 사용합니다.
 * 버튼을 children으로 감싸면 열고 닫힙니다.
 * 모달 안 children은 modalChildren prop으로 넘겨줍니다.
 * 모달 prop을 상속받아서 그대로 넣어 줄 수 있습니다. 
 * @example
 *  <OpenModal title="할 일 목록" modalChildren={<CreateListForm />}>
      <button type="button">
        새로운 목록 추가하기
      </button>
    </OpenModal>
 * @param children 모달을 열 버튼
 * @param modalChildren 모달 컨텐츠
 * @param rest 모달 prop들
 * @author ☯️채종민
 */

const OpenModal = ({ children, modalChildren, ...rest }: OpenModalProps) => {
  const { value, handleOn, handleOff } = useToggle();

  return (
    <>
      <div onClick={handleOn}>{children}</div>
      {value && (
        <Modal isOpen={value} onClose={handleOff} {...rest}>
          {modalChildren}
        </Modal>
      )}
    </>
  );
};

export default OpenModal;
