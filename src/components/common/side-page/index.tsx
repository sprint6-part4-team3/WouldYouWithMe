"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

import IconButton from "../icon-button";

interface SidePageProp {
  children: React.ReactNode;
}

/**
 * 사이드에 뜨는 페이지 컨테이너입니다.
 * 모바일은 화면을 꽉채웁니다.
 * X 버튼은 누르면 뒤로가기 됩니다.
 * 목록 만들기 모달 띄우는 버튼입니다.
 * @example
 *  <SidePage><AddTaskForm/></SidePage>
 * @author ☯️채종민
 */

const SidePage = ({ children }: SidePageProp) => {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleXButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsClosing(true);
  };

  const handleClose = () => {
    setIsClosing(true);
  };

  const handleAnimationComplete = () => {
    if (isClosing) {
      router.back();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!isClosing && (
        <div className="fixed inset-0 flex justify-end" onClick={handleClose}>
          <motion.div
            initial={{ x: 800, opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 800, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="h-screen w-full bg-background-secondary px-16 pt-76 md:w-9/12 md:px-24 lg:max-w-779 lg:px-40"
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              variant="darkest"
              icon="IconX"
              onClick={handleXButton}
            />
            <section className="size-full overflow-y-auto px-1">
              {children}
            </section>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SidePage;
