import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

import GradientSVG from "./gradient-svg";

const idCSS = "hello";

interface MobileProgressBarProps {
  percentage: number;
}

const MobileProgressBar = ({ percentage }: MobileProgressBarProps) => (
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
);

export default MobileProgressBar;
