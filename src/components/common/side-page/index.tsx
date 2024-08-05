"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

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
  return (
    <div className="fixed inset-0 flex justify-end">
      <motion.div
        initial={{ x: 800, opacity: 1 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-screen w-full bg-background-secondary px-40 pt-76 md:max-w-435 lg:max-w-779"
      >
        <IconButton
          variant="darkest"
          icon="IconX"
          onClick={() => router.back()}
        />
        <section className="size-full overflow-y-auto px-1">{children}</section>
      </motion.div>
    </div>
  );
};

export default SidePage;
