"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RoleCard = {
  id: string;
  name: string;
  description: string;
  image: string;
  applyHref?: string;
};

const roles: RoleCard[] = [
  {
    id: "participant",
    name: "Participant",
    image: "/register/participant.svg",
    description:
      "Participants can build with the freedom of their creativity across a variety of fields from software, hardware, AI/ML, data science, AR/VR, game development, and more!",
    applyHref: "https://athena-wheat.vercel.app/cutiehack/forms/participant",
  },
  {
    id: "mentor",
    name: "Mentor",
    image: "/register/mentor.svg",
    description:
      "Meet a variety of hackers across engineering, design, and more. Guide hackers by providing project insight and advice.",
    applyHref: "https://www.google.com",
  },
  {
    id: "judge",
    name: "Judge",
    image: "/register/judge.svg",
    description:
      "Industry professionals, researchers, and more that assess innovative hacker projects based on idea, value, technical complexity, feasibility, and scalability across hackathon tracks.",
    applyHref: "https://www.google.com",
  },
  {
    id: "speaker",
    name: "Speaker",
    image: "/register/speaker.svg",
    description:
      "Help teach hackers technical and professional development skills. Answer questions and provide insight into career growth, fields, and more.",
    applyHref: "https://www.google.com",
  },
  {
    id: "sponsor",
    name: "Sponsor",
    image: "/register/sponsor.svg",
    description:
      "Companies and individuals that want to help Cutie Hack come to life through monetary support, food, swag, digital credits, and more! If you are interested in contributing, contact us at cutiehack@gmail.com.",
  },
  {
    id: "volunteer",
    name: "Volunteer",
    image: "/register/volunteer.svg",
    description:
      "Help out our organizing team directly on the day of the hackathon through shifts, including answering general inquiries from hackers, distributing meals, and more.",
    applyHref: "https://athena-wheat.vercel.app/cutiehack/forms/volunteer",
  },
];

const cardFlipper =
  "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-out";
const cardFace =
  "absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";
const cardShell = "flex h-full flex-col rounded-[10px] bg-white-100 p-5";
const cardFrame =
  "flex min-h-0 flex-1 flex-col rounded-[8px] p-[2px] bg-[conic-gradient(from_90deg,var(--color-brown-700)_0deg,var(--color-gold-500)_360deg)]";
const cardInner =
  "flex min-h-0 flex-1 flex-col overflow-hidden rounded-[6px] bg-linear-to-b from-white-100 to-gray-100";
const applyButton =
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-gold-500 font-fraunces font-semibold shadow-md transition-colors duration-200 ease-out hover:border-gold-500 hover:bg-linear-to-b hover:from-white-100 hover:to-gold-500";

const RegisterHeading = () => (
  <h2 className="flex items-center gap-10 leading-none">
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className="block h-9 w-auto"
      aria-hidden
    />
    <span className="from-white-100 font-fraunces bg-linear-to-b to-orange-500 bg-clip-text text-[32px] font-semibold tracking-normal text-transparent">
      Register
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
);

const RegisterCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const slides = root.querySelectorAll<HTMLElement>("[data-role-slide]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.roleSlide);
        if (!Number.isNaN(index)) setActiveIndex(index);
      },
      { root, threshold: 0.55 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    const root = scrollerRef.current;
    const slide = root?.querySelector<HTMLElement>(
      `[data-role-slide="${index}"]`,
    );
    if (!root || !slide) return;

    const left = slide.offsetLeft - (root.clientWidth - slide.offsetWidth) / 2;
    root.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 xl:hidden">
      <p className="font-fraunces text-white-100 max-w-md px-2 text-center text-base leading-relaxed sm:text-lg">
        Apply as a <strong>participant</strong>, <strong>mentor</strong>,{" "}
        <strong>judge</strong>, <strong>speaker</strong>,{" "}
        <strong>sponsor</strong>, or <strong>volunteer</strong>!
      </p>

      <div
        ref={scrollerRef}
        className="ml-[calc(50%-50vw)] flex w-screen max-w-[100vw] snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-[8%] pt-1 pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {roles.map((role, index) => (
          <article
            key={role.id}
            data-role-slide={index}
            className="bg-white-100 flex w-[84vw] shrink-0 snap-center flex-col rounded-[10px] p-5 text-blue-900"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-fraunces text-xl font-semibold tracking-wide uppercase sm:text-2xl">
                {role.name}
              </h3>
              <Image
                src={role.image}
                alt=""
                width={90}
                height={103}
                className="h-16 w-auto shrink-0 object-contain sm:h-20"
              />
            </div>

            <div className={`${cardFrame} min-h-40`}>
              <div className={`${cardInner} gap-3 p-4`}>
                <p className="font-labrada text-center text-[18px] leading-normal font-normal tracking-normal">
                  {role.description}
                </p>
                {role.applyHref && (
                  <a
                    href={role.applyHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${applyButton} mt-auto h-10 w-full text-sm sm:text-base`}
                  >
                    Apply as {role.name}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2.5" role="tablist">
        {roles.map((role, index) => (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-label={`Show ${role.name} card`}
            aria-selected={activeIndex === index}
            onClick={() => goTo(index)}
            className={[
              "h-2.5 w-2.5 rounded-full transition",
              activeIndex === index
                ? "bg-white"
                : "border border-white bg-transparent",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
};

const Register = () => {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      id="register"
      className="w-full px-6 py-16 text-black sm:px-14 lg:px-20"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 xl:gap-16">
        <RegisterHeading />

        <RegisterCarousel />

        <div className="hidden w-full grid-cols-1 gap-x-20 gap-y-16 xl:grid xl:grid-cols-3">
          {roles.map((role) => {
            const isFlipped = flippedIds.has(role.id);

            return (
              <div
                key={role.id}
                tabIndex={0}
                aria-label={`${role.name} card, ${
                  isFlipped ? "showing description" : "click to flip"
                }`}
                onClick={() => toggleFlip(role.id)}
                onKeyDown={(event) => {
                  if (event.target !== event.currentTarget) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleFlip(role.id);
                  }
                }}
                className="aspect-[3/2] w-full cursor-pointer [perspective:1000px] focus-visible:outline-none"
              >
                <div className="h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] hover:scale-[1.03]">
                  <div
                    className={[
                      cardFlipper,
                      isFlipped ? "[transform:rotateY(180deg)]" : "",
                    ].join(" ")}
                  >
                    <div className={`${cardFace} [transform:rotateY(0deg)]`}>
                      <div className={cardShell}>
                        <div className={cardFrame}>
                          <div className={cardInner}>
                            <div className="flex min-h-0 flex-1 items-end justify-center px-4 pt-6 pb-1">
                              <Image
                                src={role.image}
                                alt=""
                                width={90}
                                height={103}
                                className="h-20 w-auto object-contain sm:h-24"
                              />
                            </div>
                            <div className="flex shrink-0 justify-center px-4 pt-1 pb-6">
                              <span className="font-fraunces text-xl font-semibold tracking-wide text-blue-900 uppercase sm:text-2xl">
                                {role.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`${cardFace} [transform:rotateY(180deg)]`}>
                      <div className={cardShell}>
                        <div className={cardFrame}>
                          <div className={`${cardInner} px-4 py-3`}>
                            <p className="font-labrada min-h-0 flex-1 overflow-y-auto text-left text-sm leading-normal font-normal tracking-normal">
                              {role.description}
                            </p>
                            {role.applyHref && (
                              <a
                                href={role.applyHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                onKeyDown={(event) => event.stopPropagation()}
                                className={`${applyButton} mt-2 h-8 w-48 self-end px-3 text-center text-xs sm:text-sm`}
                              >
                                Apply as {role.name}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Register;
