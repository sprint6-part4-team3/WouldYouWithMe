import clsx from "clsx";
import React, { ReactNode } from "react";

import { IconAlert, IconX } from "@/public/assets/icons";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  showCloseButton?: boolean;
  showWarningIcon?: boolean;
  className?: string;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  showCloseButton = false,
  showWarningIcon = false,
  className,
  children,
}) => {
  if (!isOpen) return null;

  const getTitleMarginClass = () => (description ? "mb-8" : "mb-24");

  return (
    <div className="fixed inset-0 flex size-full items-center justify-center overflow-y-auto bg-background-primary/50">
      <div
        className={clsx(
          "relative w-384 rounded-8 bg-background-secondary px-48 pb-32 pt-48 shadow-lg",
          className,
        )}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-12 top-12 text-text-secondary hover:text-text-primary"
          >
            <IconX width={20} height={20} />
          </button>
        )}

        <div className="flex flex-col items-center">
          {showWarningIcon && (
            <div className="mb-16">
              <IconAlert width={24} height={24} />
            </div>
          )}

          {title && (
            <h2
              className={clsx(
                "font-pretendard leading-19 text-center text-16 font-medium text-text-primary",
                getTitleMarginClass(),
              )}
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="font-pretendard leading-17 mb-24 text-center text-14 font-medium text-text-secondary">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
