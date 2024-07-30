"use client";

import Button from "@/components/common/buttons/button";
import Modal from "@/components/common/modal";
import useToast from "@/hooks/use-toast";
import useToggle from "@/hooks/use-toggle";

const AddMember = () => {
  const { value, handleOn, handleOff } = useToggle();
  const toast = useToast();

  const handleClickCopy = () => {
    // TODO: 링크 생성해서 복사하기
    toast.success("링크가 복사되었습니다.");
    handleOff();
  };

  return (
    <>
      <span
        onClick={handleOn}
        className="cursor-pointer text-14-400 text-brand-primary hover:scale-105 hover:underline"
      >
        + 멤버 추가하기
      </span>
      <Modal
        showCloseButton
        isOpen={value}
        onClose={handleOff}
        title="멤버 초대"
        description="그룹에 참여할 수 있는 링크를 복사합니다."
      >
        <Button
          onClick={handleClickCopy}
          variant="primary"
          className="mt-16 h-47 w-full"
        >
          복사하기
        </Button>
      </Modal>
    </>
  );
};

export default AddMember;
