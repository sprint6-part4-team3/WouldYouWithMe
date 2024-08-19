import { useMemo } from "react";

import { IconMail } from "@/public/assets/icons";
import { GroupMember } from "@/types/user";
import getTeamAdmin from "@/utils/get-team-admin";

import AddMemberModal from "./add-member-modal";
import Card from "./card";

interface MemberBoxProps {
  memberList: GroupMember[];
  teamName: string;
}
const MemberBox = ({ memberList, teamName }: MemberBoxProps) => {
  const adminId = getTeamAdmin(memberList);

  const emailList = memberList.map((user) => user.userEmail).join(",");

  return (
    <article className="flex flex-col gap-24">
      <div className="flex items-center justify-between">
        <div className="flex gap-8">
          <h2 className="text-16-500">멤버</h2>
          <span className="text-16-400 text-text-default">
            ({memberList.length}명)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <IconMail />
          <a
            href={`mailto:${emailList}`}
            className="text-14-500 text-brand-primary hover:underline"
          >
            전체 메일 보내기
          </a>
        </div>
      </div>

      <section className="mb-30 grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-24">
        {memberList.map((member) => (
          <Card
            key={member.userId}
            member={member}
            adminId={adminId}
            teamName={teamName}
          />
        ))}
        <AddMemberModal />
      </section>
    </article>
  );
};

export default MemberBox;
