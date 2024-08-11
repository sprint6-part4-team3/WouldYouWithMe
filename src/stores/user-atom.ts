import { atomWithStorage } from "jotai/utils";

const userAtom = atomWithStorage("user", {
  id: null,
  nickname: "",
  createdAt: "",
  updatedAt: "",
  image: null,
  teamId: "",
  email: "",
  accessToken: "",
  refreshToken: "",
});

export default userAtom;
