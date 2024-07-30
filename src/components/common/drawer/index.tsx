"use client";

import clsx from "clsx";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { IconAlert, IconX } from "@/public/assets/icons";
import { DrawerProps } from "@/types/modal-drawer/index";

const drawerVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
    },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

/**
 * Drawer 컴포넌트입니다.
 * 페이지 위에 오버레이와 함께 내용을 표시합니다.
 * 터치로 위 또는 아래로 드래그하여 닫을 수 있습니다.
 */
const Drawer = ({
  isOpen,
  onClose,
  title,
  description,
  showCloseButton = false,
  showWarningIcon = false,
  className,
  children,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [drawerHeight, setDrawerHeight] = useState<number | null>(null);

  const titleMarginClass = description ? "mb-8" : "mb-24";

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = drawerHeight ? drawerHeight / 4 : 200; // 드로어 높이의 1/4 또는 기본값 200px

    if (info.velocity.y > 20 || info.offset.y > threshold) {
      // 아래로 빠르게 스와이프하거나 충분히 아래로 드래그
      onClose();
    } else if (info.velocity.y < -20 || info.offset.y < -threshold) {
      // 위로 빠르게 스와이프하거나 충분히 위로 드래그
      onClose();
    }
  };

  useEffect(() => {
    if (drawerRef.current) {
      setDrawerHeight(drawerRef.current.offsetHeight);
    }
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={drawerRef}
          className="fixed inset-0 z-50 flex items-end justify-center bg-background-primary/50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.target === drawerRef.current && onClose()}
        >
          <motion.div
            ref={drawerRef}
            className={clsx(
              "z-51 w-full rounded-t-16 bg-background-secondary px-24 pb-32 pt-16 shadow-lg",
              className,
            )}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{ touchAction: "none" }}
          >
            <div className="mb-16 flex justify-center">
              <div className="h-4 w-32 rounded-full bg-gray-300" />
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="absolute right-16 top-16 text-text-secondary hover:text-text-primary"
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
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default Drawer;
