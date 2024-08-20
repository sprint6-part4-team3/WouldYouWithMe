import Image from "next/image";
import React from "react";

import {
  IconCalendar,
  IconProfile,
  IconRepeat,
  IconTime,
} from "@/public/assets/icons";

interface TaskInfoProps {
  nickname: string;
  date: string;
  time: string;
  frequency: string;
  profileImage?: string;
}

const frequencyMap = {
  ONCE: "반복 없음",
  DAILY: "매일 반복",
  WEEKLY: "매주 반복",
  MONTHLY: "매월 반복",
} as const;

const TaskInfo = ({
  nickname,
  date,
  time,
  frequency,
  profileImage,
}: TaskInfoProps) => {
  const getFrequencyText = (freqKey: string): string =>
    frequencyMap[freqKey as keyof typeof frequencyMap] || frequencyMap.ONCE;

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-[1_0_0] items-center">
        {profileImage ? (
          <Image
            src={profileImage}
            alt={`${nickname}'s profile`}
            width={32}
            height={32}
            className="mr-12 rounded-full"
          />
        ) : (
          <IconProfile className="mr-12" />
        )}
        <div className="flex flex-col gap-4">
          <div className="text-12-500 text-text-secondary">작성자</div>
          <div className="text-14-600 text-text-primary">{nickname}</div>
        </div>
        <time className="ml-auto text-14-400 text-text-secondary">{date}</time>
      </div>
      <div className="flex items-center text-12-400 text-text-default ">
        <IconCalendar
          width={16}
          height={16}
          className="flex content-center items-center"
        />
        <time className="ml-6 mr-10 flex items-center">{date}</time>
        <span>|</span>
        <IconTime
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <time className="ml-6 mr-10 flex items-center">{time}</time>
        <span>|</span>
        <IconRepeat
          width={16}
          height={16}
          className="ml-10 flex content-center items-center"
        />
        <span className="ml-6 flex items-center">
          {getFrequencyText(frequency)}
        </span>
      </div>
    </div>
  );
};

export default TaskInfo;
