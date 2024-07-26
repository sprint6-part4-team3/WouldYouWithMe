"use client";

import { clsx } from "clsx";
import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: string;
  colorType: "primary" | "white" | "danger" | "secondary";
}

/**
 * 
 * 커스텀 버튼 컴포넌트
 * 
 * @example
 *  <Button
      colorType="primary"
      className="h-48 w-280"
      onClick={() => {}}
      type="submit"
    >
      로그인
    </Button>

 *  <Button
      colorType="white"
      className="h-83 w-280"
      onClick={() => {}}
    >
      닫기
    </Button>

    <Button
      colorType="danger"
      className="h-83 w-280"
      onClick={() => {}}
    >
      삭제하기
    </Button>

    <Button
      colorType="secondary"
      className="h-83 w-280"
      onClick={() => {}}
    >
      닫기
    </Button>
  * @param children 버튼 안에 들어갈 글자
  * @param colorType 
  *   "primary"(primary 배경색+하얀 글자) | 
  *   "white"(하얀 배경색+primary 글자 ) | 
  *   "danger"(빨간 배경색+ 하얀 글자) | 
  *   "secondary"(하얀 배경색+ 회색 글자)
  * @param className 기본적으로 넓이, 높이, 반응형 + 커스텀 
  * @param rest onClick,type 등 버튼 속성 사용 가능
  * @author ☯️채종민
  */

const Button = ({ children, colorType, className, ...rest }: ButtonProps) => (
  <button
    type="button"
    className={clsx(
      "flex cursor-pointer items-center justify-center rounded-12 text-lg-semibold disabled:cursor-not-allowed",
      {
        "bg-brand-primary text-text-inverse hover:bg-interaction-hover disabled:bg-interaction-inactive":
          colorType === "primary",
        "bg-brand-white border-primary border text-brand-primary hover:border-interaction-hover hover:text-interaction-hover disabled:border-interaction-inactive disabled:text-interaction-inactive":
          colorType === "white",
        "bg-status-danger text-text-inverse hover:bg-[#DC2626]":
          colorType === "danger",
        "bg-brand-white border border-text-secondary text-text-secondary hover:text-[#94A3B8]":
          colorType === "secondary",
      },
      className,
    )}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
