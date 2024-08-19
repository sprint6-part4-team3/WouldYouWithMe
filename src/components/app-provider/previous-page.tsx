"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const usePreviousPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

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
  <Suspense fallback={<div>로딩</div>}>
    <PreviousPageComponent />
  </Suspense>
);

export default SuspensePreviousPageComponent;
