"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

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
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks"],
      });

      const previousTasks = queryClient.getQueryData<TaskDetailData[]>([
        "tasks",
        groupId,
        taskListId,
      ]);

      queryClient.setQueriesData<TaskDetailData[]>(
        { queryKey: ["tasks"], exact: false },
        (old) => {
          if (old) {
            return old.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    doneAt: newData.done ? new Date().toISOString() : null,
                  }
                : task,
            );
          }
          return old;
        },
      );

      setIsTaskCompleted(newData.done);

      return { previousTasks };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(
        ["tasks", groupId, taskListId],
        context?.previousTasks,
      );
      setIsTaskCompleted(!newData.done);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return { editTaskMutation };
};

export default useTaskMutation;
