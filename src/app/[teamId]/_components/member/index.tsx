import { GroupMember } from "@/types/user";

import AddMemberModal from "./add-member-modal";
import Card from "./card";

interface MemberBoxProps {
  memberList: GroupMember[];
}
const MemberBox = ({ memberList }: MemberBoxProps) => (
  <article className="flex flex-col gap-24">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h2 className="text-16-500">멤버</h2>
        <span className="text-16-400 text-text-default">
          ({memberList.length}명)
        </span>
      </div>
    </div>

    <section className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-24">
      {memberList.map((member) => (
        <Card key={member.userId} member={member} />
      ))}
      <AddMemberModal />
    </section>
  </article>
);

export default MemberBox;
