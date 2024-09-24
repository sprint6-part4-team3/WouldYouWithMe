import { atom } from "jotai";

/** 모바일 화면인지 아닌지 */
const isMobileAtom = atom<boolean>(false);

export default isMobileAtom;
