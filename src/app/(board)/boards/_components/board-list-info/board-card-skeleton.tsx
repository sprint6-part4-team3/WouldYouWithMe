"use client";

import { SkeletonLoader } from "@/components/common";

const BoardCardSkeleton = () => (
  <>
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-20">
      {Array.from({ length: 6 }, (_, index) => (
        <article
          key={index}
          className="group flex h-250 flex-col gap-12 rounded-2xl border border-text-disabled bg-background-secondary"
        >
          <div className="relative h-150 w-full">
            <SkeletonLoader className="size-full rounded-se-2xl rounded-ss-2xl border-b border-text-disabled" />
          </div>
          <div className="flex flex-col gap-10 px-12">
            <SkeletonLoader className="h-14 w-1/3 rounded-lg" />
            <SkeletonLoader className="h-24 w-3/4 rounded-lg" />
            <SkeletonLoader className="h-17 w-1/5 rounded-lg" />
          </div>
        </article>
      ))}
    </div>
    <div className="mb-174 flex items-center justify-center lg:mb-40">
      <SkeletonLoader className="my-20 h-30 w-300 rounded-full md:h-40" />
    </div>
  </>
);

export default BoardCardSkeleton;
