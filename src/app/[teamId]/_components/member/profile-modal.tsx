import { Button, Drawer, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import { IconProfileCurrent } from "@/public/assets/icons";
import { GroupMember } from "@/types/user";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: GroupMember;
}

const ProfileModal = ({ isOpen, onClose, member }: ProfileModalProps) => {
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
        {/** TODO: 유저 프로필 있는 경우 이미지 넣기 */}
        {member.userImage ? (
          <IconProfileCurrent width={52} height={52} />
        ) : (
          <IconProfileCurrent width={52} height={52} />
        )}
        <div className="flex flex-col items-center gap-8">
          <span className="text-14-500">
            {member.userName}
            {member.role === "ADMIN" && (
              <span className="ml-4 text-12-400 text-brand-secondary">
                (관리자)
              </span>
            )}
          </span>
          <span className="text-12-400 text-text-secondary">
            {member.userEmail}
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
