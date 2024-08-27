"use client";

import "@shinyongjun/react-fullpage/css";

import {
  FullpageContainer,
  FullpageSection,
} from "@shinyongjun/react-fullpage";
import { useState } from "react";

import IButtons from "@/components/landing/i-buttons";
import Section1 from "@/components/landing/section1";
import Section2 from "@/components/landing/section2";
import Section3 from "@/components/landing/section3";
import Section4 from "@/components/landing/section4";
import Section5 from "@/components/landing/section5";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <main className="relative">
      <FullpageContainer
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      >
        <FullpageSection>
          <Section1 />
        </FullpageSection>
        <FullpageSection>
          <Section2 />
        </FullpageSection>
        <FullpageSection>
          <Section3 />
        </FullpageSection>
        <FullpageSection>
          <Section4 />
        </FullpageSection>
        <FullpageSection>
          <Section5 />
        </FullpageSection>
      </FullpageContainer>
      <div className="fixed right-10 top-1/3 z-10">
        <IButtons activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
    </main>
  );
}
