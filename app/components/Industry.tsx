"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  industryPeople,
  type IndustryPosition,
} from "../data/industry";

type IndustryFilter = "All" | IndustryPosition;

const filters: {
  id: IndustryFilter;
  label: string;
  idleClassName: string;
  activeClassName: string;
}[] = [
  {
    id: "All",
    label: "All",
    idleClassName: "border-blue-950 bg-gray-100 text-blue-950",
    activeClassName: "border-blue-950 bg-gray-100 text-blue-950",
  },
  {
    id: "Speakers",
    label: "Speakers",
    idleClassName: "border-orange-700 bg-white-100 text-orange-700",
    activeClassName: "border-white-100 bg-orange-700 text-white-100",
  },
  {
    id: "Judges",
    label: "Judges",
    idleClassName: "border-blue-500 bg-white-100 text-blue-500",
    activeClassName: "border-white-100 bg-blue-500 text-white-100",
  },
  {
    id: "Mentors",
    label: "Mentors",
    idleClassName: "border-red-500 bg-white-100 text-red-500",
    activeClassName: "border-white-100 bg-red-500 text-white-100",
  },
];

const ringColor: Record<IndustryPosition, string> = {
  Speakers: "border-orange-500",
  Judges: "border-blue-300",
  Mentors: "border-red-500",
};

const flowers: Record<
  IndustryPosition,
  { src: string; width: number; height: number; className: string }
> = {
  Speakers: {
    src: "/industry/Speaker.svg",
    width: 270,
    height: 213,
    className: "w-[182%] [translate:-50%_-57%]",
  },
  Judges: {
    src: "/industry/Judge.svg",
    width: 253,
    height: 218,
    className: "w-[165%] [translate:-50.59%_-58.56%]",
  },
  Mentors: {
    src: "/industry/Mentor.svg",
    width: 261,
    height: 264,
    className: "w-[170%] [translate:-50.2%_-46.57%]",
  },
};

const Industry = () => {
  const [selectedFilter, setSelectedFilter] = useState<IndustryFilter | null>(
    "All",
  );
  const filterScrollerRef = useRef<HTMLDivElement>(null);
  const filterDragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const [filterThumb, setFilterThumb] = useState({
    width: 100,
    left: 0,
    overflows: false,
  });

  const updateFilterThumb = () => {
    const scroller = filterScrollerRef.current;
    if (!scroller) return;

    const { scrollLeft, scrollWidth, clientWidth } = scroller;
    const overflows = scrollWidth > clientWidth + 1;
    const width = overflows
      ? Math.max((clientWidth / scrollWidth) * 100, 18)
      : 100;
    const maxLeft = 100 - width;
    const left = overflows
      ? (scrollLeft / (scrollWidth - clientWidth)) * maxLeft
      : 0;

    setFilterThumb({ width, left, overflows });
  };

  const onFilterPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const target = event.target as HTMLElement;
    if (!target.closest("button")) return;

    const scroller = filterScrollerRef.current;
    if (!scroller) return;

    filterDragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
      moved: false,
    };
  };

  const onFilterPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = filterScrollerRef.current;
    const drag = filterDragRef.current;
    if (!scroller || !drag.active) return;

    const hit = document.elementFromPoint(event.clientX, event.clientY);
    if (!hit?.closest("button")) {
      drag.active = false;
      return;
    }

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) <= 4) return;

    drag.moved = true;
    scroller.scrollLeft = drag.scrollLeft - delta;
  };

  const onFilterPointerUp = () => {
    filterDragRef.current.active = false;
  };

  useEffect(() => {
    updateFilterThumb();
    window.addEventListener("resize", updateFilterThumb);
    return () => window.removeEventListener("resize", updateFilterThumb);
  }, []);

  const visiblePeople =
    selectedFilter === null || selectedFilter === "All"
      ? industryPeople
      : industryPeople.filter((person) => person.position === selectedFilter);

  return (
    <section
      id="industry"
      className="w-full px-4 py-16 text-black sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <h2
          className="flex items-center gap-10 leading-none"
          style={{
            filter: "drop-shadow(0px 2.79px 2.79px rgba(0, 0, 0, 0.25))",
          }}
        >
          <Image
            src="/diamond.svg"
            alt=""
            width={43}
            height={48}
            className="block h-9 w-auto"
            aria-hidden
          />
          <span className="from-white-100 font-fraunces inline-block bg-linear-to-b to-orange-500 bg-clip-text pb-[0.2em] text-[32px] font-semibold leading-[1.35] tracking-normal text-transparent">
            Industry
          </span>
          <Image
            src="/diamond.svg"
            alt=""
            width={43}
            height={48}
            className="block h-9 w-auto"
            aria-hidden
          />
        </h2>

        <div className="relative z-1 mt-8 w-full">
          <div
            ref={filterScrollerRef}
            onScroll={updateFilterThumb}
            onPointerDown={onFilterPointerDown}
            onPointerMove={onFilterPointerMove}
            onPointerUp={onFilterPointerUp}
            onPointerCancel={onFilterPointerUp}
            onPointerLeave={onFilterPointerUp}
            className="w-full touch-pan-x overflow-x-auto [scrollbar-width:none] select-none [&::-webkit-scrollbar]:hidden max-sm:cursor-grab max-sm:active:cursor-grabbing"
          >
          <div className="mx-auto flex w-max items-center gap-3 px-1 sm:gap-10">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => {
                if (filterDragRef.current.moved) {
                  filterDragRef.current.moved = false;
                  return;
                }
                setSelectedFilter((current) =>
                  current === filter.id ? null : filter.id,
                );
              }}
              aria-pressed={selectedFilter === filter.id}
              className={`font-fraunces shrink-0 rounded-xl border-[1.5px] px-7 py-0.5 text-xl leading-tight font-medium transition-colors duration-300 ease-in-out sm:text-2xl ${
                selectedFilter === filter.id
                  ? filter.activeClassName
                  : filter.idleClassName
              }`}
              style={{
                filter: "drop-shadow(0px 2.79px 2.79px rgba(0, 0, 0, 0.25))",
              }}
            >
              {filter.label}
            </button>
          ))}
          </div>
          </div>
          {filterThumb.overflows && (
          <div className="relative mt-2 h-1.5" aria-hidden>
            <div
              className="absolute top-0 h-full rounded-full bg-[#bdbdbd]"
              style={{
                width: `${filterThumb.width}%`,
                left: `${filterThumb.left}%`,
              }}
            />
          </div>
          )}
        </div>

        <ul className="mt-12 grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-4">
          {visiblePeople.map((person, index) => (
            <li
              key={`${person.position}-${index}`}
              className="flex flex-col items-center text-center"
            >
              <div className="group peer relative mt-8 size-28 sm:size-44">
                <Image
                  src={flowers[person.position].src}
                  alt=""
                  width={flowers[person.position].width}
                  height={flowers[person.position].height}
                  aria-hidden
                  className={`pointer-events-none absolute top-1/2 left-1/2 h-auto max-w-none opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 ${flowers[person.position].className}`}
                />
                <div
                  className={`relative z-1 size-full overflow-hidden rounded-full border-4 ${ringColor[person.position]}`}
                  style={{
                    filter: "drop-shadow(0px 2.79px 2.79px rgba(0, 0, 0, 0.25))",
                  }}
                >
                  <Image
                    src="/industry/scotty.jpeg"
                    alt=""
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="transition-transform duration-700 ease-out peer-hover:translate-y-4 peer-hover:[&>p:first-child]:scale-110">
                <p
                  className="font-fraunces text-white-100 relative z-1 mt-3 origin-center text-base font-medium transition-transform duration-500 ease-out md:text-lg xl:text-2xl"
                  style={{
                    filter: "drop-shadow(0px 2.79px 2.79px rgba(0, 0, 0, 0.25))",
                  }}
                >
                  {person.name}
                </p>
                <p
                  className="font-fraunces text-white-100 relative z-1 text-sm md:text-base xl:text-xl"
                  style={{
                    filter: "drop-shadow(0px 2.79px 2.79px rgba(0, 0, 0, 0.25))",
                  }}
                >
                  {person.title} @ {person.company}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Industry;
