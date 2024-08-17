import Image from "next/image";
import Link from "next/link";

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
    <main className="relative">
      <section
        className="flex flex-col items-center justify-center bg-cover bg-center py-55 lg:py-100 xl:py-84"
        style={{
          backgroundImage: "url('/assets/images/img-landing-main.png')",
        }}
      >
        <h1 className="mb-4 text-center text-24-600 lg:mb-8 lg:text-40-600 xl:mb-20 xl:text-48-600">
          함께 만들어가는 투두 리스트&nbsp;&nbsp;🛠️
        </h1>
        <h2 className="text-gradient mb-421 flex h-38 items-center justify-center text-center font-[PyeongChangPeace-Bold] text-32-600 lg:mb-560 lg:h-57 lg:text-48-600 xl:mb-675 xl:h-76 xl:text-64-600">
          우주윗미
        </h2>
        {/* TODO: 추후에 로그인 되어 있을 시 팀 생성하기, 아닐 시 로그인 페이지로 이동을 변경 예정 */}
        <Link href="/login">
          <div>
            <Button
              className="m-auto h-45 w-300 rounded-full bg-gradient-to-r from-brand-primary to-brand-tertiary text-16-600 lg:h-48 lg:w-373 xl:w-373"
              variant="primary"
            >
              지금 시작하기
            </Button>
          </div>
        </Link>
      </section>
      <section className="m-auto flex max-w-996 flex-col gap-80 px-16 lg:px-24">
        <article className="w-full rounded-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-1">
          <div className="grid w-full rounded-40 bg-background-primary sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
            <div className="order-1 flex items-end justify-center pl-25 sm:order-2 sm:px-60 md:pt-80 lg:pt-80 xl:pt-80">
              <Image draggable="false" src={landingMockupFirst} alt="이미지1" />
            </div>
            <div className="order-2 flex flex-col items-center justify-center sm:order-1 sm:items-start sm:pt-50">
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
        </article>
        <article className="grid w-full rounded-40 border border-border-primary/10 bg-background-secondary sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
          <div className="order-1 flex flex-col items-center justify-center text-end sm:order-2 sm:items-start sm:pb-50 sm:text-start">
            <Image
              className="ml-75 mr-0 sm:mr-130 xl:ml-120"
              draggable="false"
              src={landingIconSecond}
              alt="이메일 아이콘"
            />
            <span className="text-18-500 sm:ml-80 xl:text-24-500">
              간단하게 멤버들을
              <br /> 초대해요
            </span>
          </div>
          <div className="order-2 flex items-start justify-center pr-25 sm:order-1 sm:px-60 md:pb-80 lg:pb-80 xl:pb-80">
            <Image draggable="false" src={landingMockupSecond} alt="이미지2" />
          </div>
        </article>
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
      </section>
      <section
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
      </section>
    </main>
  );
}
