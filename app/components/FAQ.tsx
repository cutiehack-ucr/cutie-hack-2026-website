"use client";

import Image from "next/image";
import { useState } from "react";

const faqItems = [
  {
    question: "What is Cutie Hack?",
    answer:
      "Cutie Hack is ACM at UCR’s 12 hour, beginner-friendly hackathon hosted at UC Riverside.",
  },
  {
    question: "When does Cutie Hack start/end and where does it take place?",
    answer:
      "Hacking is on November 21 at 8 AM to 8 PM at UC Riverside (Winston Chung Hall). Opening Ceremony takes place before hacking starts and Closing Ceremony occurs after hacking and judging ends.",
  },
  {
    question: "Who can come to Cutie Hack?",
    answer:
      "Cutie Hack is open to all years, majors, and skill levels across college students, industry professionals, etc. Engineers, designers, business enthusiasts, and more are welcome (knowing how to code prior to the hackathon is not required).",
  },
  {
    question: "What if I'm a beginner?",
    answer:
      "Prior to and throughout the day of the hackathon, we have dedicated workshops, curated resources, mentors, and more to provide beginners the opportunity to grow their skills.",
  },
  {
    question: "What if I can't code?",
    answer:
      "No problem! Beginners and non-coders alike can develop skills.",
  },
  {
    question: "Do I have to hack or make a project?",
    answer:
      "Nope! While we encourage creating a project, you're welcome to join for the workshops, activities, free food, free swag, and more!",
  },
  {
    question: "Do I need to be there when check in starts?",
    answer:
      "Nope! Hackers are allowed to check in throughout the day.",
  },
  {
    question: "Do I have to be there for judging?",
    answer:
      "The majority of your team must be present in person (Winston Chung 205/206) for judging in order to be considered for our tracks and prizes.",
  },
  {
    question: "Am I required to be there for the full time?",
    answer:
      "Nope! Hackers are allowed to work on their projects virtually, but will be required to be completely in person for judging.",
  },
  {
    question: "What if I have more questions?",
    answer:
      "Further rules can be found through Instagram, Discord, Devpost, and email.",
  },
];

const mid = 6;
const columns = [faqItems.slice(0, mid), faqItems.slice(mid)];

function Diamond() {
  return (
    <Image
      src="/red_diamond.svg"
      alt=""
      width={30}
      height={33}
      className="shrink-0"
      aria-hidden
    />
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative flex w-full scroll-mt-20 flex-col items-center overflow-x-clip px-4 pb-[1.74vw]"
    >
      <div className="relative aspect-1167/494 w-[81vw] max-lg:aspect-320/249 max-lg:w-screen">
        <Image
          src="/faq/FAQ + footer arch.svg"
          alt=""
          width={1167}
          height={2645}
          className="pointer-events-none absolute top-0 left-1/2 h-auto w-[81vw] max-w-none -translate-x-1/2 select-none max-lg:hidden"
          priority
          aria-hidden
        />
        <Image
          src="/faq/faq entrance bg.svg"
          alt=""
          width={320}
          height={274}
          className="pointer-events-none absolute top-0 left-0 z-2 hidden h-auto w-full max-w-none select-none max-lg:block"
          aria-hidden
        />

        <div className="max-lg:from-gold-500 max-lg:to-brown-700 absolute top-full left-1/2 z-3 mt-[calc(39.29%-26.6px)] aspect-930/767 w-[65.97vw] -translate-x-1/2 max-lg:mt-[calc(36%-19.9px)] max-lg:aspect-auto max-lg:min-h-[305vw] max-lg:w-[90vw] max-lg:rounded-xl max-lg:bg-linear-to-br">
          <Image
            src="/faq/faqPanel.svg"
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 66vw"
            className="pointer-events-none object-fill max-lg:hidden"
            aria-hidden
          />
          <div
            className="bg-white-100 pointer-events-none absolute inset-[6px] hidden rounded-[6px] max-lg:block"
            aria-hidden
          />

          <div className="relative z-1 flex h-full flex-col px-[8%] pt-[7%] pb-[8%] max-lg:h-auto max-lg:p-6">
            <h2 className="mb-[4%] flex shrink-0 items-center justify-center gap-[clamp(16px,3vw,40px)] leading-none">
              <Diamond />
              <span className="font-fraunces text-2xl font-bold tracking-normal text-red-500 lg:text-4xl">
                FAQ
              </span>
              <Diamond />
            </h2>

            <div className="after:bg-gold-500 relative grid min-h-0 flex-1 grid-cols-2 gap-x-[clamp(16px,3.3vw,64px)] gap-y-[clamp(8px,1.7vw,32px)] after:pointer-events-none after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] after:-translate-x-1/2 max-lg:flex-none max-lg:grid-cols-1 max-lg:after:hidden">
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-col gap-[1.4vw]"
                >
                  {col.map((item, itemIndex) => {
                    const index = colIndex * mid + itemIndex;
                    return (
                      <div key={index}>
                        <button
                          type="button"
                          className="font-labrada flex w-full cursor-pointer items-start justify-between gap-[1.25vw] border-none bg-transparent py-0 text-left text-[1.528vw] text-red-700 max-lg:gap-[4.8vw] max-lg:text-[5.2vw]"
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                        >
                          <span
                            aria-hidden
                            className={`mt-[0.8vw] ml-[1.5vw] flex shrink-0 items-center justify-center transition-transform duration-300 ease-out ${openIndex === index ? "rotate-90" : "rotate-0"} max-lg:mt-[3vw]`}
                          >
                            <Image
                              src="/expandArrow.svg"
                              alt="expandArrow"
                              height={10}
                              width={10}
                              className="h-auto w-[0.5vw] max-lg:w-[1.5vw]"
                            />
                          </span>
                          <span className="font-labrada mr-[2.22vw] flex-1 max-lg:mr-[8vw]">
                            {item.question}
                          </span>
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            openIndex === index
                              ? "grid-rows-[1fr]"
                              : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="font-labrada pl-[3.25vw] pr-[2.43vw] -pt-[10vw] text-[1.25vw] leading-normal text-red-500 max-lg:px-[8vw] max-lg:pt-[1.07vw] max-lg:pb-[2.67vw] max-lg:text-[4.2vw]">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Image
        src="/faq/FAQ bg checkers.svg"
        alt=""
        width={1440}
        height={1079}
        className="pointer-events-none z-1 mt-[-1.74vw] h-auto w-screen max-w-none select-none max-lg:hidden"
        aria-hidden
      />
      <Image
        src="/faq/FAQ bg checkers mobile.svg"
        alt=""
        width={320}
        height={1186}
        className="pointer-events-none z-1 mt-[-1.74vw] hidden h-auto w-screen max-w-none select-none max-lg:block"
        aria-hidden
      />
      <Image
        src="/faq/footer bg checkers.svg"
        alt=""
        width={1439}
        height={1094}
        className="pointer-events-none z-[-1] mt-[-20.5vw] h-auto w-[99.6vw] max-w-none select-none max-lg:hidden"
        aria-hidden
      />
      <Image
        src="/faq/transition bushes.svg"
        alt=""
        width={320}
        height={76}
        className="pointer-events-none absolute -bottom-10 left-0 z-5 hidden h-auto w-screen max-w-none select-none max-lg:block"
        aria-hidden
      />
      <div className="group pointer-events-none absolute inset-0 z-20">
        <div
          aria-hidden
          className="pointer-events-auto absolute top-[12vw] right-0 left-0 h-[45vw] max-lg:hidden"
        />
        <div className="pointer-events-none absolute top-[16.5vw] left-[6vw] h-auto w-[26vw] max-w-none select-none max-lg:top-[27vw] max-lg:-left-[11.5vw] max-lg:w-[56vw] max-lg:rotate-5">
          <Image
            src="/faq/guardL.svg"
            alt=""
            width={721}
            height={570}
            className="pointer-events-none h-auto w-full"
            aria-hidden
          />
          <Image
            src="/faq/spearL.svg"
            alt="guard left spear"
            width={657.32}
            height={267.78}
            className="pointer-events-none relative bottom-[36vw] -left-[5vw] h-auto w-[50vw] max-w-none transition-transform duration-500 ease-out lg:group-hover:-translate-x-[9vw] lg:group-hover:translate-y-[4.5vw] max-lg:bottom-[75vw] max-lg:-left-[7vw] max-lg:w-[100vw]"
            aria-hidden
          />
          <Image
            src="/faq/hand.svg"
            alt="guard left hand"
            width={52.5}
            height={52.5}
            className="pointer-events-none relative max-w-none h-auto w-[5.05vw] bottom-[43.1vw] left-[1.9vw] max-lg:w-[10.9vw] max-lg:bottom-[88.7vw] max-lg:left-[4.1vw]"
          />
        </div>
        <div className="pointer-events-none absolute top-[16.5vw] right-[6vw] h-auto w-[26vw] max-w-none select-none max-lg:top-auto max-lg:-bottom-[35vw] max-lg:-right-[11.5vw] max-lg:w-[56vw] max-lg:-rotate-5">
          <Image
            src="/faq/guardR.svg"
            alt="guard right"
            width={721}
            height={570}
            className="pointer-events-none h-auto w-full"
            aria-hidden
          />
          <Image
            src="/faq/spearR.svg"
            alt="guard right spear"
            width={657.32}
            height={267.78}
            className="pointer-events-none relative bottom-[36vw] right-[19vw] h-auto w-[50vw] max-w-none transition-transform duration-500 ease-out lg:group-hover:translate-x-[9vw] lg:group-hover:translate-y-[4.5vw] max-lg:bottom-[75vw] max-lg:right-[36vw] max-lg:w-[100vw]"
            aria-hidden
          />
          <Image
            src="/faq/hand.svg"
            alt="guard right hand"
            width={52.5}
            height={52.5}
            className="pointer-events-none relative max-w-none h-auto w-[5.05vw] bottom-[43vw] -right-[18.9vw] scale-x-[-1] max-lg:w-[10.9vw] max-lg:-right-[41vw] max-lg:bottom-[88.5vw]"
          />
        </div>
      </div>
    </section>
  );
}
