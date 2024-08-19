"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";

import { TaskList } from "@/types/group";

import TaskCard from "./task-card";

interface TasksProps {
  initialTasks: TaskList[];
}

const TasksContainer = ({ initialTasks }: TasksProps) => {
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
            {initialTasks.map((task, index) => (
              <Draggable
                key={task.id.toString()}
                draggableId={task.id.toString()}
                index={index}
                disableInteractiveElementBlocking={false}
              >
                {(draggableProvided) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <TaskCard
                      id={task.id}
                      name={task.name}
                      date={task.date}
                      frequency={task.frequency}
                      initialIsCompleted={task.doneAt !== null}
                    />
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
