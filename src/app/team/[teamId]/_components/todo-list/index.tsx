"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { AddListModalButton } from "@/components/common";
import { GroupTask } from "@/types/group";

import DragAndDrop from "./drag-and-drop";

interface TodoLostBoxProps {
  taskList: GroupTask[];
  teamId: number;
}

const TodoListBox = ({ taskList, teamId }: TodoLostBoxProps) => {
  const [todoListIndex, setTodoListIndex] = useState(taskList);
  const queryClient = useQueryClient();
  const taskListsNav = todoListIndex.map(({ id, name }) => ({
    id,
    name,
  }));

  useEffect(() => {
    sessionStorage.setItem(
      `task-lists-${teamId}`,
      JSON.stringify(taskListsNav),
    );
    queryClient.setQueryData(["task-lists", teamId], taskListsNav);
  }, [todoListIndex]);

  const handleAddTask = (newTask: GroupTask) => {
    setTodoListIndex((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEditTask = (updatedTask: GroupTask) => {
    setTodoListIndex((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const handleDeleteTask = (taskToDelete: GroupTask) => {
    setTodoListIndex((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id),
    );
  };

  return (
    <article className="m-auto w-full">
      <div className="flex justify-between">
        <div className="flex h-21 items-center gap-8">
          <h3 className="text-16-500">할 일 목록</h3>
          <span className="text-16-400 text-text-default">
            ({todoListIndex.length}개)
          </span>
        </div>
        <AddListModalButton groupId={teamId} onAddTask={handleAddTask} />
      </div>
      <section>
        {todoListIndex.length === 0 ? (
          <div className="py-64 text-center text-14-500 text-text-default">
            아직 할 일 목록이 없습니다.
          </div>
        ) : (
          <DragAndDrop
            todoListIndex={todoListIndex}
            teamId={teamId}
            handleEditTask={handleEditTask}
            handleDeleteTask={handleDeleteTask}
            setTodoListIndex={setTodoListIndex}
          />
        )}
      </section>
    </article>
  );
};

export default TodoListBox;
