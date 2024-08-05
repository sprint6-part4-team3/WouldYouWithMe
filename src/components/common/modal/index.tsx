"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { IconAlert, IconX } from "@/public/assets/icons";
import { ModalProps } from "@/types/modal-drawer/index";

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      mass: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.2,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
/**
 * 모달 컴포넌트입니다.
 * 페이지 위에 오버레이와 함께 내용을 표시합니다.
 * `isOpen`,
  `onClose`,
  `title`,
  `description`,
  `showCloseButton` = `false`,
  `showWarningIcon` = `false`,
  `className`,
  `children`,
  속성이 있습니다.
 */
const Modal = ({
  onClose,
  title,
  description,
  showCloseButton = false,
  showWarningIcon = false,
  className,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const titleMarginClass = description ? "mb-8" : "mb-24";

  if (!isMounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        onClick={(e) => e.target === modalRef.current && onClose()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        className="fixed inset-0 z-50 flex size-full items-center justify-center overflow-y-auto bg-background-primary/50"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className={clsx(
            "z-51 relative w-384 rounded-8 bg-background-secondary px-48 pb-32 pt-48 shadow-lg",
            className,
          )}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-12 top-12 text-text-secondary hover:text-text-primary"
            >
              <IconX
                width={20}
                height={20}
                className="text-gray-500 transition-colors duration-200"
                transition-colors
              />
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
                  "text-center text-16-600 text-text-primary",
                  titleMarginClass,
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mb-24 text-center text-14-500 text-text-secondary">
                {description}
              </p>
            )}
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
