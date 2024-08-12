import { atomWithStorage } from "jotai/utils";

const recentTeamAtom = atomWithStorage<string | null>("recentTeam", null);

export default recentTeamAtom;
