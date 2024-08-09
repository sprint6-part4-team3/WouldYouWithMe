"use client";

import { useToast } from "@/hooks";

const CopyTeamToken = ({ token }: { token: string }) => {
  const toast = useToast();

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(token)
      .then(() => {
        toast.success("토큰이 복사되었습니다.");
        // 이러고 팀 참여하기 페이지로 가면 좋을까요?
      })
      .catch(() => {
        toast.error("토큰이 복사되지 않았습니다.");
      });
  };

  return (
    <div className="relative">
      <div className="mt-40 w-full truncate rounded-2xl border-2 border-border-primary p-16 text-text-secondary">
        <span
          className="cursor-pointer hover:text-brand-primary hover:underline"
          onClick={copyToClipboard}
        >
          {token}
        </span>
      </div>
      <span className="absolute -top-10 left-25 flex items-center gap-6 bg-background-primary px-6 text-text-primary">
        팀 참여 토큰
        <span className="text-12-400 text-text-disabled">
          (토큰을 복사하여 팀에 참여하세요)
        </span>
      </span>
    </div>
  );
};

export default CopyTeamToken;