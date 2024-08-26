"use client";

import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import Image from "next/image";
import { useRef } from "react";

import { landingIconFirst, landingMockupFirst } from "@/public/assets/images";
import planets from "@/public/assets/lotties/planets.json";

import { articleVariants, lottieVariants } from "./framer-motion-option";

const Section2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="mt-25 flex h-screen flex-col items-center gap-35 md:gap-0 lg:mt-0 lg:flex-row lg:justify-evenly"
    >
      <motion.article
        className="rounded-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-1"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        exit="exit"
        variants={articleVariants}
      >
        <div className="grid w-full rounded-40 bg-background-primary sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
          <div className="order-1 flex items-end justify-center pl-25 sm:order-2 sm:px-60 md:pt-80 lg:pt-80 xl:pt-80">
            <Image draggable="false" src={landingMockupFirst} alt="이미지1" />
          </div>
          <div className="order-2 flex flex-col items-center justify-center sm:order-1 sm:items-start sm:pt-5">
            <Image
              className="mr-70 sm:ml-65 xl:mr-110"
              draggable="false"
              src={landingIconFirst}
              alt="파일 아이콘"
            />
            <span className="text-18-500 sm:ml-80 xl:text-24-500">
              그룹으로
              <br /> 할 일을 관리해요
            </span>
          </div>
        </div>
      </motion.article>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"} // 뷰포트에 있을 때만 애니메이션 실행
        exit="exit"
        variants={lottieVariants}
        className="flex h-1/5 w-4/5 min-w-230 max-w-700 justify-center md:size-3/5 lg:size-4/5"
      >
        <Lottie animationData={planets} />
      </motion.div>
    </section>
  );
};

export default Section2;
