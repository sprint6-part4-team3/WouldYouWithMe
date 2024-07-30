"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence } from "framer-motion";
import { useAtomValue } from "jotai";
import ReactDOM from "react-dom";

import { ToastListAtom } from "@/stores/toast";

import Toast from ".";

const ToastContainer = () => {
  const toasts = useAtomValue(ToastListAtom);

  return ReactDOM.createPortal(
    <div className="absolute left-1/2 top-30 flex -translate-x-1/2 flex-col items-center gap-12 sm:w-full sm:px-12 md:min-w-400">
      <AnimatePresence>
        {toasts?.map((toast: any) => <Toast key={toast.id} {...toast} />)}
      </AnimatePresence>
    </div>,
    document.body,
  );
};

export default ToastContainer;
