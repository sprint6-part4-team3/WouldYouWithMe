"use client";

import { IconDonePanel, IconToDo } from "@/public/assets/icons";

import TodoCount from "./todo-count";

const Report = () => (
  <article className="flex flex-col gap-16">
    {/* 기존 16px 너무 작은데 18px 어떤가요? */}
    <h2 className="text-18-500">리포트</h2>
    <section className="flex h-224 w-full items-center justify-between rounded-12 bg-background-secondary px-24">
      <div className="flex-1">progress</div>
      <div className="flex max-w-400 flex-1 flex-col gap-16">
        <TodoCount title="오늘 할 일" count={20} icon={<IconToDo />} />
        <TodoCount title="한 일" count={5} icon={<IconDonePanel />} />
      </div>
    </section>
  </article>
);

export default Report;
