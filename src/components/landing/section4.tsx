"use client";

import Lottie from "lottie-react";
import Image from "next/image";

import { landingIconThird, landingMockupThird } from "@/public/assets/images";
import stars from "@/public/assets/lotties/stars.json";

const Section4 = () => (
  <section className="mt-25 flex h-screen flex-col items-center gap-35 md:gap-0 lg:mt-0 lg:flex-row lg:justify-evenly">
    <article className="grid w-full rounded-40 bg-slate-950 sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
      <div className="flex items-start justify-center pl-25 sm:px-60 md:pb-80 lg:pb-80 xl:pb-80">
        <Image draggable="false" src={landingMockupThird} alt="이미지3" />
      </div>
      <div className="flex flex-col items-center justify-center sm:items-start sm:pb-50">
        <Image
          className="mr-70 sm:ml-65 xl:mr-110"
          draggable="false"
          src={landingIconThird}
          alt="완료 아이콘"
        />
        <span className="text-18-500 sm:ml-80 xl:text-24-500">
          할 일을 간편하게
          <br /> 체크해요
        </span>
      </div>
    </article>
    <Lottie
      animationData={stars}
      className="h-1/5 w-4/5 min-w-230 max-w-700 md:size-4/5"
    />
  </section>
);

export default Section4;
