"use client";

import Image from "next/image";
import { useState } from "react";

type Track = {
  id: string;
  name: string;
  frontImage: string;
  backImage: string;
  width: number;
  height: number;
  kind: "bottle" | "cookie";
};

const TRACKS: Track[] = [
  {
    id: "second-overall",
    name: "2nd Overall",
    frontImage: "/tracks/trackCardFront/second.svg",
    backImage: "/tracks/trackCardBack/second.svg",
    width: 193,
    height: 312,
    kind: "bottle",
  },
  {
    id: "first-overall",
    name: "1st Overall",
    frontImage: "/tracks/trackCardFront/first.svg",
    backImage: "/tracks/trackCardBack/first.svg",
    width: 193,
    height: 312,
    kind: "bottle",
  },
  {
    id: "third-overall",
    name: "3rd Overall",
    frontImage: "/tracks/trackCardFront/third.svg",
    backImage: "/tracks/trackCardBack/third.svg",
    width: 201,
    height: 324,
    kind: "bottle",
  },
  {
    id: "beginner",
    name: "Beginner",
    frontImage: "/tracks/trackCardFront/beginner.svg",
    backImage: "/tracks/trackCardBack/beginner.svg",
    width: 212,
    height: 234,
    kind: "cookie",
  },
  {
    id: "most-on-theme",
    name: "Most on Theme",
    frontImage: "/tracks/trackCardFront/theme.svg",
    backImage: "/tracks/trackCardBack/theme.svg",
    width: 230,
    height: 231,
    kind: "cookie",
  },
  {
    id: "social-impact",
    name: "Social Impact",
    frontImage: "/tracks/trackCardFront/social.svg",
    backImage: "/tracks/trackCardBack/social.svg",
    width: 206,
    height: 210,
    kind: "cookie",
  },
  {
    id: "ai-ml-data",
    name: "AI/ML + Data",
    frontImage: "/tracks/trackCardFront/ai.svg",
    backImage: "/tracks/trackCardBack/ai.svg",
    width: 197,
    height: 225,
    kind: "cookie",
  },
  {
    id: "hardware-build",
    name: "Hardware Build",
    frontImage: "/tracks/trackCardFront/hardware.svg",
    backImage: "/tracks/trackCardBack/hardware.svg",
    width: 222,
    height: 203,
    kind: "cookie",
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    frontImage: "/tracks/trackCardFront/ui.svg",
    backImage: "/tracks/trackCardBack/ui.svg",
    width: 193,
    height: 211,
    kind: "cookie",
  },
];

const cardFlipper =
  "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-out";
const cardFace =
  "absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";

const cookies = TRACKS.filter((track) => track.kind === "cookie");
const secondOverall = TRACKS.find((track) => track.id === "second-overall")!;
const firstOverall = TRACKS.find((track) => track.id === "first-overall")!;
const thirdOverall = TRACKS.find((track) => track.id === "third-overall")!;

const SectionTitle = ({ children }: { children: string }) => (
  <h2
    className="flex items-center justify-center gap-3 leading-none sm:gap-10"
    style={{ filter: "drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.25))" }}
  >
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

const TrackCard = ({
  track,
  className = "",
  isFlipped,
  onToggle,
}: {
  track: Track;
  className?: string;
  isFlipped: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      tabIndex={0}
      role="button"
      aria-label={`${track.name} card, ${
        isFlipped ? "showing description" : "click to flip"
      }`}
      aria-pressed={isFlipped}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
      className={`cursor-pointer [perspective:1000px] focus-visible:outline-none ${className}`}
      style={{ aspectRatio: `${track.width} / ${track.height}` }}
    >
      <div className="h-full w-full transition-transform duration-300 ease-out hover:scale-[1.03] [transform-style:preserve-3d]">
        <div
          className={[
            cardFlipper,
            isFlipped ? "[transform:rotateY(180deg)]" : "",
          ].join(" ")}
        >
          <div className={`${cardFace} [transform:rotateY(0deg)]`}>
            <Image
              src={track.frontImage}
              alt=""
              width={track.width}
              height={track.height}
              className="h-full w-full select-none object-contain"
              aria-hidden
            />
          </div>

          <div className={`${cardFace} [transform:rotateY(180deg)]`}>
            <Image
              src={track.backImage}
              alt=""
              width={track.width}
              height={track.height}
              className="h-full w-full select-none object-contain"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Tracks = () => {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const cardProps = (track: Track) => ({
    track,
    isFlipped: flippedIds.has(track.id),
    onToggle: () => toggleFlip(track.id),
  });

  return (
    <section
      id="tracks"
      className="relative z-0 w-full overflow-visible px-4 pb-20 pt-24 text-white-100 sm:px-10 md:pb-24 md:pt-28 lg:px-16"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 w-[160%] max-w-none -translate-x-1/2 -translate-y-[7%] md:hidden"
        aria-hidden
      >
        <Image
          src="/tracks/mobileTreeBackground.svg"
          alt=""
          width={526}
          height={1685}
          className="h-auto w-full max-w-none"
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 hidden w-[145%] max-w-none -translate-x-1/2 -translate-y-[18%] md:block lg:w-[150%] lg:-translate-y-[20%]"
        aria-hidden
      >
        <Image
          src="/tracks/treesBg.svg"
          alt=""
          width={1342}
          height={1553}
          className="h-auto w-full max-w-none"
        />
      </div>

      <div className="relative z-1 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 md:gap-10 lg:max-w-5xl lg:gap-14 lg:pt-8">
        <div className="flex flex-col items-center gap-2">
          <SectionTitle>Tracks</SectionTitle>
          <p className="text-center font-labrada text-sm text-white-100 sm:text-base md:hidden">
            Tap to read description!
          </p>
        </div>

        <div className="flex w-full max-w-[22.5rem] flex-col items-center gap-3 md:hidden">
          <TrackCard {...cardProps(firstOverall)} className="w-[43%]" />
          <div className="flex w-full items-start justify-center gap-5">
            <TrackCard {...cardProps(secondOverall)} className="w-[43%]" />
            <TrackCard {...cardProps(thirdOverall)} className="w-[43%]" />
          </div>
        </div>

        <div className="hidden w-full max-w-3xl grid-cols-3 items-end gap-x-8 md:grid lg:mt-2 lg:max-w-5xl lg:gap-x-10">
          <TrackCard
            {...cardProps(secondOverall)}
            className="w-full max-w-[10.5rem] justify-self-center lg:max-w-[13rem]"
          />
          <TrackCard
            {...cardProps(firstOverall)}
            className="mb-6 w-full max-w-[10.5rem] justify-self-center lg:mb-10 lg:max-w-[13rem]"
          />
          <TrackCard
            {...cardProps(thirdOverall)}
            className="w-full max-w-[10.5rem] justify-self-center lg:max-w-[13rem]"
          />
        </div>

        <div className="grid w-full max-w-[22.5rem] grid-cols-2 items-center place-items-center gap-x-3 gap-y-5 md:hidden">
          {cookies.map((track) => (
            <TrackCard
              key={track.id}
              {...cardProps(track)}
              className="w-[94%]"
            />
          ))}
        </div>

        <div className="hidden w-full max-w-3xl grid-cols-3 items-center gap-x-8 gap-y-8 md:grid lg:max-w-5xl lg:gap-x-10 lg:gap-y-10">
          {cookies.map((track) => (
            <TrackCard
              key={track.id}
              {...cardProps(track)}
              className="w-full max-w-[12rem] justify-self-center self-center lg:max-w-[14.5rem]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
