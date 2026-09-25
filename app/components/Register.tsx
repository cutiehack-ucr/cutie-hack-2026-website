"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RoleCard = {
  id: string;
  name: string;
  description: string;
  applyHref?: string;
};

const roles: RoleCard[] = [
  {
    id: "participant",
    name: "Participant",
    description:
      "Participants can build with the freedom of their creativity across a variety of fields from software, hardware, AI/ML, data science, AR/VR, game development, and more!",
    applyHref: "https://athena-wheat.vercel.app/cutiehack/forms/participant",
  },
  {
    id: "mentor",
    name: "Mentor",
    description:
      "Meet a variety of hackers across engineering, design, and more. Guide hackers by providing project insight and advice.",
    applyHref: "https://www.google.com",
  },
  {
    id: "judge",
    name: "Judge",
    description:
      "Industry professionals, researchers, and more that assess innovative hacker projects based on idea, value, technical complexity, feasibility, and scalability across hackathon tracks.",
    applyHref: "https://www.google.com",
  },
  {
    id: "speaker",
    name: "Speaker",
    description:
      "Help teach hackers technical and professional development skills. Answer questions and provide insight into career growth, fields, and more.",
    applyHref: "https://www.google.com",
  },
  {
    id: "sponsor",
    name: "Sponsor",
    description:
      "Companies and individuals that want to help Cutie Hack come to life through monetary support, food, swag, digital credits, and more! If you are interested in contributing, contact us at cutiehack@gmail.com.",
  },
  {
    id: "volunteer",
    name: "Volunteer",
    description:
      "Help out our organizing team directly on the day of the hackathon through shifts, including answering general inquiries from hackers, distributing meals, and more.",
    applyHref: "https://athena-wheat.vercel.app/cutiehack/forms/volunteer",
  },
];

const cardFlipper =
  "relative h-full w-full [transform-style:preserve-3d] transition-transform duration-500 ease-out";
const cardFace =
  "absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";
const registerDropShadow =
  "drop-shadow-[0_8px_4px_rgba(0,0,0,0.25)]";
const registerButtonShadow =
  "shadow-[0_2.13px_4.26px_0_rgba(0,0,0,0.25)]";
const applyButton =
  `inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-gold-500 font-fraunces font-normal ${registerButtonShadow} transition-colors duration-200 ease-out hover:border-gold-500 hover:bg-linear-to-b hover:from-white-100 hover:to-gold-500`;

const RegisterHeading = () => (
  <h2 className="flex items-center gap-10 pb-1 md:pb-3">
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className={`block h-9 w-auto ${registerDropShadow}`}
      aria-hidden
    />
    <span className="from-white-100 font-fraunces inline-block bg-linear-to-b to-orange-500 bg-clip-text pb-1 text-[32px] font-semibold leading-normal tracking-normal text-transparent [text-shadow:0_8px_4px_rgba(0,0,0,0.25)]">
      Register
    </span>
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className={`block h-9 w-auto ${registerDropShadow}`}
      aria-hidden
    />
  </h2>
);

const RegisterCarousel = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const dragRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
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
    const start = root.scrollLeft;
    const change = left - start;
    cancelAnimationFrame(frameRef.current);
    if (Math.abs(change) < 1) {
      root.style.scrollSnapType = "";
      return;
    }

    root.style.scrollSnapType = "none";
    const duration = Math.min(900, Math.max(560, Math.abs(change) * 1.6));
    const startTime = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
      root.scrollLeft = start + change * eased;
      if (t < 1) {
        frameRef.current = requestAnimationFrame(step);
        return;
      }
      root.style.scrollSnapType = "";
    };

    frameRef.current = requestAnimationFrame(step);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const target = event.target;
    if (target instanceof Element && target.closest("a, button")) return;
    event.preventDefault();
    cancelAnimationFrame(frameRef.current);
    const root = event.currentTarget;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: root.scrollLeft,
      moved: false,
    };
    root.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const root = event.currentTarget;
    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) > 4) drag.moved = true;
    if (!drag.moved) return;
    root.style.cursor = "grabbing";
    root.style.scrollSnapType = "none";
    root.scrollLeft = drag.scrollLeft - delta;
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag.active) return;
    const root = event.currentTarget;
    const moved = drag.moved;
    drag.active = false;
    if (root.hasPointerCapture(event.pointerId)) {
      root.releasePointerCapture(event.pointerId);
    }
    root.style.cursor = "";
    if (!moved) return;

    const slides = [...root.querySelectorAll<HTMLElement>("[data-role-slide]")];
    const center = root.scrollLeft + root.clientWidth / 2;
    const nearest = slides.reduce((closest, slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const closestCenter =
        slides[closest].offsetLeft + slides[closest].offsetWidth / 2;
      return Math.abs(slideCenter - center) < Math.abs(closestCenter - center)
        ? index
        : closest;
    }, 0);
    goTo(nearest);
    requestAnimationFrame(() => {
      drag.moved = false;
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 md:hidden">
      <p className="font-fraunces text-white-100 mb-6 max-w-md px-2 text-center text-base leading-relaxed sm:text-lg">
        Apply as a <strong>participant</strong>, <strong>mentor</strong>,{" "}
        <strong>judge</strong>, <strong>speaker</strong>,{" "}
        <strong>sponsor</strong>, or <strong>volunteer</strong>!
      </p>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (!dragRef.current.moved) return;
          event.preventDefault();
          event.stopPropagation();
        }}
        className="-mx-6 flex w-[calc(100%+3rem)] cursor-grab snap-x snap-proximity select-none [-webkit-user-drag:none] [scrollbar-width:none] gap-4 overflow-x-auto px-[calc((100%-min(84vw,280px))/2)] pt-1 pb-1 [-ms-overflow-style:none] active:cursor-grabbing sm:-mx-14 sm:w-[calc(100%+7rem)] [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none [&_img]:[-webkit-user-drag:none]"
      >
        {roles.map((role, index) => (
          <article
            key={role.id}
            data-role-slide={index}
            className="relative w-[84vw] max-w-[280px] shrink-0 snap-center"
          >
            <Image
              src={`/register/mobile/${role.name}.svg`}
              alt=""
              width={240}
              height={301}
              draggable={false}
              onDragStart={(event) => event.preventDefault()}
              className="pointer-events-none h-auto w-full select-none [-webkit-user-drag:none]"
            />
            <p className="sr-only">
              {role.name}. {role.description}
            </p>
            {role.applyHref && (
              <a
                href={role.applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`${applyButton} absolute bottom-[12%] left-[13%] right-[13%] h-10 rounded-[10px]! text-base sm:text-lg`}
              >
                Apply as {role.name}
              </a>
            )}
          </article>
        ))}
      </div>

      <div className="-mt-3 flex items-center justify-center gap-2.5" role="tablist">
        {roles.map((role, index) => (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-label={`Show ${role.name} card`}
            aria-selected={activeIndex === index}
            onClick={() => goTo(index)}
            className={[
              "h-4 w-4 rounded-full transition",
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
      className="relative z-0 w-full overflow-visible px-6 py-16 text-blue-900 sm:px-14 lg:px-20"
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-0 w-[100%] max-w-none -translate-x-1/2 -translate-y-[1%] xl:hidden"
        aria-hidden
      >
        <Image
          src="/ray_mobile.svg"
          alt=""
          width={320}
          height={2816}
          className="h-auto w-full max-w-none"
        />
      </div>
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-0 hidden w-[105%] max-w-none -translate-x-1/2 -translate-y-[2%] xl:block"
        aria-hidden
      >
        <Image
          src="/ray_desktop.svg"
          alt=""
          width={1440}
          height={3010}
          className="h-auto w-full max-w-none"
        />
      </div>

      <div className="relative z-1 mx-auto flex w-full max-w-6xl flex-col items-center gap-6 md:gap-8 xl:gap-16">
        <RegisterHeading />

        <RegisterCarousel />

        <div className="hidden w-full grid-cols-2 gap-x-8 gap-y-10 md:grid xl:grid-cols-3 xl:gap-x-20 xl:gap-y-16">
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
                className="aspect-[341/227] w-full cursor-pointer [perspective:1000px] focus-visible:outline-none"
              >
                <div className="h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] hover:scale-[1.03]">
                  <div
                    className={[
                      cardFlipper,
                      isFlipped ? "[transform:rotateY(180deg)]" : "",
                    ].join(" ")}
                  >
                    <div className={`${cardFace} [transform:rotateY(0deg)]`}>
                      <Image
                        src={`/register/desktop_front/${role.name}.svg`}
                        alt=""
                        width={341}
                        height={227}
                        draggable={false}
                        className="pointer-events-none h-full w-full"
                      />
                    </div>

                    <div className={`${cardFace} [transform:rotateY(180deg)]`}>
                      <Image
                        src={`/register/desktop_back/${role.name}.svg`}
                        alt=""
                        width={341}
                        height={227}
                        draggable={false}
                        className="pointer-events-none h-full w-full"
                      />
                      <p className="sr-only">{role.description}</p>
                      {role.applyHref && (
                        <a
                          href={role.applyHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          onKeyDown={(event) => event.stopPropagation()}
                          className={`${applyButton} group absolute right-[calc(5.5%+1rem)] bottom-[calc(12.4%+0.75rem)] h-8 w-52 rounded-xl! px-3 text-center text-base`}
                        >
                          <span className="inline-block transition-transform duration-200 ease-out group-hover:scale-90">
                            Apply as {role.name}
                          </span>
                        </a>
                      )}
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
