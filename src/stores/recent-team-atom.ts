import { atomWithStorage } from "jotai/utils";

import { RecentTeam } from "@/types/user";

const recentTeamAtom = (userId: number) => {
  const storageKey = `recentTeam_${userId}`;
  return atomWithStorage<RecentTeam>(storageKey, { teamName: "", groupId: 0 });
};

export default recentTeamAtom;
