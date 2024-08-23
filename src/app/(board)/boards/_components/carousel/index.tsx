/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-array-index-key */

"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";

import getRandomQuote from "@/utils/get-random-quote";

type CarouselItemType = {
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
  background: string;
  children?: ReactNode;
};

interface CarouselProps {
  items: CarouselItemType[];
}

const Carousel = ({ items }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [randomQuote, setRandomQuote] = useState("");

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const extendedItems = [items[items.length - 1], ...items, items[0]];

  const debounce = (func: Function, delay: number) => {
    if (isDebouncing) return;
    setIsDebouncing(true);
    func();
    setTimeout(() => setIsDebouncing(false), delay);
  };

  const goToPrevious = useCallback(() => {
    if (isDebouncing) return;
    setTransition(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, [isDebouncing]);

  const goToNext = useCallback(() => {
    if (isDebouncing) return;
    setTransition(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, [isDebouncing]);

  useEffect(() => {
    setRandomQuote(getRandomQuote());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, goToNext]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (currentIndex === 0) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(extendedItems.length - 2);
        setTransition(false);
      }, 500);
    } else if (currentIndex === extendedItems.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentIndex(1);
        setTransition(false);
      }, 500);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex, extendedItems.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const distance = touchStartX - touchEndX;
      if (Math.abs(distance) > 50) {
        debounce(() => {
          if (distance > 0) {
            goToNext();
          } else {
            goToPrevious();
          }
        }, 300);
      }
      setTouchStartX(null);
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-200 w-full rounded-2xl md:h-240 lg:h-280"
    >
      <div className="h-full overflow-hidden rounded-2xl">
        <div
          className={`flex ${transition && "transition-transform duration-500"}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {extendedItems.map((item, index) => (
            <div
              key={item.description + index}
              className={`${item.background} relative flex h-200 w-full shrink-0 justify-between gap-6 rounded-2xl px-30 md:h-240 md:gap-16 md:px-60 lg:h-280 lg:px-90`}
            >
              <div className="flex h-full flex-col justify-center">
                <span className="flex h-auto w-60 items-center justify-center rounded-full bg-text-primary text-brand-primary sm:text-14">
                  {item.tag}
                </span>
                <h2 className="mb-2 mt-8 text-20-700 md:text-24-700">
                  {item.title}
                </h2>
                <p className="pb-20 text-text-secondary sm:text-14">
                  {item.description === "명언" ? randomQuote : item.description}
                </p>
                {item.children}
              </div>
              <div className="absolute right-60 hidden h-full flex-col justify-center md:flex md:opacity-20 lg:right-90 lg:opacity-50">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => debounce(goToPrevious, 500)}
        className="left-10 top-1/2 hidden h-40 w-20 -translate-y-1/2 items-center justify-center rounded-full bg-background-secondary hover:bg-background-tertiary md:absolute md:flex md:h-50 md:w-25"
      >
        &#8249;
      </button>

      <button
        type="button"
        onClick={() => debounce(goToNext, 500)}
        className="right-10 top-1/2 hidden h-40 w-20 -translate-y-1/2 items-center justify-center rounded-full bg-background-secondary hover:bg-background-tertiary md:absolute md:flex md:h-50 md:w-25"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
