/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import getGroupData from "@/lib/api/group/get-group-data";

import TeamWrapper from "./team-wrapper";

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
