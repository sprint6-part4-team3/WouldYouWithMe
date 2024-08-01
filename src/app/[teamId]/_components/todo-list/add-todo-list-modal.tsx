import { useState } from "react";

import { Button, Input, Modal } from "@/components/common";

const AddTodoListModal: React.FC = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded px-4 py-2 text-14-400 text-brand-primary"
      >
        + 새로운 목록 추가하기
      </button>
      <Modal
        title="할 일 목록"
        showCloseButton
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <div>
          <Input id="text" placeholder="목록 명을 입력해주세요." type="text" />
          <Button className="mt-24 h-48 w-280" variant="primary">
            만들기
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AddTodoListModal;
