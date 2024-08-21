import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import getGroupData from "@/lib/api/group/get-group-data";

import MemberBox from "./_components/member";
import ReportBox from "./_components/report";
import TeamCardBox from "./_components/team-card";
import TodoListBox from "./_components/todo-list";

type Props = {
  params: { teamId: number };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { teamId } = params;

  try {
    const response: GroupResponse = await getGroupData(teamId);

    return {
      title: `${response.name} | 우주윗미`,
      description: `${response.name} 팀의 페이지입니다.`,
    };
  } catch {
    return {
      title: "팀 페이지",
      description: "팀 정보를 불러오는 데 실패했습니다.",
    };
  }
}

const TeamPage = async ({ params }: { params: { teamId: number } }) => {
  const queryClient = new QueryClient();

  const currentTeamId = Number(params.teamId);

  if (isNaN(currentTeamId)) {
    throw new Error("오류발생");
  }

  console.log("currentTeamId", currentTeamId);

  await queryClient.prefetchQuery({
    queryKey: ["team", currentTeamId],
    queryFn: () => getGroupData(currentTeamId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamWrapper teamId={currentTeamId} />
    </HydrationBoundary>
  );
};

export default TeamPage;
