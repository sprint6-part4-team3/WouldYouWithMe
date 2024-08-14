import Link from "next/link";

import { Button, Drawer, Modal } from "@/components/common";

interface RedirectBoardModalProps {
  isMobile: boolean;
  handleOff: () => void;
}

const RedirectBoardModal = ({
  isMobile,
  handleOff,
}: RedirectBoardModalProps) => {
  const ModalComponent = isMobile ? Drawer : Modal;

  return (
    <ModalComponent
      showCloseButton
      onClose={handleOff}
      title="모집글 작성"
      description="복사된 토큰으로 모집글을 작성하시겠습니까?"
    >
      <div className="flex gap-8">
        <Button variant="secondary" onClick={handleOff} className="h-48 w-136">
          아니오
        </Button>
        <Link href="/create-board">
          <Button variant="primary" className="h-48 w-136">
            작성하기
          </Button>
        </Link>
      </div>
    </ModalComponent>
  );
};

export default RedirectBoardModal;
