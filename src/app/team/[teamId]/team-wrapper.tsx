/* eslint-disable no-console */

"use client";

import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import getGroupData from "@/lib/api/group/get-group-data";
import getTeamAdmin from "@/utils/get-team-admin";

import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import TeamCardBox from "./_components/team-card";
import TodoListBox from "./_components/todo-list";

interface TeamWrapperProps {
  teamId: number;
}

const TeamWrapper = ({ teamId }: TeamWrapperProps) => {
  const { data: response, error } = useQuery({
    queryKey: ["team", teamId],
    queryFn: () => getGroupData(teamId),
    staleTime: 5000,
  });

  if (!response) {
    return redirect("/not-found");
  }

  if (error) {
    throw new Error("에러발생");
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
};

export default TeamWrapper;
