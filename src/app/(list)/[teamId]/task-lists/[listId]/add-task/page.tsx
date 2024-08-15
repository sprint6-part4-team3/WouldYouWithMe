import { redirect } from "next/navigation";

interface TaskListProps {
  params: { teamId: string; listId: string };
  searchParams: { date: string };
}

const AddTask = ({ params, searchParams }: TaskListProps) =>
  redirect(
    `/${params.teamId}/task-lists/${params.listId}?date=${searchParams.date}`,
  );
export default AddTask;
