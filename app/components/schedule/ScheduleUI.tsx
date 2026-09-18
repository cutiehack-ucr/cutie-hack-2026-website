"use client";
import { useRef, useState } from "react";
import { GoogleEvent, EventTypes, LABELS } from "@/app/types/schedule";
import ToggleTypes from "./ToggleTypes";
import EventCard from "./EventCard";
import Calendar from "./Calendar";
import Image from "next/image";


type Props = {
  eventList: GoogleEvent[];
};
{
  /*gets the event type from the description*/
}
function getEventType(description?: string): EventTypes {
  const raw = description
    ?.split("\n")[0]
    ?.replace(/^#/, "")
    .trim()
    .toLowerCase();

  const match = (Object.keys(LABELS) as EventTypes[]).find(
    (key) => key.toLowerCase() === raw,
  );

  return match ?? "All";
}
{
  /*converts date key into date object*/
}
function getDay(dateTime: string) {
  return new Date(dateTime).toLocaleDateString("en-CA", {
    timeZone: "America/Los_Angeles",
  });
}
{
  /*gets nearest day with event, or if none then today*/
}
function getNearestDate(dayKeys: string[]) {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Los_Angeles",
  });

  return dayKeys.find((d) => d >= today) ?? dayKeys.at(-1) ?? today;
}

function formatDayLabel(day: string) {
  const date = new Date(`${day}T12:00:00`);
  const weekday = date.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
  });
  const fullDate = date.toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return { weekday: `${weekday}:`, rest: `${fullDate} (PST)` };
}

const ScheduleUI = ({ eventList }: Props) => {
  const days = [
    ...new Set(
      eventList
        .filter((e) => e.start?.dateTime)
        .map((e) => getDay(e.start.dateTime)),
    ),
  ].sort();

  {
    /*active days*/
  }
  const [selectedDay, setSelectedDay] = useState(() => getNearestDate(days));

  {
    /*active categories of events*/
  }
  const [activeTypes, setActiveTypes] = useState<Set<EventTypes>>(
    () => new Set(Object.keys(LABELS) as EventTypes[]),
  );

  {
    /*whether an event card is expanded or not*/
  }
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLDetailsElement>(null);

  const [now] = useState(Date.now);

  const handleToggle = (type: EventTypes) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (type === "All" && !next.has(type)) {
        return new Set(Object.keys(LABELS) as EventTypes[]);
      }
      if (next.has(type)) {
        next.delete(type);
        next.delete("All");
      } else next.add(type);
      return next;
    });
  };

  const visibleEvents = eventList.filter((event) => {
    if (!event.start?.dateTime) return false;

    const day = getDay(event.start.dateTime);

    const type = getEventType(event.description);

    return day === selectedDay && activeTypes.has(type);
  });

  const isPast = (event: GoogleEvent) => {
    const end = event.end?.dateTime ?? event.start.dateTime;
    return new Date(end).getTime() < now;
  };

  const currentEvents = visibleEvents.filter((event) => !isPast(event));
  const previousEvents = visibleEvents.filter(isPast);
  const dayLabel = formatDayLabel(selectedDay);

  const renderCard = (event: GoogleEvent, past = false) => {
    const category = getEventType(event.description);
    return (
      <EventCard
        key={event.id}
        event={{ ...event, category }}
        color={LABELS[category].line}
        expanded={expandedCard === event.id}
        onToggle={() =>
          setExpandedCard((id) => (id === event.id ? null : event.id))
        }
        past={past}
      />
    );
  };

  return (
    <div className="relative mx-auto mt-6 flex w-[72vw] max-w-5xl flex-col items-center max-lg:w-[95vw]">
      <Image
        src="/schedule/mobileScheduleFrame.svg"
        alt=""
        height={810}
        width={313}
        className="pointer-events-none h-auto w-full object-fill lg:hidden"
        aria-hidden
      />
      <Image
        src="/schedule/scheduleFrame.svg"
        alt=""
        height={760}
        width={1064}
        className="pointer-events-none hidden h-auto w-full object-fill lg:block"
        aria-hidden
      />

      <div className="absolute top-[4.7%] right-[9.9%] bottom-[3.6%] left-[9.6%] z-10 flex flex-col items-center bg-linear-to-b from-white-100 to-blue-100 lg:top-[13.7%] lg:right-[9.7%] lg:bottom-[11.59%]">
        <div className="flex h-full w-full flex-col items-center max-lg:-translate-y-1">
        {/*schedule/date picker*/}
        <details
          ref={datePickerRef}
          className="group relative z-20 -mt-[2.4vw] w-15/24 max-lg:w-53/48 px-[0.8vw] [&::details-content]:opacity-0 [&::details-content]:transition-[opacity,content-visibility] [&::details-content]:duration-300 [&::details-content]:[transition-behavior:allow-discrete] open:[&::details-content]:opacity-100"
        >
          <summary className="flex cursor-pointer list-none items-center justify-center rounded-2xl border border-gold-500 bg-gold-500 px-8 py-2 font-fraunces text-lg font-semibold text-blue-900 shadow-[0_7px_0_0_var(--color-brown-700)] max-lg:py-1 sm:text-xl [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 flex-1 text-left lg:text-center">
              <span className="leading-tight lg:hidden">
                <span className="block">{dayLabel.weekday}</span>
                <span className="block">{dayLabel.rest}</span>
              </span>
              <span className="hidden lg:inline">
                {dayLabel.weekday} {dayLabel.rest}
              </span>
            </span>
            <Image
              src="/schedule/arrow.svg"
              alt=""
              width={30}
              height={30}
              className="h-5 w-5 shrink-0 transition-transform duration-500 group-open:rotate-180"
              aria-hidden
            />
          </summary>

          <div className="absolute inset-x-2 top-[calc(100%+7px)] z-10">
            <Calendar
              selectedDay={selectedDay}
              eventDays={days}
              onSelect={(day) => {
                setSelectedDay(day);
                setExpandedCard(null);
                if (datePickerRef.current) datePickerRef.current.open = false;
              }}
            />
          </div>
        </details>

        {/*toggles*/}
        <div className="mt-7 w-11/12">
          <ToggleTypes activeTypes={activeTypes} onToggle={handleToggle} />
        </div>

        {/*event cards*/}
        <div className="mt-4 flex w-11/12 flex-col items-center space-y-3 overflow-y-auto">
          {currentEvents.length === 0 ? (
            <p className="text-center font-fraunces text-2xl font-semibold text-blue-900 opacity-50">
              No events available
            </p>
          ) : (
            currentEvents.map((event) => renderCard(event))
          )}

          <p className="mt-2 w-full text-left text-2xl font-semibold font-fraunces text-blue-900">
            Previous Events
          </p>

          {previousEvents.length === 0 ? (
            <p className="text-center font-fraunces text-2xl font-semibold text-blue-900 opacity-50">
              No events available
            </p>
          ) : (
            previousEvents.map((event) => renderCard(event, true))
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleUI;
