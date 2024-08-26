/* eslint-disable no-console */

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { IconButton } from "@/components/common";

interface CommentFormInputs {
  content: string;
}

interface CommentInputProps {
  onAddComment: (content: string) => Promise<void>;
  taskId: string;
}

const MAX_COMMENT_LENGTH = 200;
const STORAGE_KEY_PREFIX = "comment_draft_";

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const CommentInput = ({ onAddComment, taskId }: CommentInputProps) => {
  const storageKey = `${STORAGE_KEY_PREFIX}${taskId}`;
  const charCountRef = useRef<HTMLSpanElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<CommentFormInputs>();

  const contentValue = watch("content");
  const debouncedContent = useDebounce(contentValue || "", 500);

  const isMaxLength = contentValue
    ? contentValue.length >= MAX_COMMENT_LENGTH
    : false;

  useEffect(() => {
    const savedComment = localStorage.getItem(storageKey);
    if (savedComment) {
      setValue("content", savedComment);
    }
  }, [storageKey, setValue]);

  useEffect(() => {
    if (debouncedContent.trim() !== "") {
      localStorage.setItem(storageKey, debouncedContent);
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [debouncedContent, storageKey]);

  const updateCharCount = useCallback((value: string) => {
    const newCount = value.length;
    if (charCountRef.current) {
      charCountRef.current.textContent = `${newCount}/${MAX_COMMENT_LENGTH - 1}`;
    }
  }, []);

  useEffect(() => {
    updateCharCount(contentValue || "");
  }, [contentValue, updateCharCount]);

  const isContentEmpty = !contentValue || contentValue.trim() === "";

  const onSubmit: SubmitHandler<CommentFormInputs> = useCallback(
    async (data) => {
      try {
        const { content } = data;
        await onAddComment(content);
        reset();
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    },
    [onAddComment, reset, storageKey],
  );

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
              maxLength: MAX_COMMENT_LENGTH,
              onChange: (e) => updateCharCount(e.target.value),
            })}
            maxLength={MAX_COMMENT_LENGTH}
            disabled={isSubmitting}
          />
          <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-end gap-7">
            <IconButton
              type="submit"
              icon="IconComment"
              variant={isContentEmpty || isMaxLength ? "darkest" : "green"}
              className="mb-1 text-gray-400 hover:text-white"
              disabled={isContentEmpty || isSubmitting || isMaxLength}
            />
            <span
              ref={charCountRef}
              className="text-10-400 mt-5 text-text-secondary"
            >
              0/{MAX_COMMENT_LENGTH}
            </span>
          </div>
        </div>
      </form>
      {isMaxLength && (
        <p className="mt-15 text-14-400 text-red-500">
          댓글은 199자까지만 입력할 수 있습니다.
        </p>
      )}
    </div>
  );
};

export default CommentInput;
