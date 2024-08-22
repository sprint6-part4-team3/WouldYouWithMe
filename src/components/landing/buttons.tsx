"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/common";

const LandingButtons = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  if (loggedIn) {
    return (
      <Link href="/my-teams">
        <Button
          className="m-auto h-45 w-300 rounded-full bg-gradient-to-r from-brand-tertiary to-brand-primary text-16-600 hover:text-text-inverse"
          variant="primary"
        >
          팀 목록으로 이동
        </Button>
      </Link>
    );
  }
  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <Link href="/login">
        <Button
          className="m-auto h-45 w-200 rounded-full text-16-600 hover:bg-gradient-to-r hover:from-brand-tertiary hover:to-brand-primary hover:text-text-inverse"
          variant="noFill"
        >
          지금 시작하기
        </Button>
      </Link>
      <Link href="/boards">
        <Button
          className="m-auto h-45 w-200 rounded-full text-16-600 hover:bg-gradient-to-r hover:from-brand-tertiary hover:to-brand-primary hover:text-text-inverse"
          variant="noFill"
        >
          둘러보기
        </Button>
      </Link>
    </div>
  );
};
export default LandingButtons;
