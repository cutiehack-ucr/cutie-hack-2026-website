"use client";

import { useEffect, useState } from "react";

type HeroProps = {
  targetDate?: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DEFAULT_TARGET_DATE = "2026-11-21T00:00:00";

const Hero = ({ targetDate = DEFAULT_TARGET_DATE }: HeroProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });

      const delay = 1000 - (Date.now() % 1000);
      timer = setTimeout(calculateTimeLeft, delay);
    };

    calculateTimeLeft();

    return () => clearTimeout(timer);
  }, [targetDate]);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  const units = [
    {
      key: "days",
      value: timeLeft.days,
      label: timeLeft.days === 1 ? "day" : "days",
    },
    {
      key: "hours",
      value: timeLeft.hours,
      label: timeLeft.hours === 1 ? "hr" : "hrs",
    },
    {
      key: "minutes",
      value: timeLeft.minutes,
      label: timeLeft.minutes === 1 ? "min" : "mins",
    },
    {
      key: "seconds",
      value: timeLeft.seconds,
      label: timeLeft.seconds === 1 ? "sec" : "secs",
    },
  ] as const;

  return (
    <section className="flex flex-col items-center bg-white px-6 py-32 text-black">
      <div className="flex w-fit -translate-x-32 flex-col items-start sm:-translate-x-48 lg:-translate-x-64">
        <h1 className="text-5xl font-bold sm:text-6xl lg:text-7xl">
          [Hackathon name]
        </h1>

        <p className="mt-3 text-2xl">
          [Date - ex: November 21, 2026] ✦ UC Riverside
        </p>
      </div>

      <div
        className="mt-10 flex items-start justify-center"
        aria-live="off"
        aria-label="Countdown to event"
      >
        {units.map((unit, index) => (
          <div key={unit.key} className="flex items-start">
            {index > 0 && (
              <span
                className="text-3xl leading-none sm:text-4xl"
                aria-hidden="true"
              >
                :
              </span>
            )}

            <div className="flex min-w-32px flex-col items-center">
              <span className="text-3xl sm:text-4xl">
                {formatNumber(unit.value)}
              </span>

              <span className="mt-1.5 sm:text-lg">
                {unit.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
