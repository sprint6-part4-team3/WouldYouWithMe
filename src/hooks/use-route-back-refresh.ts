import { useRouter } from "next/navigation";

const useBackAndRefresh = () => {
  const router = useRouter();

  return () => {
    router.back();
    setTimeout(() => {
      router.refresh();
    }, 50);
  };
};

export default useBackAndRefresh;
