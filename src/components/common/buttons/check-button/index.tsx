import { clsx } from "clsx";
import { ComponentProps } from "react";

import CheckIcon from "@/public/assets/icons/icon-check-current.svg";
import CheckIconWhite from "@/public/assets/icons/icon-check-white.svg";

import IconButton from "../icon-button";

interface CheckButtonProps extends ComponentProps<"button"> {
  children: string;
  colorType: "primary" | "white";
}

/**
 * 
 * 완성된 체크 아이콘 브랜드 버튼입니다.
 * 버튼 글자만 children으로 주어서 사용하면 됩니다.
 * colorType에 따라 디자인이 적용됩니다.
 * button attributes 모두 사용 가능합니다.
 * @example
 *  <CheckButton colorType="primary" onClick={() => {}}>
        완료하기
    </CheckButton>

    <CheckButton colorType="primary" onClick={() => {}}>
        완료 취소하기
    </CheckButton>
  * @param children 버튼 안에 들어갈 글자
  * @param colorType 
  *   "primary"(primary 배경색+하얀 글자) | 
  *   "white"(하얀 배경색+primary 글자 ) | 
  * @param rest onClick,type 등 버튼 속성 사용 가능
  * @author ☯️채종민
  */

const CheckButton = ({
  children,
  colorType,
  disabled,
  ...rest
}: CheckButtonProps) => (
  <IconButton
    Icon={
      colorType === "primary" ? (
        <CheckIconWhite />
      ) : (
        <CheckIcon stroke={disabled ? "#94A3B8" : "#10B981"} />
      )
    }
    colorType={colorType}
    className={clsx("text-14 font-[600] leading-[17px]", {
      "px-21 py-[11.5px]": colorType === "primary",
      "px-20 py-[10.5px]": colorType === "white",
    })}
    disabled={disabled}
    {...rest}
  >
    {children}
  </IconButton>
);

export default CheckButton;
