"use client";

import { AnimatePresence as FramerMotionAnimatePresence } from "framer-motion";
import React, { ReactNode } from "react";

interface AnimatePresenceProps {
  children: ReactNode;
}

/**
 * 서버 컴포넌트에서 framer-motion의 AnimatePresence 사용하고 싶을 때 사용하세요.
 * @param {ReactNode} props.children Motion 컴포넌트
 *
 * @example
 *<AnimatePresence>
 *  <Motion
 *      initial={{ opacity: 0 }}
 *      animate={{ opacity: 1 }}
 *      exit={{ opacity: 0 }}
 *      transition={{ duration: 1 }}
 *  >
 *      <h1>Hello, Framer Motion!</h1>
 *  </Motion>
 *</AnimatePresence>
 *
 */
const AnimatePresence = ({ children }: AnimatePresenceProps) => (
  <FramerMotionAnimatePresence>{children}</FramerMotionAnimatePresence>
);

export default AnimatePresence;
