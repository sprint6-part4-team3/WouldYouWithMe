import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/common/buttons/button/index";

interface CommentEditInputProps {
  initialContent: string;
  onSave: (content: string) => void;
  onCancel: () => void;
  isPending: boolean;
}

const CommentEditInput = ({
  initialContent,
  onSave,
  onCancel,
  isPending,
}: CommentEditInputProps) => {
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: { content: initialContent },
  });

  useEffect(() => {
    setFocus("content");
  }, [setFocus]);

  const onSubmit = (data: { content: string }) => {
    if (data.content.trim()) {
      onSave(data.content);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
      <textarea
        {...register("content")}
        className="w-full resize-none bg-background-secondary text-14-400 focus:outline-none "
        rows={3}
        disabled={isPending}
      />
      <div className="mb-10 flex justify-end space-x-8 ">
        <Button
          variant="noFill"
          className="h-32 w-48 !border-none !p-0 text-text-primary hover:bg-transparent"
          onClick={onCancel}
          type="button"
          disabled={isPending}
        >
          취소
        </Button>
        <Button
          variant="noFill"
          className="h-32 w-74"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "수정 중..." : "수정하기"}
        </Button>
      </div>
    </form>
  );
};

export default CommentEditInput;
