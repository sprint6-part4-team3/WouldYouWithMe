"use client";

import { useAtom } from "jotai";

import { isMobileAtom } from "@/stores";

const useIsMobile = (): boolean => {
  const [isMobile] = useAtom(isMobileAtom);

  return isMobile;
};

export default useIsMobile;
