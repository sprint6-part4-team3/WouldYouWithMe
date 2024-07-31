import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const idCSS = "hello";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => (
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
);

export default ProgressBar;
