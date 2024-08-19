import { GroupTask } from "@/types/group";
import groupTaskReport from "@/utils/group-task-report";

import CircularProgressBar from "./circular-progress-bar";
import GradientSVG from "./gradient-svg";
import TodoCount from "./todo-count";

interface ReportBoxProps {
  taskList: GroupTask[];
}

const ReportBox = ({ taskList }: ReportBoxProps) => {
  const { totalTasks, completedTasks } = groupTaskReport(taskList);
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <article className="flex flex-col gap-16">
      <GradientSVG />

      <div className="flex items-center gap-8">
        <h2 className="text-16-500">리포트</h2>
        <span className="text-14-400 text-text-default">
          오늘의 완료 상황을 확인할 수 있어요
        </span>
      </div>

      <section className="flex h-224 w-full items-center justify-between gap-20 rounded-12 bg-background-secondary p-12 md:gap-0 md:p-20 lg:h-217 lg:p-24">
        <CircularProgressBar percentage={completionPercentage} />
        <div className="flex flex-1 flex-col gap-16 md:max-w-300 lg:max-w-400">
          <TodoCount title="오늘 할 일" count={totalTasks} />
          <TodoCount title="오늘 한 일" count={completedTasks} />
        </div>
      </section>
    </article>
  );
};
export default ReportBox;
