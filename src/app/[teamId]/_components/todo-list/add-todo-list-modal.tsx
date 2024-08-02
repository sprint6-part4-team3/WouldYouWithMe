"use client";

import { useState } from "react";

import { Button, Drawer, Input, Modal } from "@/components/common";
import { useIsMobile } from "@/hooks";
import { IconPlusCyan } from "@/public/assets/icons";

const AddTodoListModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded px-4 py-2 text-14-400 text-brand-primary"
      >
        <IconPlusCyan />
        <span>새로운 목록 추가하기</span>
      </button>
      {isMobile ? (
        // TODO: 모바일
        <Drawer
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          title="할 일 목록"
        >
          <div>
            <Input
              id="text"
              placeholder="목록 명을 입력해주세요."
              type="text"
            />
            <Button className="mt-24 h-48 w-280" variant="primary">
              만들기
            </Button>
          </div>
        </Drawer>
      ) : (
        // TODO: PC, 태블릿
        <Modal
          title="할 일 목록"
          showCloseButton
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <div>
            <Input
              id="text"
              placeholder="목록 명을 입력해주세요."
              type="text"
            />
            <Button className="mt-24 h-48 w-280" variant="primary">
              만들기
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AddTodoListModal;
