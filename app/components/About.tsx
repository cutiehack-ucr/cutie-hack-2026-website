"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ABOUT_PARAGRAPHS = [
  {
    before: "Cutie Hack is ACM at UCR's 12 hour, ",
    strong: "beginner-friendly",
    after:
      " hackathon with the goal to build and provide a place where students can build with the freedom of their creativity.",
  },
  {
    before: "Established ",
    strong: "for students by students",
    after:
      ", Cutie Hack has since become one of Southern California's premier collegiate hackathons and is a place where students can turn their ideas into ",
    strongAfter: "impactful innovations.",
  },
  {
    before:
      "Cutie Hack provides builders of all years, majors, and skill levels the chance to develop projects, present to a panel of industry judges, and compete for tracks and prizes!",
  },
];

const VALUE_CARDS = [
  {
    name: "Community",
    description:
      "We build together. Connections across all backgrounds (years, majors, skill levels, etc).",
  },
  {
    name: "Growth",
    description: "Every hackathon is a chance to learn something new.",
  },
  {
    name: "Innovation",
    description:
      "Pushing boundaries and trying new approaches, even if they fail.",
  },
  {
    name: "Impact",
    description:
      "Projects that make a real difference in the world (for users, communities, and more).",
  },
];

const SectionTitle = ({ children }: { children: string }) => (
  <h2 className="flex items-center justify-center gap-3 leading-none sm:gap-10">
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className="block h-5 w-auto sm:h-9"
      aria-hidden
    />
    <span className="bg-linear-to-b from-white-100 to-orange-500 bg-clip-text text-center font-fraunces text-[22px] font-semibold tracking-normal text-transparent sm:text-[32px]">
      {children}
    </span>
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className="block h-5 w-auto sm:h-9"
      aria-hidden
    />
  </h2>
);

const ValueMirrorCard = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const revealDescription = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowDescription(true);
    timeoutRef.current = setTimeout(() => {
      setShowDescription(false);
    }, 5000);
  };

  return (
    <button
      type="button"
      onClick={revealDescription}
      aria-expanded={showDescription}
      aria-label={`${name} value, ${
        showDescription ? "showing description" : "click to read description"
      }`}
      className="relative aspect-[243/283] w-full cursor-pointer appearance-none border-0 bg-transparent p-0 focus-visible:outline-none xl:h-[283px] xl:w-[243px] xl:shrink-0"
    >
      <Image
        src="/about/Value_Mirror.svg"
        alt=""
        width={243}
        height={283}
        className="pointer-events-none h-full w-full select-none"
      />
      <span className="pointer-events-none absolute inset-[13.1%_9.8%_13.9%_10%] flex items-center justify-center px-2 sm:px-4">
        <span
          aria-hidden={showDescription}
          className={[
            "absolute inset-0 flex items-center justify-center px-1 font-fraunces text-[length:clamp(0.65rem,3.6vw,1.25rem)] font-semibold uppercase tracking-wide text-blue-900 transition-opacity duration-700 sm:px-2",
            showDescription ? "opacity-0" : "opacity-100",
          ].join(" ")}
        >
          {name}
        </span>
        <span
          aria-hidden={!showDescription}
          className={[
            "absolute inset-0 flex items-center justify-center px-1 text-center font-labrada text-[length:clamp(0.55rem,2.6vw,0.75rem)] font-normal leading-snug text-blue-900 transition-opacity duration-700 sm:px-2 md:text-base xl:text-base",
            showDescription ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
          {description}
        </span>
      </span>
    </button>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="w-full px-6 py-16 text-white-100 sm:px-14 lg:px-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 xl:flex-row xl:items-start xl:justify-between xl:gap-12">
        <div className="flex w-full max-w-2xl flex-col items-center gap-8 xl:max-w-xl xl:items-start">
          <SectionTitle>About Cutie Hack</SectionTitle>
          <div className="space-y-6 text-center font-labrada text-base leading-relaxed sm:text-lg xl:text-left xl:text-[22px]">
            <p>
              {ABOUT_PARAGRAPHS[0].before}
              <strong className="font-semibold">
                {ABOUT_PARAGRAPHS[0].strong}
              </strong>
              {ABOUT_PARAGRAPHS[0].after}
            </p>
            <p>
              {ABOUT_PARAGRAPHS[1].before}
              <strong className="font-semibold">
                {ABOUT_PARAGRAPHS[1].strong}
              </strong>
              {ABOUT_PARAGRAPHS[1].after}
              <strong className="font-semibold">
                {ABOUT_PARAGRAPHS[1].strongAfter}
              </strong>
            </p>
            <p>{ABOUT_PARAGRAPHS[2].before}</p>
          </div>
        </div>

        <Image
          src="/about/stats_display.svg"
          alt="Cutie Hack stats"
          width={536}
          height={599}
          className="mx-auto h-auto w-full max-w-[536px] shrink-0 xl:mx-0"
        />
      </div>

      <div className="mx-auto mt-4 flex max-w-6xl flex-col items-center gap-3 xl:items-start">
        <h3 className="bg-linear-to-b from-white-100 to-orange-500 bg-clip-text text-center font-fraunces text-[28px] font-semibold tracking-normal text-transparent sm:text-[32px] xl:text-left">
          Our Values
        </h3>
        <p className="text-center font-labrada text-base text-gray-100 sm:text-lg xl:text-left xl:text-[22px]">
          <span className="xl:hidden">Tap to read description!</span>
          <span className="hidden xl:inline">Click to read description!</span>
        </p>
        <div className="mt-6 grid w-full max-w-[40rem] grid-cols-2 gap-3 sm:gap-5 xl:flex xl:max-w-none xl:flex-wrap xl:justify-center xl:gap-6">
          {VALUE_CARDS.map((card) => (
            <ValueMirrorCard
              key={card.name}
              name={card.name}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
