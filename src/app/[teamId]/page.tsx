"use client";

import { useEffect, useState } from "react";

import getGroupData from "@/lib/api/group/get-group-data";
import { GroupResponse, GroupTask } from "@/types/group";
import { GroupMember } from "@/types/user";

import PageLoading from "../../components/loading";
import Empty from "./_components/empty";
import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import TeamCardBox from "./_components/team-card";
import TodoListBox from "./_components/todo-list";

const TeamPage = ({ params }: { params: { teamId: number } }) => {
  const [userData, setUserData] = useState<GroupResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { teamId } = params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res: GroupResponse = await getGroupData(teamId);
        setUserData(res);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [teamId]);

  if (isLoading) {
    return <PageLoading />;
  }
  if (!userData) {
    return <Empty />;
  }

  return (
    <>
      <TeamCardBox teamName={userData.name} teamId={teamId} />
      <TodoListBox taskList={userData.taskLists} teamId={teamId} />
      <ReportBox taskList={userData.taskLists} />
      <MemberBox memberList={userData.members} />
    </>
  );
};

export default TeamPage;
