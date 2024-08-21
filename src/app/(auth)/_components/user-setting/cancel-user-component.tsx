"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

import { Button, Drawer, FloatButton, Modal } from "@/components/common";
import { useIsMobile, useToast } from "@/hooks";
import CancelUser from "@/lib/api/user-setting/cancel-user";
import { LoadingSpinner } from "@/public/assets/icons";
import { pwLengthAtom, recentTeamAtom, userAtom } from "@/stores";
import { deleteCookie } from "@/utils/next-cookie";

interface CancelUserComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const CancelUserComponent = ({ isOpen, onClose }: CancelUserComponentProps) => {
  const queryClient = useQueryClient();
  const { success, error } = useToast();
  const router = useRouter();
  const isMobile = useIsMobile();

  const [, setUser] = useAtom(userAtom);
  const [, setRecentTeam] = useAtom(recentTeamAtom);
  const [, setPwLength] = useAtom(pwLengthAtom);

  const CommonCancelUser = isMobile ? Drawer : Modal;

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await CancelUser();

      if (response.success) {
        await deleteCookie("token");
        await deleteCookie("refreshToken");
        await deleteCookie("userId");
        await deleteCookie("firstTeamName");

        setUser({
          id: 0,
          nickname: "",
          createdAt: "",
          updatedAt: "",
          image: null,
          teamId: "",
          email: "",
          accessToken: "",
          refreshToken: "",
          loginType: null,
        });
        setRecentTeam(null);
        setPwLength(0);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      success("회원 탈퇴되었습니다.");
      router.replace(`/`);
      onClose();
    },
    onError: () => {
      error("회원 탈퇴에 실패했습니다.");
      onClose();
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    isOpen && (
      <CommonCancelUser
        onClose={onClose}
        title="회원 탈퇴를 진행하시겠어요?"
        description="그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다."
        showWarningIcon
      >
        <div className="flex gap-8">
          <Button variant="secondary" onClick={onClose} className="h-48 w-136">
            닫기
          </Button>
          {isPending ? (
            <FloatButton
              Icon={<LoadingSpinner width={30} height={30} />}
              disabled={isPending}
              variant="danger"
              className="h-48 w-136"
            >
              처리 중...
            </FloatButton>
          ) : (
            <Button
              type="submit"
              variant="danger"
              onClick={onSubmit}
              className="h-48 w-136"
            >
              회원 탈퇴
            </Button>
          )}
        </div>
      </CommonCancelUser>
    )
  );
};

export default CancelUserComponent;
