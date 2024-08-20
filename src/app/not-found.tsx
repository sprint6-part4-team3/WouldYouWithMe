"use client";

import Lottie from "lottie-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/common";
import notfound from "@/public/assets/lotties/404.json";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Lottie
        animationData={notfound}
        style={{ width: "45%", height: "45%" }}
      />
      <Button
        variant="primary"
        className="h-45 w-200"
        onClick={() => {
          router.push("/");
        }}
      >
        홈으로 이동
      </Button>
    </div>
  );
};

export default NotFound;
