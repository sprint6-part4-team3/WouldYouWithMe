import React from "react";

import { SkeletonLoader } from "@/components/common";

const TasksSkeleton = () => (
  <section className="mb-16 flex flex-col gap-16">
    {Array.from({ length: 4 }, (_, index) => (
      <article key={index}>
        <SkeletonLoader className="flex h-74 w-full flex-col gap-10 rounded-lg bg-background-secondary" />
      </article>
    ))}
  </section>
);

export default TasksSkeleton;
