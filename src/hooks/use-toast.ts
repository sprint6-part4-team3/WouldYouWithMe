import { useSetAtom } from "jotai";

import { ToastAtom } from "@/stores/toast";

const useToast = () => {
  const addToast = useSetAtom(ToastAtom);

  return {
    success: addToast("success"),
    error: addToast("error"),
  };
};

export default useToast;
