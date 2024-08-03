import { GroupTask } from "@/types/group";
import { GroupMember } from "@/types/user";

import Empty from "./_components/empty";
import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
// json test data
import TeamTestData from "./team.json";

const TeamPage = () => {
  const members: GroupMember[] = TeamTestData.members as GroupMember[];
  const tasks: GroupTask[] = TeamTestData.taskLists as GroupTask[];

  // 빈배열이면 Empty 화면, 임시로 아무값 넣음
  const MembershipsTestData = [1];

  return MembershipsTestData.length === 0 ? (
    <Empty />
  ) : (
    <>
      <ReportBox taskList={tasks} />
      <MemberBox memberList={members} />
    </>
  );
};

export default TeamPage;
