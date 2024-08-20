import { redirect } from "next/navigation";
import { Suspense } from "react";

import getGroupData from "@/lib/api/group/get-group-data";
import { GroupResponse } from "@/types/group";
import getTeamAdmin from "@/utils/get-team-admin";

import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import TeamCardBox from "./_components/team-card";
import TodoListBox from "./_components/todo-list";
import PageLoading from "./loading";

const TeamPage = async ({ params }: { params: { teamId: number } }) => {
  const { teamId } = params;

  try {
    const response: GroupResponse = await getGroupData(teamId);

    if (!response) {
      return redirect("/team-empty");
    }

    const adminId = getTeamAdmin(response.members);

    return (
      <>
        <TeamCardBox
          teamImage={response.image}
          teamName={response.name}
          teamId={teamId}
          adminId={adminId}
        />
        <TodoListBox taskList={response.taskLists} teamId={teamId} />
        <ReportBox taskList={response.taskLists} />
        <MemberBox memberList={response.members} teamName={response.name} />
      </>
    );
  } catch {
    throw new Error("팀 페이지를 가져오는데 실패하였습니다.");
  }
};

export default TeamPage;
