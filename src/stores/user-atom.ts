import { atomWithStorage } from "jotai/utils";

import { LoginUser } from "@/types/user";

const userAtom = atomWithStorage<LoginUser>("user", {
  id: "",
  nickname: "",
  createdAt: "",
  updatedAt: "",
  image: null,
  teamId: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  loginType: null,
});

export default userAtom;
