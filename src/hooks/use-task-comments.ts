import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import editComment from "@/lib/api/task-comments/edit-comments";
import createComment from "@/lib/api/task-comments/post-comment";
import { Comment } from "@/types/comments/index";

const useComments = (
  taskId: number,
  initialComments: Comment[],
  currentUser: { id: number; nickname: string; image: string | null },
) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [optimisticComment, setOptimisticComment] = useState<Comment | null>(
    null,
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [optimisticEditComment, setOptimisticEditComment] =
    useState<Comment | null>(null);

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(taskId, content),
    onSuccess: (newComment) => {
      const commentWithUser = {
        ...newComment,
        user: {
          nickname: currentUser.nickname,
          image: currentUser.image,
        },
      };
      setComments((prevComments) => [commentWithUser, ...prevComments]);
      setOptimisticComment(null);
      queryClient.setQueryData(
        ["comments", taskId],
        (oldData: Comment[] | undefined) =>
          oldData ? [commentWithUser, ...oldData] : [commentWithUser],
      );
    },
    onError: () => {
      setOptimisticComment(null);
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => editComment(taskId, commentId, content),
    onMutate: (variables) => {
      const updatedComment = comments.find((c) => c.id === variables.commentId);
      if (updatedComment) {
        setOptimisticEditComment({
          ...updatedComment,
          content: variables.content,
        });
      }
    },
    onSuccess: (_, variables) => {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === variables.commentId
            ? { ...comment, content: variables.content }
            : comment,
        ),
      );
      queryClient.setQueryData(
        ["comments", taskId],
        (oldData: Comment[] | undefined) =>
          oldData
            ? oldData.map((comment) =>
                comment.id === variables.commentId
                  ? { ...comment, content: variables.content }
                  : comment,
              )
            : [],
      );
      setEditingCommentId(null);
      setOptimisticEditComment(null);
    },
    onError: () => {
      setOptimisticEditComment(null);
    },
  });

  const handleAddComment = async (content: string): Promise<void> => {
    const now = new Date().toISOString();
    const tempComment = {
      id: Date.now(),
      taskId,
      content,
      createdAt: now,
      updatedAt: now,
      userId: currentUser.id,
      user: {
        nickname: currentUser.nickname,
        image: currentUser.image,
      },
    };
    setOptimisticComment(tempComment);
    await addCommentMutation.mutateAsync(content);
  };

  const handleDeleteComment = (deletedCommentId: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId),
    );
    queryClient.setQueryData(
      ["comments", taskId],
      (oldData: Comment[] | undefined) =>
        oldData
          ? oldData.filter((comment) => comment.id !== deletedCommentId)
          : [],
    );
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    setEditingCommentId(commentId);
    await editCommentMutation.mutateAsync({ commentId, content: newContent });
  };

  return {
    isCompleted,
    setIsCompleted,
    comments,
    optimisticComment,
    editingCommentId,
    optimisticEditComment,
    handleAddComment,
    handleDeleteComment,
    handleEditComment,
    addCommentMutation,
    editCommentMutation,
  };
};

export default useComments;
