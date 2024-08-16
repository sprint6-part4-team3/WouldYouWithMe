import Image from "next/image";

import { IconDonePanel, IconToDo } from "@/public/assets/icons";

interface TodoCountProps {
  title: string;
  count: number;
}

const TodoCount = ({ title, count }: TodoCountProps) => (
  <div className="flex h-80 items-center justify-between rounded-12 bg-background-tertiary p-16">
    <div className="flex flex-col gap-4">
      <span className="text-12-500 text-text-secondary">{title}</span>
      <span className="text-24-700 text-brand-tertiary">{count}개</span>
    </div>
    <Image
      width={40}
      height={40}
      alt="아이콘"
      draggable="false"
      src={
        title === "오늘 할 일"
          ? "/assets/images/img-rocket.png"
          : "/assets/images/img-star.png"
      }
    />
  </div>
);

export default TodoCount;
