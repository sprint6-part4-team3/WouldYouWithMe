import React from "react";

import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Section4 from "./section4";
import Section5 from "./section5";

interface SectionProps {
  pageNum: number;
  pageRefs: React.MutableRefObject<HTMLDivElement[]>;
}

const sections = [Section1, Section2, Section3, Section4, Section5];

const Sections = ({ pageNum, pageRefs }: SectionProps) => {
  const ref = pageRefs;
  const SectionComponent = sections[pageNum - 1];
  return (
    <div
      ref={(element) => {
        ref.current[pageNum] = element!;
      }}
    >
      <SectionComponent />
    </div>
  );
};

export default Sections;
