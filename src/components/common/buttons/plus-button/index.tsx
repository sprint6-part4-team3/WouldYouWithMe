import { ComponentProps } from "react";

import PlusIcon from "@/public/assets/icons/icon-plus.svg";

import IconButton from "../icon-button";

interface PlusButtonProps extends ComponentProps<"button"> {
  children: string;
}

/**
 *
 * 완성된 + 아이콘 브랜드 버튼입니다.
 * 버튼 글자만 children으로 주어서 사용하면 됩니다.
 * button attributes 모두 사용 가능합니다.
 * @example
 *  <PlusButton onClick={() => {console.log("click");}} disabled>할 일 추가</PlusButton>
 * @param children 버튼 안에 들어갈 글자
 * @param rest onClick,type 등 버튼 속성 사용 가능
 * @author ☯️채종민
 */

const PlusButton = ({ children, ...rest }: PlusButtonProps) => (
  <IconButton
    Icon={<PlusIcon />}
    variant="primary"
    className="px-21 py-[14.5px] text-16 font-[600] leading-[19px]"
    {...rest}
  >
    {children}
  </IconButton>
);

export default PlusButton;
