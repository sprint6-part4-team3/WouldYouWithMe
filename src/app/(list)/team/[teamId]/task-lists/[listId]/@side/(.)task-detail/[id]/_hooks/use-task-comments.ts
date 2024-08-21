"use client";

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
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [optimisticComment, setOptimisticComment] = useState<Comment | null>(
    null,
  );
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [optimisticEditComment, setOptimisticEditComment] =
    useState<Comment | null>(null);

  const queryClient = useQueryClient();

  const updateCommentsCache = (updatedComments: Comment[]) => {
    queryClient.setQueryData(["comments", taskId], updatedComments);
  };

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => createComment(taskId, content),
    onSuccess: (newComment) => {
      const commentWithUser = {
        ...newComment,
        user: {
          id: currentUser.id,
          nickname: currentUser.nickname,
          image: currentUser.image,
        },
      };
      const updatedComments = [commentWithUser, ...comments];
      setComments(updatedComments);
      setOptimisticComment(null);
      updateCommentsCache(updatedComments);
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
      const updatedComments = comments.map((comment) =>
        comment.id === variables.commentId
          ? { ...comment, content: variables.content }
          : comment,
      );
      setComments(updatedComments);
      updateCommentsCache(updatedComments);
      setEditingCommentId(null);
      setOptimisticEditComment(null);
    },
    onError: () => {
      setOptimisticEditComment(null);
    },
  });

  const handleAddComment = async (content: string): Promise<void> => {
    const now = new Date().toISOString();
    const tempComment: Comment = {
      id: Date.now(),
      content,
      createdAt: now,
      taskId,
      updatedAt: now,
      user: {
        id: currentUser.id,
        nickname: currentUser.nickname,
        image: currentUser.image,
      },
    };
    setOptimisticComment(tempComment);
    await addCommentMutation.mutateAsync(content);
  };

  const handleDeleteComment = (deletedCommentId: number) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== deletedCommentId,
    );
    setComments(updatedComments);
    updateCommentsCache(updatedComments);
  };

  const handleEditComment = async (commentId: number, newContent: string) => {
    setEditingCommentId(commentId);
    await editCommentMutation.mutateAsync({ commentId, content: newContent });
  };

  return {
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
