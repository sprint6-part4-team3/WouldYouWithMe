"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";

import getTasks from "@/lib/api/task-lists/get-tasks";

import TaskCard from "./task-card";

interface TasksProps {
  currentTeamId: number;
  currentDate: Date;
  currentListId: number;
}

const TasksContainer = ({
  currentTeamId,
  currentDate,
  currentListId,
}: TasksProps) => {
  const stringCurrentDate = currentDate.toISOString();
  const { data: tasks } = useQuery({
    queryKey: ["tasks", currentTeamId, currentListId, stringCurrentDate],
    queryFn: () =>
      getTasks({
        groupId: currentTeamId,
        taskListId: currentListId,
        date: stringCurrentDate,
      }),
  });
  if (!tasks) throw new Error();
  if (tasks?.length === 0) {
    return (
      <article className="mb-16 flex w-full flex-col gap-10 rounded-lg bg-background-secondary px-14 py-12">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <h2>할 일을 추가해 주세요</h2>
          </div>
        </div>
      </article>
    );
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    // 로직 추가
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks" type="tasks">
        {(droppableProvided) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className="flex flex-col gap-16"
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <TaskCard key={task.id} id={task.id} date={task.date} />
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TasksContainer;
