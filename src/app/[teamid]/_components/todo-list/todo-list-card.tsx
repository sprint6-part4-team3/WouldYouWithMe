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
    <div className="relative m-auto my-10 flex h-40 w-343 items-center justify-between rounded-12 bg-background-secondary px-24 text-16-500 lg:w-696 xl:w-1200">
      <div className={`absolute left-0 h-40 w-12 rounded-l-12 ${colorClass}`} />
      <span className="text-14-500">{children}</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 rounded-full bg-background-primary px-8 py-4">
          {/* 추후에 계산 필요? */}
          <span>◎</span>
          {/* <IconGear /> */}
          <span className="text-14-400 text-point-green">5/5</span>
        </div>
        {/* <DropDown /> */}
        <span>:</span>
      </div>
    </div>
  );
}
