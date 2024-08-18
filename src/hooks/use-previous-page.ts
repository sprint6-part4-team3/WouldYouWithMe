import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const usePreviousPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storage = globalThis?.sessionStorage;

    if (!storage) {
      return;
    }

    const currentUrl =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    const previousUrl = storage.getItem("CURRENT_URL");

    if (previousUrl) {
      storage.setItem("PREVIOUS_URL", previousUrl);
    }

    storage.setItem("CURRENT_URL", currentUrl);
  }, [pathname, searchParams]);
};

export default usePreviousPage;
