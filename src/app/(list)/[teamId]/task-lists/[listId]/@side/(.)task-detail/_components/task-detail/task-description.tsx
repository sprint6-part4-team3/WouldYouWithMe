import React from "react";

import { CheckButton } from "@/components/common";

interface TaskDescriptionProps {
  description: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const TaskDescription = ({
  description,
  isCompleted,
  onToggleComplete,
}: TaskDescriptionProps) => (
  <article className="overflow-wrap-anywhere min-h-200 whitespace-normal break-words text-14-400">
    {description}
    <div className="mt-150 flex justify-end">
      <CheckButton
        variant={isCompleted ? "white" : "primary"}
        onClick={onToggleComplete}
      >
        {isCompleted ? "완료취소하기" : "완료하기"}
      </CheckButton>
    </div>
  </article>
);

export default TaskDescription;
