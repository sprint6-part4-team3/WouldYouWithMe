import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import getTasks from "@/lib/api/task-lists/get-tasks";

import TasksContainer from "./tasks-container";

interface CurrentTaskProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}
const TaskCurrent = async ({
  currentTeamId,
  currentDate,
  currentListId,
}: CurrentTaskProps) => {
  const queryClient = new QueryClient();
  const stringCurrentDate = currentDate.toISOString();

  await queryClient.prefetchQuery({
    queryKey: ["tasks", currentTeamId, currentListId, stringCurrentDate],
    queryFn: () =>
      getTasks({
        groupId: currentTeamId,
        taskListId: currentListId,
        date: stringCurrentDate,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TasksContainer
        currentTeamId={currentTeamId}
        currentDate={currentDate}
        currentListId={currentListId}
      />
    </HydrationBoundary>
  );
};

export default TaskCurrent;
