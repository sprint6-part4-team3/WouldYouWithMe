import getTaskDetail from "@/lib/api/task-detail/get-task-detail";

import EditTaskForm from "./_components/edit-task-form";

interface EditTaskProps {
  params: { teamId: string; listId: string; id: string };
}

const EditTask = async ({ params }: EditTaskProps) => {
  const { teamId, listId, id } = params;
  const initialData = await getTaskDetail(
    Number(teamId),
    Number(listId),
    Number(id),
  );
  return (
    <EditTaskForm
      initialName={initialData.name}
      initialDescription={initialData.description}
    />
  );
};

export default EditTask;
