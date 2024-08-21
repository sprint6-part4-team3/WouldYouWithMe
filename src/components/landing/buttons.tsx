import Link from "next/link";
import React from "react";

import { Button } from "@/components/common";

const LandingButtons = () => (
  <div className="flex flex-col gap-10 md:flex-row">
    <Link href="/login">
      <Button
        className="m-auto h-45 w-200 rounded-full text-16-600 hover:bg-gradient-to-r hover:from-brand-tertiary hover:to-brand-primary"
        variant="primary"
      >
        지금 시작하기
      </Button>
    </Link>
    <Link href="/boards">
      <Button
        className="m-auto h-45 w-200 rounded-full text-16-600 "
        variant="noFill"
      >
        둘러보기
      </Button>
    </Link>
  </div>
);

export default LandingButtons;
