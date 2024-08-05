import Image from "next/image";

import {
  landingBottom,
  landingIconFirst,
  landingIconSecond,
  landingIconThird,
  landingMain,
  landingMockupFirst,
  landingMockupSecond,
  landingMockupThird,
} from "@/public/assets/images";

export default function Home() {
  return (
    <div>
      <Image src={landingMain} alt="메인 이미지" />
      <div>
        <Image src={landingIconFirst} alt="아이콘1" />
        <Image src={landingIconSecond} alt="아이콘2" />
        <Image src={landingIconThird} alt="아이콘3" />
        <Image src={landingMockupFirst} alt="이미지1" />
        <Image src={landingMockupSecond} alt="이미지2" />
        <Image src={landingMockupThird} alt="이미지3" />
      </div>
      <Image src={landingBottom} alt="메인 이미지" />
    </div>
  );
}
