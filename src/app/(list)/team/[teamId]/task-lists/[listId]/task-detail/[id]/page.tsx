import { redirect } from "next/navigation";

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const TaskDetail = ({ params, searchParams }: TaskListProps) =>
  redirect(
    `/team/${params.teamId}/task-lists/${params.listId}?date=${searchParams.date}`,
  );
export default TaskDetail;
