"use client";

import { GoogleEvent, EventTypes } from "@/app/types/schedule";
import Image from "next/image";

type Props = {
  event: GoogleEvent & { category: EventTypes };
  color: string;
  expanded: boolean;
  onToggle: () => void;
  past?: boolean;
};

const EventCard = ({ event, color, expanded, onToggle, past = false }: Props) => {
  const time = new Date(event.start.dateTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  });
  const [clock, meridiem] = time.split(" ")
  const body = event.description?.split("\n").slice(1).join("\n") ?? "";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-[16px] bg-linear-to-b from-gold-500 to-brown-700 p-[3px] text-left text-black shadow-md ${
        past ? "opacity-50" : ""
      }`}
    >
      <div className="bg-white-100 flex w-full gap-[2.2vw] rounded-[13px] px-3">
        <span
          aria-hidden
          className={`my-2 ml-1 w-[0.7vw] shrink-0 self-stretch rounded-full max-lg:my-4 max-lg:w-[2vw] ${color}`}
        />
        <div className="min-w-0 flex-1 py-3 max-lg:py-5">
          <div className="grid grid-cols-[4.5vw_1fr_auto] items-center gap-x-[1.2vw] max-lg:grid-cols-[1fr_auto] max-lg:gap-y-1">
            <span className="font-fraunces flex flex-col items-center font-semibold text-blue-900 max-lg:flex-row max-lg:items-baseline max-lg:gap-1 max-lg:justify-self-start">
              <span className="text-xl max-lg:text-base">{clock}</span>
              <span className="text-md max-lg:text-base">{meridiem}</span>
            </span>
            <span className="flex flex-col items-start font-fraunces gap-1 max-lg:col-span-2 max-lg:row-start-2">
              <span className="font-bold text-blue-900 text-xl max-lg:text-base">{event.summary}</span>
              <div className="flex items-center gap-2">
                <Image
                  src="/schedule/locationPing.svg"
                  alt=""
                  width={15}
                  height={22}
                  className="h-3.5 w-auto shrink-0 max-lg:h-5"
                  aria-hidden
                />
                <span className="text-lg text-blue-900 font-labrada font-semibold max-lg:text-sm">{event.location}</span>
              </div>
            </span>
            <span className="flex items-center mr-[1vw] gap-1 font-labrada text-xl font-medium text-blue-900 max-lg:col-start-2 max-lg:row-start-1 max-lg:mr-0 max-lg:text-sm">
              {event.category}
              <Image
                src="/schedule/arrow.svg"
                alt=""
                width={30}
                height={30}
                className={`h-6 w-6 shrink-0 transition-transform duration-500 ease-out max-lg:h-4 max-lg:w-4 ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden
              />
            </span>
            <div
              className={`col-start-2 grid transition-[grid-template-rows] duration-300 ease-out max-lg:col-span-2 max-lg:col-start-1 ${
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-2 space-y-1 text-md max-lg:text-sm">
                  {event.location ? <p>{event.location}</p> : null}
                  {body ? <p>{body}</p> : null}
                  <p className="capitalize opacity-80">{event.category}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default EventCard;
