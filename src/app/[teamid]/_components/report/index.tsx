import CircularProgressBar from "./circular-progress-bar";
import GradientSVG from "./gradient-svg";
import TodoCount from "./todo-count";

const PERCENTAGE = 32;

const ReportBox = () => (
  <article className="flex flex-col gap-16">
    <GradientSVG />

    <h2 className="text-16-500">리포트</h2>

    <section className="flex h-224 w-full items-center justify-between gap-24 rounded-12 bg-background-secondary p-20 md:gap-0 md:p-24 lg:h-217">
      <CircularProgressBar percentage={PERCENTAGE} />
      <div className="flex flex-1 flex-col gap-16 md:max-w-300 lg:max-w-400">
        <TodoCount title="오늘 할 일" count={20} />
        <TodoCount title="한 일" count={5} />
      </div>
    </section>
  </article>
);
export default ReportBox;
