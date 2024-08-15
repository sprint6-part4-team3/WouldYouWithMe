import { atomWithStorage } from "jotai/utils";

const pwLengthAtom = atomWithStorage<number>("pwLength", 0);

export default pwLengthAtom;
