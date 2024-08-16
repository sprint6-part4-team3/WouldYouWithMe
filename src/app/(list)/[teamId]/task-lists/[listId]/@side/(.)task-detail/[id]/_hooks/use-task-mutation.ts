import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import editTaskDetail from "@/lib/api/task-detail/edit-task-detail";
import { TaskDetailData, TaskEditData } from "@/types/task-detail/index";

const useTaskMutation = (
  groupId: number,
  taskListId: number,
  taskId: number,
  setIsTaskCompleted: (done: boolean) => void,
) => {
  const queryClient = useQueryClient();

  const editTaskMutation = useMutation({
    mutationFn: (data: TaskEditData) =>
      editTaskDetail(groupId, taskListId, taskId, data),
    onSuccess: (data, variables) => {
      setIsTaskCompleted(variables.done);
      queryClient.setQueryData<TaskDetailData>(["task", taskId], (old) => ({
        ...old!,
        ...variables,
        doneAt: variables.done ? new Date().toISOString() : null,
      }));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  return { editTaskMutation };
};

export default useTaskMutation;
