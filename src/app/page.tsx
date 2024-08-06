import Image from "next/image";

import { Button } from "@/components/common";
import {
  landingIconFirst,
  landingIconSecond,
  landingIconThird,
  landingMockupFirst,
  landingMockupSecond,
  landingMockupThird,
} from "@/public/assets/images";

export default function Home() {
  return (
    <div className="relative">
      <div
        className="flex flex-col items-center justify-center bg-cover bg-center py-55 lg:py-100 xl:py-84"
        style={{
          backgroundImage: "url('/assets/images/img-landing-main.png')",
        }}
      >
        <h1 className="mb-4 text-center text-24-600 lg:mb-8 lg:text-40-600 xl:mb-20 xl:text-48-600">
          함께 만들어가는 투두 리스트&nbsp;&nbsp;🛠️
        </h1>
        <h2 className="text-gradient flex h-38 items-center justify-center text-center text-32-600 lg:h-57 lg:text-48-600 xl:h-76 xl:text-64-600">
          Coworkers
        </h2>
        <Button
          className="m-auto mt-421 h-45 w-343 rounded-full bg-gradient-to-r from-brand-primary to-brand-tertiary text-16-600 lg:mt-560 lg:h-48 lg:w-373 xl:mb-180 xl:mt-675 xl:w-373"
          variant="primary"
        >
          지금 시작하기
        </Button>
      </div>
      <div className="m-auto flex max-w-996 flex-col gap-80 px-16 lg:px-24">
        <div className="w-full rounded-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-1">
          <div className="grid max-h-419 w-full grid-cols-2 place-items-center rounded-40 bg-background-primary">
            <Image src={landingMockupFirst} alt="이미지1" />
            <div>
              <Image src={landingIconFirst} alt="파일 아이콘" />
              <span>
                그룹으로
                <br /> 할 일을 관리해요
              </span>
            </div>
          </div>
        </div>
        <div className="grid max-h-419 w-full grid-cols-2 place-items-center rounded-40 border border-border-primary/10 bg-background-secondary">
          <div>
            <Image src={landingIconSecond} alt="이메일 아이콘" />
            <span>
              간단하게 멤버들을
              <br /> 초대해요
            </span>
          </div>
          <Image src={landingMockupSecond} alt="이미지2" />
        </div>
        <div className="grid max-h-419 w-full grid-cols-2 place-items-center rounded-40 bg-slate-950">
          <Image src={landingMockupThird} alt="이미지3" />
          <div>
            <Image src={landingIconThird} alt="완료 아이콘" />
            <span>
              할 일을 간편하게
              <br /> 체크해요
            </span>
          </div>
        </div>
      </div>
      <div
        className="bg-cover bg-center pb-343 pt-123 lg:pb-663 lg:pt-173 xl:pb-749 xl:pt-230"
        style={{
          backgroundImage: "url('/assets/images/img-landing-bottom.png')",
        }}
      >
        <h3 className="mb-16 text-center text-24-600 lg:mb-24 lg:text-40-600 xl:mb-24 xl:text-40-600">
          지금 바로 시작해보세요
        </h3>
        <h4 className="flex flex-col items-center justify-center text-16-500 md:flex-row lg:mb-24 lg:text-24-500 xl:mb-20 xl:text-24-500">
          <span>팀원 모두와 같은 방향,&nbsp;</span>
          <span>같은 속도로 나아가는 가장 쉬운 방법</span>
        </h4>
      </div>
    </div>
  );
}
