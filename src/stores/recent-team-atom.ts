import { atomWithStorage } from "jotai/utils";

import { RecentTeam } from "@/types/user";

const recentTeamAtom = atomWithStorage<RecentTeam>("recentTeam", null);

export default recentTeamAtom;
