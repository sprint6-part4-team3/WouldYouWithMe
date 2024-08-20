import Link from "next/link";

import { IconDoneCyan } from "@/public/assets/icons";
import { GroupTask, TaskList } from "@/types/group";
import groupTaskTodoList from "@/utils/group-task-todo-list";

import ProgressSign from "./progress-sign";
import TodoListDropDown from "./todo-list-drop-down";

interface TodoListCardProps {
  color?: "purple" | "blue" | "green" | "pink" | "rose" | "orange" | "yellow";
  children: string;
  link: string;
  tasks: TaskList[];
  task: GroupTask;
  onEditTask: (newTask: GroupTask) => void;
  onDeleteTask: (newTask: GroupTask) => void;
}

function getColorClass(color: TodoListCardProps["color"]) {
  if (color === "purple") return "bg-point-purple";
  if (color === "blue") return "bg-point-blue";
  if (color === "green") return "bg-point-green";
  if (color === "pink") return "bg-point-pink";
  if (color === "rose") return "bg-point-rose";
  if (color === "orange") return "bg-point-orange";
  if (color === "yellow") return "bg-point-yellow";
  return "bg-point-purple";
}

const TodoListCard = ({
  children,
  color,
  link,
  tasks,
  task,
  onEditTask,
  onDeleteTask,
}: TodoListCardProps) => {
  const colorClass = getColorClass(color);
  const { totalItems, completedItems, CHECKED_ITEMS } =
    groupTaskTodoList(tasks);
  return (
    <div className="relative my-10 flex h-40 items-center rounded-12 bg-background-secondary pl-24 pr-30 text-16-500">
      <div className={`absolute left-0 h-40 w-12 rounded-l-12 ${colorClass}`} />
      <Link
        href={link}
        className="z-2 flex flex-1 items-center justify-between hover:text-brand-primary hover:underline"
      >
        <span className="text-14-500">{children}</span>
        <div className="flex items-center gap-4 rounded-full bg-background-primary px-8 py-4">
          {totalItems === completedItems ? (
            <IconDoneCyan />
          ) : (
            <ProgressSign checkedItem={CHECKED_ITEMS} />
          )}
          <span className="text-14-400 text-brand-primary">
            {completedItems}&#47;{totalItems}
          </span>
        </div>
      </Link>
      <div className="absolute right-10">
        <TodoListDropDown
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      </div>
    </div>
  );
};

export default TodoListCard;
