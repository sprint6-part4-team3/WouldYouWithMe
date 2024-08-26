// 애니메이션 변형 정의
export const articleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 1.5 } },
  exit: { opacity: 0, x: -100, transition: { duration: 1 } },
};

export const lottieVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  exit: { opacity: 0, y: 100, transition: { duration: 1 } },
};
