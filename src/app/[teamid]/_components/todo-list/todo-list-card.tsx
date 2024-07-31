interface TodoListCardProps {
  color: "purple" | "blue" | "green" | "pink";
  children: string;
}

function getColorClass(color: TodoListCardProps["color"]) {
  if (color === "purple") return "bg-point-purple";
  if (color === "blue") return "bg-point-blue";
  if (color === "green") return "bg-point-green";
  if (color === "pink") return "bg-point-pink";
  return "bg-point-purple";
}

export default function TodoListCard({ children, color }: TodoListCardProps) {
  const colorClass = getColorClass(color);

  return (
    <div className="m-auto my-10 flex h-40 w-343 items-center justify-between rounded-full bg-background-secondary px-10 text-16-500 lg:w-696 xl:w-1200">
      {/* 임시 ui */}
      <div className="flex items-center gap-4">
        <div className={colorClass}>color</div>
        <span className="text-14-500">{children}</span>
      </div>
      <div className="flex items-center gap-4">
        <span>(i)</span>
        {/* <IconGear /> */}
        <span className="text-14-400 text-point-green">5/5</span>
        <span>:</span>
      </div>
    </div>
  );
}
