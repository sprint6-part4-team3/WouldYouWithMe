"use client";

import { useParams } from "next/navigation";

const useTaskParams = () => {
  const params = useParams();
  return {
    groupId: Number(params.teamId),
    taskListId: Number(params.listId),
    taskId: Number(params.id),
  };
};

export default useTaskParams;
