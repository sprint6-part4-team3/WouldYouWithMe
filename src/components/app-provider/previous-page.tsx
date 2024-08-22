import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const usePreviousPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storage = sessionStorage;
    const currentUrl =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const previousUrl = storage.getItem("CURRENT_URL");

    if (previousUrl) {
      storage.setItem("PREVIOUS_URL", previousUrl);
    }

    storage.setItem("CURRENT_URL", currentUrl);
  }, [pathname, searchParams]);
};

const PreviousPageComponent = () => {
  usePreviousPage();

  return null;
};

const SuspensePreviousPageComponent = () => (
  <Suspense fallback={null}>
    <PreviousPageComponent />
  </Suspense>
);

export default SuspensePreviousPageComponent;
