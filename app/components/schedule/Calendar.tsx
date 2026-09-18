"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  selectedDay: string;
  eventDays: string[];
  onSelect: (day: string) => void;
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = ({ selectedDay, eventDays, onSelect }: Props) => {
  const [y, m] = selectedDay.split("-").map(Number);
  const [view, setView] = useState({ y, m: m - 1 });

  const first = new Date(view.y, view.m, 1);
  const start = new Date(view.y, view.m, 1 - first.getDay());
  const events = new Set(eventDays);

  const cells = Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toLocaleDateString("en-CA");
    return { key, day: d.getDate(), inMonth: d.getMonth() === view.m };
  });

  const label = new Date(view.y, view.m).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const shift = (n: number) => {
    const d = new Date(view.y, view.m + n, 1);
    setView({ y: d.getFullYear(), m: d.getMonth() });
  };

  const today = () => {
    const key = new Date().toLocaleDateString("en-CA", {
      timeZone: "America/Los_Angeles",
    });
    const [ty, tm] = key.split("-").map(Number);
    setView({ y: ty, m: tm - 1 });
    onSelect(key);
  };

  return (
    <div className="rounded-2xl border-2 border-gold-500 bg-white-100 px-4 pt-3 pb-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1 font-fraunces text-xl font-semibold text-blue-900 max-lg:text-lg">
          {label}
          <button type="button" onClick={() => shift(-1)} className="px-1">
            <Image
              src="/schedule/arrow.svg"
              alt=""
              width={30}
              height={30}
              className="h-5 w-5 rotate-90 max-lg:h-6 max-lg:w-6"
              aria-hidden
            />
          </button>
          <button type="button" onClick={() => shift(1)} className="px-1">
            <Image
              src="/schedule/arrow.svg"
              alt=""
              width={30}
              height={30}
              className="h-5 w-5 -rotate-90 max-lg:h-6 max-lg:w-6"
              aria-hidden
            />
          </button>
        </div>
        <button
          type="button"
          onClick={today}
          className="rounded-lg border border-gold-500 px-3 py-0.5 font-fraunces text-md font-semibold text-blue-900 transition-colors duration-200 hover:bg-gold-500/30"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-fraunces">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-md font-semibold text-blue-900">
            {d}
          </div>
        ))}
        {cells.map(({ key, day, inMonth }) => (
          <button
            key={key}
            type="button"
            onClick={() => onSelect(key)}
            className="flex items-center justify-center py-1"
          >
            <span
              className={`relative flex h-11 w-11 flex-col items-center justify-center rounded-full text-lg leading-none ${
                inMonth ? "text-blue-900" : "text-blue-900/30"
              } ${key === selectedDay ? "border-2 border-gold-500 bg-gold-500/30" : ""}`}
            >
              {day}
              <span
                className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                  events.has(key) ? "bg-gold-500" : "bg-transparent"
                }`}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
