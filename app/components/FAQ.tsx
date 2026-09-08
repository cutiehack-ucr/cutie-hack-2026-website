"use client";

import Image from "next/image";
import { useState } from "react";

const faqItems = [
  {
    question: "What is Cutie Hack?",
    answer:
      "A hackathon is an event where participants work together to build projects and learn new skills.",
  },
  {
    question: "When does Cutie Hack start/end and where does it take place?",
    answer:
      "Cutie Hack is open to college students of different majors and experience levels.",
  },
  {
    question: "Who can come to Cutie Hack?",
    answer:
      "No! Cutie Hack is beginner-friendly and prior coding experience is not required.",
  },
  {
    question: "What if I'm a beginner?",
    answer:
      "No. You can also attend workshops, activities, and other hackathon events.",
  },
  {
    question: "What if I can't code?",
    answer:
      "You can reach out through Discord, Instagram, or email for additional information.",
  },
  {
    question: "Do I have to hack or make a project?",
    answer:
      "You can reach out through Discord, Instagram, or email for additional information.",
  },
  {
    question: "Do I need to be there when check in starts?",
    answer:
      "You can reach out through Discord, Instagram, or email for additional information.",
  },
  {
    question: "Do I have to be there for judging?",
    answer:
      "You can reach out through Discord, Instagram, or email for additional information.",
  },
  {
    question: "Am I required to be there for the full time?",
    answer:
      "You can reach out through Discord, Instagram, or email for additional information.",
  },
  {
    question: "What if I have more questions?",
    answer:
      "You can reach out through Discord, Instagram, or email for additional information.",
  },
];

const mid = Math.ceil(faqItems.length / 2);
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
  const [openKey, setOpenKey] = useState<string | null>(null);

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
          className="pointer-events-none absolute top-0 left-0 h-auto w-full max-w-none select-none max-lg:hidden"
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

        <div className="max-lg:from-gold-500 max-lg:to-brown-700 absolute top-full left-1/2 z-3 mt-[calc(39.29%-26.6px)] aspect-930/767 w-[min(78vw,950px)] -translate-x-1/2 max-lg:mt-[calc(36%-19.9px)] max-lg:aspect-auto max-lg:min-h-[min(300vw,1735px)] max-lg:w-[min(90vw,520px)] max-lg:rounded-xl max-lg:bg-linear-to-br">
          <Image
            src="/faq/faqPanel.svg"
            alt=""
            fill
            sizes="(max-width: 1024px) 90vw, 950px"
            className="pointer-events-none object-fill max-lg:hidden"
            aria-hidden
          />
          <div
            className="bg-white-100 pointer-events-none absolute inset-[6px] hidden rounded-[6px] max-lg:block"
            aria-hidden
          />

          <div className="relative z-1 flex h-full flex-col px-[8%] pt-[7%] pb-[8%] max-lg:h-auto max-lg:p-6">
            <h2 className="mb-[4%] flex shrink-0 items-center justify-center gap-[clamp(1rem,3vw,2.5rem)] leading-none">
              <Diamond />
              <span className="font-fraunces text-2xl font-bold tracking-normal text-red-500 lg:text-4xl">
                FAQ
              </span>
              <Diamond />
            </h2>

            <div className="after:bg-gold-500 relative grid min-h-0 flex-1 grid-cols-2 gap-x-[clamp(28px,4vw,64px)] gap-y-[clamp(16px,2.4vw,32px)] after:pointer-events-none after:absolute after:inset-y-0 after:left-1/2 after:w-px after:-translate-x-1/2 max-lg:flex-none max-lg:grid-cols-1 max-lg:after:hidden">
              {columns.map((col, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-[clamp(10px,1.2vw,16px)]"
                >
                  {col.map((item) => {
                    const isOpen = openKey === item.question;
                    return (
                      <div key={item.question}>
                        <button
                          type="button"
                          className="font-fraunces flex w-full cursor-pointer items-start justify-between gap-[clamp(12px,1.4vw,18px)] border-none bg-transparent py-2 text-left text-2xl text-red-700"
                          aria-expanded={isOpen}
                          onClick={() =>
                            setOpenKey(isOpen ? null : item.question)
                          }
                        >
                          <span
                            aria-hidden
                            className="font-fraunces shrink-0 text-red-700"
                          >
                            {isOpen ? "▴" : "▾"}
                          </span>
                          <span className="flex-1">{item.question}</span>
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="font-fraunces px-6 pt-1 pb-2.5 text-lg leading-normal text-red-500">
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
      <Image
        src="/faq/faq_guard_L.svg"
        alt=""
        width={721}
        height={570}
        className="pointer-events-none absolute top-[calc(35.56vw-12.5%-18px)] left-[max(-8%,calc(38%-min(39vw,310px)-clamp(90px,16vw,260px)))] z-20 h-auto w-[clamp(340px,56vw,700px)] max-w-none select-none max-lg:top-[calc(105vw-min(90.9vw,494px))] max-lg:left-5 max-lg:w-[min(115vw,625px)] max-lg:translate-x-[-19%]"
        aria-hidden
      />
      <Image
        src="/faq/faq_guard_R.svg"
        alt=""
        width={721}
        height={570}
        className="pointer-events-none absolute top-[calc(35.56vw-12.5%-18px)] right-[max(-8%,calc(38%-min(39vw,310px)-clamp(90px,16vw,260px)))] z-20 h-auto w-[clamp(340px,56vw,700px)] max-w-none select-none max-lg:top-auto max-lg:right-5 max-lg:bottom-[0%] max-lg:w-[min(115vw,625px)] max-lg:translate-x-[19%]"
        aria-hidden
      />
    </section>
  );
}
