import { atom } from "jotai";

const loginAtom = atom({
  email: "",
  token: "",
});

export default loginAtom;
