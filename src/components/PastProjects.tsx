"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Project, PROJECTS } from "../data/pastprojects";

const shelfContents = [
  "Blue",
  "Purple",
  "Green",
  "Orange",
  "Red",
];

const projectFrames = [
  {
    index: 1,
    frame: "/pastprojects/spellcasterFrame.svg",
    label: "Spell caster",
    width: 234,
    height: 343,
    className:
      "w-[32vw] rotate-[16deg] lg:absolute lg:-top-8 lg:left-2 lg:w-40 lg:rotate-0 xl:left-4 xl:w-48",
    labelClass: "text-[#AF85C3]",
    imageInset:
      "top-[35%] right-[18%] bottom-[11%] left-[21%] -rotate-[8deg] rounded-md lg:top-[36%] lg:right-[19%] lg:bottom-[12%] lg:left-[23%] lg:rounded-2xl",
  },
  {
    index: 2,
    frame: "/pastprojects/raccoonFrame.svg",
    label: "Raccoon Recycling",
    width: 336,
    height: 192,
    className:
      "w-[48vw] rotate-[6.8deg] lg:absolute lg:top-[52%] lg:-left-12 lg:w-56 lg:rotate-0 xl:-left-20 xl:w-72",
    labelClass: "text-[#7B9853]",
    imageInset:
      "top-[15%] right-[23.8%] bottom-[16%] left-[23.5%] -rotate-[6.8deg]",
  },
  {
    index: 3,
    frame: "/pastprojects/ecosortFrame.svg",
    label: "Eco Sort",
    width: 188,
    height: 237,
    className:
      "w-[30vw] lg:absolute lg:top-[8%] lg:right-4 lg:w-32 xl:right-2 xl:w-40",
    labelClass: "text-[#E38649]",
    imageInset: "top-[8%] right-[10%] bottom-[7%] left-[10%] rounded-[50%]",
  },
  {
    index: 4,
    frame: "/pastprojects/pastprojectsFrame.svg",
    label: "Past Years & More Projects",
    width: 362,
    height: 304,
    className:
      "w-[55vw] -translate-y-8 -rotate-[11.6deg] lg:absolute lg:top-[40%] lg:-right-10 lg:w-56 lg:translate-y-0 lg:rotate-0 xl:-right-16 xl:w-72",
    labelClass: "text-[#AE3E3D]",
    imageInset:
      "top-[44.2%] right-[19%] bottom-[16%] left-[16.7%] rotate-[5.8deg] rounded-2xl",
  },
] as const;

function PastProjectBubble({
  project,
  onClick,
  frame,
  label,
  width,
  height,
  className,
  labelClass,
  imageInset,
}: {
  project: Project;
  onClick: () => void;
  frame: string;
  label: string;
  width: number;
  height: number;
  className: string;
  labelClass: string;
  imageInset: string;
}) {
  const showHoverImage = Boolean(project.image);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative ${className}`}
    >
      <Image
        src={frame}
        alt=""
        width={width}
        height={height}
        className="pointer-events-none h-auto w-full"
      />
      <span
        className={`absolute z-[2] flex items-center justify-center px-7 text-center font-fraunces text-[3.8vw] leading-tight font-normal transition-opacity lg:px-8 lg:text-base xl:text-lg ${imageInset} ${labelClass} ${showHoverImage ? "group-hover:opacity-0" : ""}`}
      >
        {label}
      </span>
      {showHoverImage && (
        <div
          className={`pointer-events-none absolute z-[1] overflow-hidden opacity-0 transition-opacity group-hover:opacity-100 ${imageInset}`}
        >
          <Image
            src={project.image!}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}
    </button>
  );
}

function Shelf({light, dark, className}:{light: string, dark: string, className?: string}) {
  const [shelfSvg,setShelfSvg] = useState("");

  useEffect(() => {
    fetch("/pastprojects/projectShelf.svg").then((r)=>r.text()).then(setShelfSvg);
  }, []);

  return (
    <div
      className={className}

      style={{
        "--light-color": light,
        "--dark-color": dark,
      } as React.CSSProperties}

      dangerouslySetInnerHTML={{__html: shelfSvg}}
    
    />
  );
}

const PastProjects = () => {
    const [curIndex, setIndex] = useState(0);
    const curProject = PROJECTS[curIndex];
    const prevProj = () => setIndex((i) => (i-1+PROJECTS.length) % PROJECTS.length);
    const nextProj = () => setIndex((i) => (i+1) % PROJECTS.length);
    const shelfContentSrc = `/pastprojects/shelfContents${shelfContents[curIndex]}.svg`;
    const isRedShelf = shelfContents[curIndex] === "Red";

  return (
    <section id="past-projects" className="w-full px-10 py-16 text-black">
      <h2 className="flex items-center justify-center gap-10 pb-1 md:pb-3">
        <Image
          src="/diamond.svg"
          alt=""
          width={43}
          height={48}
          className="block h-9 w-auto drop-shadow-[0_6px_4px_rgba(0,0,0,0.25)]"
          aria-hidden
        />
        <span className="from-white-100 font-fraunces inline-block bg-linear-to-b to-orange-500 bg-clip-text pb-1 text-[17px] font-semibold leading-normal tracking-normal text-transparent [text-shadow:0_6px_4px_rgba(0,0,0,0.25)] lg:text-[32px]">
          Past Projects
        </span>
        <Image
          src="/diamond.svg"
          alt=""
          width={43}
          height={48}
          className="block h-9 w-auto drop-shadow-[0_6px_4px_rgba(0,0,0,0.25)]"
          aria-hidden
        />
      </h2>
      <div className="relative mx-auto mt-6 w-full lg:max-w-5xl">
      <article className="relative left-1/2 w-[95vw] -translate-x-1/2 lg:left-auto lg:mx-auto lg:w-full lg:max-w-xl lg:translate-x-0">
        <div className="relative aspect-[661/626] w-full">
          {isRedShelf ? (
            <Image
              src="/pastprojects/redShelf.svg"
              alt=""
              width={661}
              height={626}
              className="pointer-events-none absolute inset-0 size-full"
            />
          ) : (
            <Shelf
              light={curProject.light}
              dark={curProject.dark}
              className="pointer-events-none absolute inset-0 size-full [&_svg]:size-full"
            />
          )}
          <Image
            src={shelfContentSrc}
            alt=""
            width={451}
            height={536}
            className="pointer-events-none absolute top-0 left-[20.5%] z-[3] h-[85.5%] w-[68.5%] object-contain object-left"
          />
          <h3 className="absolute top-[15%] right-[12%] left-[12%] z-[4] text-center font-fraunces text-[3.6vw] leading-tight font-bold text-blue-900 lg:text-2xl">
            {curProject.title}
            <span className="block font-labrada text-[2.2vw] font-normal italic -mt-1 lg:text-sm">
              {isRedShelf
                ? curProject.year
                : `${curProject.year} – ${curProject.track}`}
            </span>
          </h3>
          {!isRedShelf && (
            <>
              {curProject.testimonial ? (
                <div className="absolute top-[33%] left-1/2 z-[2] flex aspect-[750/500] w-[44%] -translate-x-1/2 items-center overflow-hidden rounded-md border-[2px] border-gold-500 bg-white-100 p-6 text-center font-labrada text-[2.6vw] leading-snug text-blue-900 lg:text-base">
                  <p>{curProject.testimonial}</p>
                </div>
              ) : (
                curProject.image && (
                  <Image
                    src={curProject.image}
                    alt=""
                    width={750}
                    height={500}
                    className="absolute top-[33%] left-1/2 z-[2] block h-auto w-[44%] -translate-x-1/2 rounded-md border-[2px] border-gold-500"
                  />
                )
              )}
              {curProject.description && (
                <div
                  className={`absolute right-[12%] left-[12%] z-[4] text-center font-labrada leading-snug text-blue-900 ${
                    curIndex === 3
                      ? "bottom-[17%] px-[18%] text-[2vw] lg:text-sm"
                      : "bottom-[18%] px-[15%] text-[2.6vw] lg:text-base"
                  }`}
                >
                  <p>{curProject.description}</p>
                </div>
              )}
            </>
          )}
          {isRedShelf && (
            <p className="absolute right-[12%] bottom-[20%] left-[12%] z-[4] px-[15%] text-center font-labrada text-[2.6vw] leading-snug text-blue-900 lg:text-base">
              See more:{" "}
              <a
                href={curProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Previous Hackathon Projects
              </a>
            </p>
          )}
          <button
            onClick={prevProj}
            className="absolute top-[48.3%] left-[13%] z-[4] -translate-y-1/2"
          >
            <Image
              src="/pastprojects/shelfArrows.svg"
              alt=""
              width={34}
              height={34}
              className="h-7 w-7 rotate-180"
            />
          </button>
          <button
            onClick={nextProj}
            className="absolute top-[48.3%] right-[13%] z-[4] -translate-y-1/2"
          >
            <Image
              src="/pastprojects/shelfArrows.svg"
              alt=""
              width={34}
              height={34}
              className="h-7 w-7"
            />
          </button>
          <div className="absolute top-[68.3%] left-1/2 z-[4] flex -translate-x-1/2 items-center gap-3">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full ${i === curIndex ? "bg-blue-900" : "border border-blue-900"}`}
              />
            ))}
          </div>
        </div>
      </article>

      <div className="mt-8 grid grid-cols-2 place-items-center gap-4 lg:mt-0 lg:contents">
        {projectFrames.map((item) => (
          <PastProjectBubble
            key={item.index}
            project={PROJECTS[item.index]}
            onClick={() => setIndex(item.index)}
            frame={item.frame}
            label={item.label}
            width={item.width}
            height={item.height}
            className={item.className}
            labelClass={item.labelClass}
            imageInset={item.imageInset}
          />
        ))}
      </div>
      </div>
    </section>
  );
};

export default PastProjects;
