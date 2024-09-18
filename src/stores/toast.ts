import { atom } from "jotai";

import { type ToastProps } from "@/components/common/toast";

export const ToastDataAtom = atom<ToastProps | null>(null);

export const ToastAtom = atom(null, (_, set, { type, message }: ToastProps) => {
  const newToast = {
    type,
    message,
    id: Date.now().toString(),
  };

  set(ToastDataAtom, newToast);
});

export const RemoveToastAtom = atom(null, (_, set) => {
  set(ToastDataAtom, null);
});
