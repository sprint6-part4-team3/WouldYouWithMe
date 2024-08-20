import { Button, SkeletonLoader } from "@/components/common";

const EditSkeleton = () => (
  <div className="my-24 flex w-full flex-col gap-24">
    <section className="flex flex-col gap-8">
      <span className="mb-4 w-fit text-16-500 text-text-primary">
        팀 프로필
      </span>
      <SkeletonLoader className="size-66 rounded-full" />
    </section>
    <section className="flex flex-col gap-8">
      <span className="mb-4 w-fit text-16-500 text-text-primary">팀 이름</span>
      <SkeletonLoader className="h-50 w-full rounded-xl" />
    </section>
    <Button
      type="button"
      variant="noFill"
      disabled
      className="mt-16 h-47 w-full"
    >
      팀 정보 가져오는 중...
    </Button>
  </div>
);

export default EditSkeleton;
