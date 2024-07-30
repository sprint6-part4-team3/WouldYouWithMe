"use client";

import "react-circular-progressbar/dist/styles.css";

import useIsMobile from "@/hooks/use-is-mobile";
import { IconDonePanel, IconToDo } from "@/public/assets/icons";

import GradientSVG from "./gradient-svg";
import MobileProgressBar from "./mobile-progress-bar";
import ProgressBar from "./progress-bar";
import TodoCount from "./todo-count";

const PERCENTAGE = 32;

const ReportBox = () => {
  const isMobile = useIsMobile();

  return (
    <article className="flex flex-col gap-16">
      <GradientSVG />
      {/* 기존 16px 너무 작은데 18px 어떤가요? */}
      <h2 className="text-18-500">리포트</h2>

      <section className="flex h-224 w-full items-center justify-between rounded-12 bg-background-secondary px-24">
        {isMobile ? (
          <MobileProgressBar percentage={PERCENTAGE} />
        ) : (
          <ProgressBar percentage={PERCENTAGE} />
        )}
        <div className="flex flex-1 flex-col gap-16 md:max-w-300 lg:max-w-400">
          <TodoCount title="오늘 할 일" count={20} icon={<IconToDo />} />
          <TodoCount title="한 일" count={5} icon={<IconDonePanel />} />
        </div>
      </section>
    </article>
  );
};

export default ReportBox;
