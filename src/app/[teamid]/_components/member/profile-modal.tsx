import { Button, Drawer, Modal } from "@/components/common";
import useIsMobile from "@/hooks/use-is-mobile";
import useToast from "@/hooks/use-toast";
import { IconProfile } from "@/public/assets/icons";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  const toast = useToast();
  const isMobile = useIsMobile();

  const handleClickCopy = () => {
    // TODO: 이메일 복사하기
    toast.success("이메일이 복사되었습니다.");
    onClose();
  };

  const CommonComponent = isMobile ? Drawer : Modal;

  return (
    <CommonComponent showCloseButton isOpen={isOpen} onClose={onClose} title="">
      <div className="flex w-full flex-col items-center justify-center gap-24">
        <IconProfile width={52} height={52} />
        <div className="flex flex-col items-center gap-8">
          <span className="text-14-500">우지은</span>
          <span className="text-12-400 text-text-secondary">
            jieun@codeit.com
          </span>
        </div>
        <Button
          type="button"
          onClick={handleClickCopy}
          variant="primary"
          className="h-47 w-full"
        >
          이메일 복사하기
        </Button>
      </div>
    </CommonComponent>
  );
};
export default ProfileModal;
