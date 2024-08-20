"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clsx } from "clsx";
import dayjs from "dayjs";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { DropDown } from "@/components/common";
import { FREQUENCY_LABELS } from "@/constants/frequency";
import { useTaskMutation, useTaskParams, useToggle } from "@/hooks";
import getTasks from "@/lib/api/task-lists/get-tasks";
import {
  IconCalendar,
  IconCheckBox,
  IconCheckBoxPrimary,
  IconKebab,
  IconRepeat,
} from "@/public/assets/icons";
import { TaskDetailData } from "@/types/task-detail/index";

import EditTaskModal from "./edit-task-modal";

dayjs.locale("ko");

interface TaskCardProps {
  id: number;
  date: string;
}

const TaskCard = ({ id, date }: TaskCardProps) => {
  const { groupId: currentGroupId, taskListId: currentListId } =
    useTaskParams();
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery({
    queryKey: ["tasks", currentGroupId, currentListId, date],
    queryFn: () =>
      getTasks({
        groupId: currentGroupId,
        taskListId: currentListId,
        date,
      }),
  });

  const task = tasks?.find((taskItems) => taskItems.id === id);

  const [isCompleted, setIsCompleted] = useState<boolean>(
    task?.doneAt !== null,
  );

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (task) {
      setIsCompleted(task.doneAt !== null);
    }
  }, [task]);

  const {
    value: isDropdownOpen,
    handleOff: closeDropdown,
    handleToggle: toggleDropdown,
  } = useToggle();

  const { editTaskMutation } = useTaskMutation(
    currentGroupId,
    currentListId,
    id,
    setIsCompleted,
  );

  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const closeEditTask = useCallback(() => {
    setIsEditTaskOpen(false);
  }, []);

  const taskDate = dayjs(date);
  const formattedDate = taskDate.format("YYYY년 M월 D일");

  const handleEditClick = () => {
    closeDropdown();
    setIsEditTaskOpen(true);
  };

  const handleDeleteClick = () => {
    closeDropdown();
  };

  const handleToggleComplete = () => {
    if (task) {
      const newCompletedState = !isCompleted;
      setIsCompleted(newCompletedState);
      queryClient.setQueryData<TaskDetailData[]>(
        ["tasks", currentGroupId, currentListId, date],
        (oldData) => {
          if (oldData) {
            return oldData.map((taskItem: TaskDetailData) =>
              taskItem.id === id
                ? {
                    ...taskItem,
                    doneAt: newCompletedState ? new Date().toISOString() : null,
                  }
                : taskItem,
            );
          }
          return oldData;
        },
      );

      editTaskMutation.mutate({ done: newCompletedState });
    }
  };

  if (!task) return null;

  const renderCheckboxIcon = () => {
    if (isCompleted) {
      return <IconCheckBoxPrimary />;
    }
    return isHovered ? <IconCheckBoxPrimary /> : <IconCheckBox />;
  };

  return (
    <article className="flex w-full flex-col gap-10 rounded-lg bg-background-secondary px-14 py-12">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleToggleComplete}
            className="mr-8 transition-transform duration-200 ease-in-out hover:scale-110"
            disabled={editTaskMutation.isPending}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {renderCheckboxIcon()}
          </button>
          <Link
            href={`/team/${currentGroupId}/task-lists/${currentListId}/task-detail/${id}?date=${date}`}
          >
            <h2
              className={clsx(
                `text-14-400 text-text-primary hover:text-brand-primary`,
                {
                  "line-through": isCompleted,
                },
              )}
            >
              {task.name}
            </h2>
          </Link>
        </div>
        <DropDown handleClose={closeDropdown}>
          <DropDown.Trigger onClick={toggleDropdown}>
            <IconKebab />
          </DropDown.Trigger>
          <DropDown.Menu isOpen={isDropdownOpen}>
            <DropDown.Item onClick={handleEditClick}>수정하기</DropDown.Item>
            <DropDown.Item onClick={handleDeleteClick}>삭제하기</DropDown.Item>
          </DropDown.Menu>
        </DropDown>
      </div>
      <div className="flex items-center text-12-400 text-text-default">
        <IconCalendar
          width={16}
          height={16}
          className="flex content-center items-center"
        />
        <time className="ml-6 mr-10 flex items-center">{formattedDate}</time>
        <span>|</span>
        <IconRepeat
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <span className="ml-6 flex items-center">
          {FREQUENCY_LABELS[task.frequency]}
        </span>
      </div>
      {isEditTaskOpen && (
        <EditTaskModal id={id} name={task.name} closeEditTask={closeEditTask} />
      )}
    </article>
  );
};

export default TaskCard;
