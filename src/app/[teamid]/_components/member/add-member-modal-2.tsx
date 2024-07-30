"use client";

import Button from "@/components/common/buttons/button";
import Modal from "@/components/common/modal";
import useToast from "@/hooks/use-toast";
import useToggle from "@/hooks/use-toggle";

const AddMemberModal2 = () => {
  const { value, handleOn, handleOff } = useToggle();
  const toast = useToast();

  const handleClickCopy = () => {
    // TODO: 링크 생성해서 복사하기
    toast.success("링크가 복사되었습니다.");
    handleOff();
  };

  return (
    <>
      <div
        onClick={handleOn}
        className="flex h-72 cursor-pointer items-center rounded-16 border-4 border-dotted border-background-tertiary px-16 py-12 text-16-700 text-brand-primary hover:bg-background-secondary/50 hover:underline md:h-auto  md:px-20 md:py-16 lg:px-24 lg:py-20"
      >
        + 멤버 추가하기
      </div>
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

export default AddMemberModal2;
