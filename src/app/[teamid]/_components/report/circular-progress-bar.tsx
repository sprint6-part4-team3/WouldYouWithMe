"use client";

import "react-circular-progressbar/dist/styles.css";

import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

import useIsMobile from "@/hooks/use-is-mobile";

import GradientSVG from "./gradient-svg";

const idCSS = "gradient";

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  const isMobile = useIsMobile();

  return (
    <div>
      {isMobile ? (
        <div className="flex-1">
          <div className="size-140">
            <GradientSVG />
            <CircularProgressbarWithChildren
              styles={buildStyles({
                rotation: 0.25,
                pathColor: `url(#${idCSS})`,
                trailColor: "#334155",
              })}
              strokeWidth={16}
              value={percentage}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-12-500">오늘</span>
                <span className="text-gradient text-24-700">{percentage}%</span>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="size-168">
            <CircularProgressbar
              styles={buildStyles({
                rotation: 0.25,
                pathColor: `url(#${idCSS})`,
                trailColor: "#334155",
              })}
              strokeWidth={17}
              value={percentage}
            />
          </div>
          <div className="flex flex-col gap-3 md:mx-22 lg:ml-40">
            <span className="text-14-500">
              오늘의
              <br />
              진행상황
            </span>
            <span className="text-gradient font-bold leading-[48px] md:text-34 lg:text-40">
              {percentage}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
