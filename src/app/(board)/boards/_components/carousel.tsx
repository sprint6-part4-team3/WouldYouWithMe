"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";

type CarouselItemType = {
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
  background: string;
};

interface CarouselProps {
  items: CarouselItemType[];
}

const Carousel = ({ items }: CarouselProps) => {
  const extendedItems = [items[items.length - 1], ...items, items[0]];

  const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real item
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToPrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, [isTransitioning]); // 의존성 배열 추가

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNext]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (currentIndex === 0) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      }, 500);
    } else if (currentIndex === extendedItems.length - 1) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, 500);
    } else {
      timeoutId = setTimeout(() => setIsTransitioning(false), 500);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, extendedItems.length, items.length]);

  return (
    <div className="relative h-200 w-full rounded-2xl md:h-240 lg:h-280">
      <div className="h-full overflow-hidden rounded-2xl">
        <div
          className={`flex transition-transform duration-500 ${
            isTransitioning ? "" : "duration-0"
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {extendedItems.map((item, index) => (
            <div
              key={item.title}
              className={`${item.background} flex h-200 w-full shrink-0 justify-between gap-16 rounded-2xl px-100 md:h-240 lg:h-280`}
            >
              <div className="flex h-full flex-col justify-center">
                <span className="flex h-auto w-60 items-center justify-center rounded-full bg-brand-primary">
                  {item.tag}
                </span>
                <h2 className="mb-2 mt-8 text-24-700">{item.title}</h2>
                <p className="pb-20 text-text-secondary">{item.description}</p>
              </div>
              <div className="flex h-full flex-col justify-center">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-10 top-1/2 h-50 w-25 -translate-y-1/2 rounded-full bg-background-secondary hover:bg-background-tertiary"
      >
        &#8249;
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-20 top-1/2 h-50 w-25 -translate-y-1/2 rounded-full bg-background-secondary hover:bg-background-tertiary"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
