import { atomWithStorage } from "jotai/utils";

import { RecentTeam } from "@/types/user";

const recentTeamAtom = (userId: string) => {
  const storageKey = `recentTeam_${userId}`;
  return atomWithStorage<RecentTeam>(storageKey, null);
};

export default recentTeamAtom;
