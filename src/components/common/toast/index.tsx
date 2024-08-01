"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import Lottie from "lottie-react";
import React, { useEffect } from "react";

import ErrorAnimation from "@/public/assets/lotties/error.json";
import SuccessAnimation from "@/public/assets/lotties/success.json";
import { RemoveToastAtom } from "@/stores/toast";

export type ToastType = "success" | "error";

export interface ToastProps {
  /** toast 타입입니다. success, error */
  type?: ToastType;
  /** toast 메시지 입니다. */
  message?: string;
  /** 사용하실 때 고려하지 않아도 됩니다. */
  id: string;
}

const TOAST_DURATION = 2000;

const Toast = ({ type, message = "test", id }: ToastProps) => {
  const removeToastItem = useSetAtom(RemoveToastAtom);

  useEffect(() => {
    const timeoutForRemove = setTimeout(() => {
      removeToastItem(id);
    }, TOAST_DURATION);

    return () => {
      clearTimeout(timeoutForRemove);
    };
  }, [id, removeToastItem]);

  return (
    <motion.div
      key={id}
      className={clsx(
        "inline-flex cursor-pointer items-center rounded-lg border bg-background-tertiary p-8 text-center shadow-md transition-all duration-300 ease-in-out sm:w-full ",
        {
          "text-point-green border-point-green": type === "success",
          "text-point-rose border-point-rose": type === "error",
        },
      )}
      onClick={() => removeToastItem(id)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {type === "success" ? (
        <Lottie
          animationData={SuccessAnimation}
          style={{ width: "24px", height: "24px", marginRight: "6px" }}
        />
      ) : (
        <Lottie
          animationData={ErrorAnimation}
          style={{
            width: "18px",
            height: "18px",
            marginLeft: "3px",
            marginRight: "10px",
          }}
        />
      )}
      <span className="mr-6 text-16-500">{message}</span>
    </motion.div>
  );
};

export default Toast;
