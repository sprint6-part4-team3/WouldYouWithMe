/* eslint-disable no-console */

"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IconButton } from "@/components/common";

interface CommentFormInputs {
  content: string;
}

interface CommentInputProps {
  onAddComment: (content: string) => Promise<void>;
  taskId: number;
}

const MAX_COMMENT_LENGTH = 199;
const STORAGE_KEY_PREFIX = "comment_draft_";

const CommentInput = ({ onAddComment, taskId }: CommentInputProps) => {
  const storageKey = `${STORAGE_KEY_PREFIX}${taskId}`;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<CommentFormInputs>();

  const contentValue = watch("content");
  const [charCount, setCharCount] = useState(0);
  const [isExceeded, setIsExceeded] = useState(false);

  useEffect(() => {
    const savedComment = localStorage.getItem(storageKey);
    if (savedComment) {
      setValue("content", savedComment);
    }
  }, [taskId, setValue, storageKey]);

  useEffect(() => {
    if (contentValue) {
      localStorage.setItem(storageKey, contentValue);
    }
  }, [contentValue, storageKey]);

  useEffect(() => {
    const newCount = contentValue ? contentValue.length : 0;
    setCharCount(newCount);
    setIsExceeded(newCount > MAX_COMMENT_LENGTH);
  }, [contentValue]);

  const isContentEmpty = !contentValue || contentValue.trim() === "";

  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    if (isExceeded) return;
    try {
      const { content } = data;
      reset();
      await onAddComment(content);
      // Remove the draft from local storage after successful submission
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative border-y-[0.2px] border-text-disabled"
      >
        <div className="relative pr-40">
          <textarea
            placeholder="댓글을 달아주세요"
            className="min-h-49 w-full resize-none overflow-hidden !border-0 bg-background-secondary p-13 placeholder:text-gray-400 focus:!outline-none"
            {...register("content", {
              required: true,
              validate: (value) => value.trim() !== "",
              maxLength: MAX_COMMENT_LENGTH,
            })}
            disabled={isSubmitting}
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-end gap-7">
            <IconButton
              type="submit"
              icon="IconComment"
              variant={isContentEmpty || isExceeded ? "darkest" : "green"}
              className="mb-1 text-gray-400 hover:text-white"
              disabled={isContentEmpty || isSubmitting || isExceeded}
            />
            <span className="text-10-400 mt-5 text-text-secondary">
              {charCount}/{MAX_COMMENT_LENGTH}
            </span>
          </div>
        </div>
      </form>
      {isExceeded && (
        <p className="mt-15 text-14-400 text-red-500">
          댓글 글자수는 200글자를 넘을 수 없습니다.
        </p>
      )}
    </div>
  );
};

export default CommentInput;
