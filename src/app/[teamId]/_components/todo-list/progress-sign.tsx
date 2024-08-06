import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

interface Item {
  checkedItem: number;
}

const ProgressSign = ({ checkedItem }: Item) => (
  <div className="size-14">
    <CircularProgressbar
      styles={buildStyles({
        rotation: 0.25,
        pathColor: "#22b8cf",
        trailColor: "#334155",
      })}
      strokeWidth={17}
      value={checkedItem}
    />
  </div>
);

export default ProgressSign;
