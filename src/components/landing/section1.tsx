"use client";

import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import { useRef } from "react";

import Planet3 from "@/public/assets/lotties/planet3.json";

import LandingButtons from "./buttons";
import { articleVariants, lottieVariants } from "./framer-motion-option";

const Section1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="mt-25 flex h-screen flex-col items-center justify-evenly lg:flex-row"
    >
      <motion.article
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="exit"
        variants={articleVariants}
      >
        <div className="flex flex-col gap-40 md:gap-60 ">
          <div className="flex flex-col items-center justify-center">
            <h1 className="wrap mb-4 text-center font-[PyeongChangPeace-Bold] text-24-600 md:mb-8 md:text-40-600 lg:mb-20 lg:text-48-600">
              Would You
            </h1>
            <h1 className=" mb-4 whitespace-nowrap text-center font-[PyeongChangPeace-Bold] text-24-600 md:mb-8 md:text-32-600 lg:mb-20 lg:text-48-600">
              Study With Me?
            </h1>
            <h2 className="text-gradient flex h-38 items-center justify-center text-center font-[PyeongChangPeace-Bold] text-32-600 md:h-57 md:text-48-600 lg:h-76 lg:text-64-600">
              우주윗미
            </h2>
          </div>
          <LandingButtons />
        </div>
      </motion.article>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // 뷰포트에 있을 때만 애니메이션 실행
        exit="exit"
        variants={lottieVariants}
        className="flex size-4/5 h-auto min-w-350 max-w-700 justify-center"
      >
        <Lottie animationData={Planet3} />
      </motion.div>
    </section>
  );
};

export default Section1;
