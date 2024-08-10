"use client";

import { useEffect, useState } from "react";

import getGroupData from "@/lib/api/group/get-group-data";
import { GroupResponse, GroupTask } from "@/types/group";
import { GroupMember } from "@/types/user";

import Empty from "./_components/empty";
import TeamPageLoading from "./_components/loading";
import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import TeamCardBox from "./_components/team-card";
import TodoListBox from "./_components/todo-list";

const TeamPage = ({ params }: { params: { teamId: number } }) => {
  const [userData, setUserDate] = useState<GroupResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { teamId } = params;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res: GroupResponse = await getGroupData(teamId);
        setUserDate(res);
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
    return <TeamPageLoading />;
  }
  if (!userData) {
    return <Empty />;
  }

  const members: GroupMember[] = userData.members as GroupMember[];
  const tasks: GroupTask[] = userData.taskLists as GroupTask[];
  const name: string = userData.name as string;

  return (
    <>
      <TeamCardBox teamName={name} teamId={teamId} />
      <TodoListBox taskList={tasks} teamId={teamId} />
      <ReportBox taskList={tasks} />
      <MemberBox memberList={members} />
    </>
  );
};

export default TeamPage;
