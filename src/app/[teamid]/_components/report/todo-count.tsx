import React, { ReactNode } from "react";

interface TodoCountProps {
  title: string;
  count: number;
  icon: ReactNode;
}

const TodoCount = ({ title, count, icon }: TodoCountProps) => (
  <div className="flex h-80 items-center justify-between rounded-12 bg-background-tertiary p-16">
    <div className="flex flex-col gap-4">
      <span className="text-12-500 text-text-secondary">{title}</span>
      <span className="text-24-700 text-brand-tertiary">{count}개</span>
    </div>
    {icon}
  </div>
);

export default TodoCount;
