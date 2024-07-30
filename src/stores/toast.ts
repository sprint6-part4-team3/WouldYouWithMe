import { atom } from "jotai";

import { type ToastProps, type ToastType } from "@/components/common/toast";

export const ToastListAtom = atom<ToastProps[]>([]);

export const ToastAtom = atom(
  null,
  (get, set, type: ToastType) => (message: string) => {
    const prevAtom = get(ToastListAtom);
    const newToast = {
      type,
      message,
      id: Date.now().toString(),
    };

    const lastToast = prevAtom[prevAtom.length - 1];
    if (!lastToast || lastToast.type !== type) {
      set(ToastListAtom, [...prevAtom, newToast]);
    }
  },
);

export const RemoveToastAtom = atom(null, (get, set, id: string) => {
  const prevToasts = get(ToastListAtom);
  set(
    ToastListAtom,
    prevToasts.filter((toast) => toast.id !== id),
  );
});
