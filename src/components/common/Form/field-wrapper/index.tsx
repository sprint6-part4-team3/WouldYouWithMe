"use client";

import { ReactNode } from "react";

import ErrorMessage from "../error-message";

interface FieldWrapperProps {
  /** input의 id 와 연결되는 label 의 htmlFor 값 입니다. */
  id: string;
  /** label입니다 */
  label: ReactNode;
  /** FormWrapper 안에 들어갈 input 입니다. */
  children: ReactNode;
  /** 에러메시지입니다. */
  errorMessage?: string;
}

const FieldWrapper = ({
  id,
  label,
  children,
  errorMessage = "",
}: FieldWrapperProps) => (
  <section className="flex flex-col gap-8">
    <label htmlFor={id} className="mb-4 text-16-500 text-text-primary">
      {label}
    </label>
    {children}
    {errorMessage && <ErrorMessage message={errorMessage} />}
  </section>
);

export default FieldWrapper;
