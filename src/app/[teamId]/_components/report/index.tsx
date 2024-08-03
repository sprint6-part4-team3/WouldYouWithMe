import { GroupTask } from "@/types/group";
import groupTaskReport from "@/utils/group-task-report";

import CircularProgressBar from "./circular-progress-bar";
import GradientSVG from "./gradient-svg";
import TodoCount from "./todo-count";

interface ReportBoxProps {
  taskList: GroupTask[];
}

const ReportBox = ({ taskList }: ReportBoxProps) => {
  // taskList 가 빈배열이면 다 0이 됨
  const { totalTasks, completedTasks } = groupTaskReport(taskList);
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <article className="flex flex-col gap-16">
      <GradientSVG />

      <h2 className="text-16-500">리포트</h2>

      <section className="flex h-224 w-full items-center justify-between gap-24 rounded-12 bg-background-secondary p-20 md:gap-0 md:p-24 lg:h-217">
        <CircularProgressBar percentage={completionPercentage} />
        <div className="flex flex-1 flex-col gap-16 md:max-w-300 lg:max-w-400">
          <TodoCount title="오늘 할 일" count={totalTasks} />
          <TodoCount title="한 일" count={completedTasks} />
        </div>
      </section>
    </article>
  );
};
export default ReportBox;
