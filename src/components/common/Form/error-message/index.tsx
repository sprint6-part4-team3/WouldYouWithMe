"use client";

interface ErrorMessageProps {
  /** 에러메시지 입니다. */
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <span className="text-14-500 text-status-danger">{message}</span>
);

export default ErrorMessage;
