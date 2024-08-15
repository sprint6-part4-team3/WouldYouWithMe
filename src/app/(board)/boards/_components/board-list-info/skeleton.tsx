"use client";

const SkeletonLoader = ({ className }: { className: string }) => (
  <div className={`${className} animate-pulse bg-text-default`} />
);

const BoardCardSkeleton = () => (
  <article className="group flex h-250 flex-col gap-12 rounded-2xl border border-text-disabled bg-background-secondary">
    <div className="relative h-150 w-full">
      <SkeletonLoader className="size-full rounded-se-2xl rounded-ss-2xl border-b border-text-disabled" />
    </div>
    <div className="flex flex-col gap-10 px-12">
      <SkeletonLoader className="h-14 w-1/3 rounded-lg" />
      <SkeletonLoader className="h-24 w-3/4 rounded-lg" />
      <SkeletonLoader className="h-17 w-1/5 rounded-lg" />
    </div>
  </article>
);

export default BoardCardSkeleton;
