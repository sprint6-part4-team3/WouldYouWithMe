"use client";

import { clsx } from "clsx";
import { ComponentProps, ReactNode } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  children: string;
  variant: "primary" | "white" | "danger" | "secondary" | "noFill" | "cancel";
  Icon: ReactNode;
}

/**
 * 
 * 커스텀 범용 아이콘 버튼 컴포넌트(radius:12px)
 * variant에 따라 디자인이 적용됩니다.
 * svg를 리액트 컴포넌트로 바꿔서 넣어줍니다.("@svgr/webpack")
 * 글자는 중앙정렬입니다.
 * 글자와 아이콘 사이 거리는 4px입니다.
 * 버튼 가로,세로 + 글씨 크기,굵기는 className으로 주면 됩니다.
 * 커스텀 디자인 적용을 원하는 경우에도 className으로 주면 덮어 쓸 수 있습니다.
 * button attributes 모두 사용 가능합니다.
 * @example
 * import IconPlus from "@/public/assets/icons/icon-plus.svg";
 *  <FloatButton
      Icon={<IconPlus />}
      variant="primary"
      className="h-83 w-280 text-15"
    >
      추가하기
    </FloatButton>
  * @param children 버튼 안에 들어갈 글자
  * @param variant 
  *   "primary"(primary 배경색+하얀 글자) | 
  *   "white"(하얀 배경색+primary 글자 ) | 
  *   "danger"(빨간 배경색+ 하얀 글자) | 
  *   "secondary"(하얀 배경색+ 회색 글자)
  *   "noFill"(투명배경+primary 글자)
  *   "cancel"(회원탈퇴)
  * @param className 기본적으로 넓이, 높이, 반응형 + 커스텀 
  * @param rest onClick,type 등 버튼 속성 사용 가능
  * @author ☯️채종민
  */

const FloatButton = ({
  children,
  variant,
  className,
  Icon,
  ...rest
}: IconButtonProps) => (
  <button
    type="button"
    className={clsx(
      "flex cursor-pointer items-center justify-center gap-4 rounded-12 duration-100 hover:scale-[1.005] active:scale-[0.995] disabled:scale-100 disabled:cursor-not-allowed",
      {
        "bg-brand-primary text-text-inverse hover:bg-interaction-hover disabled:bg-interaction-inactive":
          variant === "primary",
        "hover:text-interaction-hover border border-brand-primary bg-white text-brand-primary hover:border-interaction-hover hover:bg-[#F5F5F5] disabled:border-interaction-inactive disabled:text-interaction-inactive":
          variant === "white",
        "bg-status-danger text-text-inverse hover:bg-[#b91c1c]":
          variant === "danger",
        "border border-text-secondary bg-white text-text-secondary hover:text-[#94A3B8]":
          variant === "secondary",
        "border bg-transparent text-brand-primary border-primary hover:border-interaction-hover hover:text-interaction-hover disabled:border-interaction-inactive disabled:text-interaction-inactive":
          variant === "noFill",
        "border border-transparent bg-transparent text-text-danger border-primary text-16-500":
          variant === "cancel",
      },
      className,
    )}
    {...rest}
  >
    {Icon}
    <span>{children}</span>
  </button>
);

export default FloatButton;
