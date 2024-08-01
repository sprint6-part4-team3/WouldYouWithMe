import { GroupMember } from "@/types/user";

import Empty from "./_components/empty";
import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
// json data
import MembershipsTestData from "./memberships.json";
import TeamTestData from "./team.json";

const TeamPage = () => {
  const members: GroupMember[] = TeamTestData.members as GroupMember[];

  return MembershipsTestData.length === 0 ? (
    <Empty />
  ) : (
    <>
      <ReportBox />
      <MemberBox memberList={members} />
    </>
  );
};

export default TeamPage;
