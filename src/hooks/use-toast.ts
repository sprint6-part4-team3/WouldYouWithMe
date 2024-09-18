import { useSetAtom } from "jotai";

import { ToastAtom } from "@/stores/toast";

const useToast = () => {
  const addToast = useSetAtom(ToastAtom);

  return {
    success: (message: string) => addToast({ type: "success", message }),
    error: (message: string) => addToast({ type: "error", message }),
  };
};

export default useToast;
