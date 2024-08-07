"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence } from "framer-motion";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { ToastListAtom } from "@/stores/toast";

import Toast from ".";

const ToastContainer = () => {
  const [isClient, setIsClient] = useState(false);
  const toasts = useAtomValue(ToastListAtom);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed left-1/2 top-30 z-[60] flex -translate-x-1/2 flex-col items-center gap-12 sm:w-full sm:px-12 md:min-w-400">
      <AnimatePresence>
        {toasts?.map((toast: any) => <Toast key={toast.id} {...toast} />)}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

export default ToastContainer;
