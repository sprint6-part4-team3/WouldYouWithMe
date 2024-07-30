import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const idCSS = "hello";

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => (
  <div className="flex items-center">
    <div className="size-160 lg:size-180">
      <CircularProgressbar
        styles={buildStyles({
          rotation: 0.25,
          pathColor: `url(#${idCSS})`,
          trailColor: "#334155",
        })}
        strokeWidth={16}
        value={percentage}
      />
    </div>
    <div className="flex flex-col md:mx-12 lg:ml-28">
      <span className="text-14-500">
        오늘의
        <br />
        진행상황
      </span>
      <span className="text-gradient font-bold md:text-34 lg:text-40">
        {percentage}%
      </span>
    </div>
  </div>
);

export default ProgressBar;
