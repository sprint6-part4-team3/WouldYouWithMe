"use client";

import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { ToastDataAtom } from "@/stores/toast";

import Toast from ".";

const ToastContainer = () => {
  const [isClient, setIsClient] = useState(false);
  const toast = useAtomValue(ToastDataAtom);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed left-1/2 top-30 z-[60] flex -translate-x-1/2 flex-col items-center gap-12 sm:w-full sm:px-12 md:min-w-400">
      {toast && <Toast {...toast} />}
    </div>,
    document.body,
  );
};

export default ToastContainer;
