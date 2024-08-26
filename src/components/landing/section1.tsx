import Lottie from "lottie-react";
import React from "react";

import Planet3 from "@/public/assets/lotties/planet3.json";

import LandingButtons from "./buttons";

const Section1 = () => (
  <section className="mt-25 flex h-screen flex-col items-center justify-evenly lg:flex-row">
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
    <Lottie
      className="size-4/5 h-auto min-w-350 max-w-700"
      animationData={Planet3}
    />
  </section>
);

export default Section1;
