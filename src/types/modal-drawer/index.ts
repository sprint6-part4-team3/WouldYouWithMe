import { ReactNode } from "react";

export interface CommonProps {
  /**
   * `오버레이(Drawer 또는 Modal)의 열림/닫힘 상태를 제어합니다.`
   */
  isOpen: boolean;

  /**
   * `오버레이가 닫힐 때 호출되는 함수입니다.`
   */
  onClose: () => void;

  /**
   * `오버레이의 제목을 설정합니다.`
   */
  title: string;

  /**
   * `오버레이의 설명 텍스트를 설정합니다.`
   */
  description?: string;

  /**
   * `오버레이 닫기 버튼의 표시 여부를 설정합니다.`
   */
  showCloseButton?: boolean;

  /**
   * `경고 아이콘의 표시 여부를 설정합니다.`
   */
  showWarningIcon?: boolean;

  /**
   * `오버레이에 추가적인 CSS 클래스를 적용합니다.`
   */
  className?: string;

  /**
   * `오버레이 내부에 표시될 자식 컴포넌트들입니다.`
   */
  children?: ReactNode;
}

export interface DrawerProps extends CommonProps {
  // Drawer에 추가 props가 있다면 여기에 정의
}

export interface ModalProps extends CommonProps {
  // Modal에 추가 props가 있다면 여기에 정의
}
