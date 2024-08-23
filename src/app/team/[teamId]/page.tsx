/* eslint-disable no-restricted-globals */
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import type { Metadata, ResolvingMetadata } from "next";

import getGroupData from "@/lib/api/group/get-group-data";
import { GroupResponse } from "@/types/group";

import TeamWrapper from "./team-wrapper";

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

  await queryClient.prefetchQuery({
    queryKey: ["team", currentTeamId],
    queryFn: () => getGroupData(currentTeamId),
    staleTime: 5000,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TeamWrapper teamId={currentTeamId} />
    </HydrationBoundary>
  );
};

export default TeamPage;
