"use client";

import Lottie from "lottie-react";
import Image from "next/image";

import LandingButtons from "@/components/landing/buttons";
import {
  landingIconFirst,
  landingIconSecond,
  landingIconThird,
  landingMockupFirst,
  landingMockupSecond,
  landingMockupThird,
} from "@/public/assets/images";
import lighting from "@/public/assets/lotties/lighting.json";
import Planet from "@/public/assets/lotties/planet.json";
import Planet3 from "@/public/assets/lotties/planet3.json";
import rocket from "@/public/assets/lotties/rocket.json";

export default function Home() {
  return (
    <main className="relative">
      <section className="flex flex-col items-center justify-center bg-cover bg-center py-55 lg:py-100 xl:py-84">
        <h1 className="mb-4 text-center font-[PyeongChangPeace-Bold] text-24-600 lg:mb-8 lg:text-40-600 xl:mb-20 xl:text-48-600">
          Would You Study With Me?
        </h1>
        <h2 className="text-gradient flex h-38 items-center justify-center text-center font-[PyeongChangPeace-Bold] text-32-600 lg:h-57 lg:text-48-600 xl:h-76 xl:text-64-600">
          우주윗미
        </h2>
        <Lottie
          className="size-2/3 h-auto min-w-250 max-w-500"
          animationData={Planet3}
        />
        <LandingButtons />
      </section>
      <section className="m-auto flex max-w-996 flex-col gap-80 px-16 lg:px-24">
        <article className="w-full rounded-30 bg-gradient-to-r from-brand-primary to-brand-tertiary p-1">
          <div className="grid w-full rounded-30 bg-background-secondary sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
            <div className="order-1 flex items-end justify-center pl-25 sm:order-2 sm:px-60 md:pt-80 lg:pt-80 xl:pt-80">
              <Image
                className="rounded-t-30"
                draggable="false"
                src={landingMockupFirst}
                alt="이미지1"
              />
            </div>
            <div className="order-2 flex flex-col items-center justify-center sm:order-1 sm:items-start sm:pt-50">
              <Image
                className="mr-80 sm:ml-65 xl:mr-130"
                draggable="false"
                src={landingIconFirst}
                alt="파일 아이콘"
              />
              <span className="text-18-500 sm:ml-80 xl:text-24-500">
                그룹으로
                <br /> 할 일을 관리해요
                <p className="pt-5 text-text-default">
                  드래그 해서 순서를
                  <br /> 변경할 수 있어요
                </p>
              </span>
            </div>
          </div>
          <Lottie
            animationData={rocket}
            className="mx-auto my-0 size-1/4 h-auto min-w-250 max-w-500"
          />
        </article>
        <article className="grid w-full rounded-30 border border-border-primary/10 bg-background-primary sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
          <div className="order-1 flex flex-col items-center justify-center text-end sm:order-2 sm:items-start sm:pb-50 sm:text-start">
            <Image
              className="ml-100 mr-0 sm:ml-65 xl:ml-150"
              draggable="false"
              src={landingIconSecond}
              alt="이메일 아이콘"
            />
            <span className="text-18-500 sm:ml-80 xl:text-24-500">
              간단하게 멤버들을
              <br /> 초대해요
              <p className="pt-5 text-text-default">
                모집게시판에서
                <br /> 멤버를 모을 수 있어요
              </p>
            </span>
          </div>

          <div className="order-2 flex items-start justify-center pr-25 sm:order-1 sm:px-60 md:pb-80 lg:pb-80 xl:pb-80">
            <Image
              className="rounded-b-30"
              draggable="false"
              src={landingMockupSecond}
              alt="이미지2"
            />
          </div>
        </article>
        <article className="grid w-full rounded-30 bg-slate-950 sm:gap-20 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-2 lg:grid-rows-1 xl:grid-cols-2 xl:grid-rows-1">
          <div className="flex items-start justify-center pl-25 sm:px-60 md:pb-80 lg:pb-80 xl:pb-80">
            <Image
              className="rounded-b-30"
              draggable="false"
              src={landingMockupThird}
              alt="이미지3"
            />
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
              <p className="pt-5 text-text-default">
                할 일을 누르면
                <br /> 소통할 수 있어요
              </p>
            </span>
            <Lottie
              animationData={Planet}
              className="size-2/3 h-auto min-w-250 max-w-500"
            />
          </div>
        </article>
      </section>
      <section className="bg-cover bg-center pt-123 lg:pt-173 xl:pt-230">
        <h3 className="mb-16 text-center text-24-600 lg:mb-24 lg:text-40-600 xl:mb-24 xl:text-40-600">
          다들 어디에 계세요?
        </h3>
        <h4 className="flex flex-col items-center justify-center text-16-500 md:flex-row  lg:text-24-500  xl:text-24-500">
          <p>
            스터디 하러 모이세요
            <br />
            <br />
            어떤 속도로?
            <br />
            <br />
            <span className=" text-yellow-300">빛의 속도로</span>
          </p>
          <Lottie animationData={lighting} />
        </h4>
      </section>
      <section className="flex flex-col items-center justify-center bg-cover bg-center py-55 lg:py-100 xl:py-84">
        <LandingButtons />
      </section>
    </main>
  );
}
