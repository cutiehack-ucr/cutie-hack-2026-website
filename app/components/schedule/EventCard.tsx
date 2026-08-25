"use client";

import { GoogleEvent, EventTypes } from "@/app/types/schedule";

type Props = {
  event: GoogleEvent & { category: EventTypes };
  color: string;
  expanded: boolean;
  onToggle: () => void;
};

const EventCard = ({ event, color, expanded, onToggle }: Props) => {
  const time = new Date(event.start.dateTime).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/Los_Angeles",
  });
  const body = event.description?.split("\n").slice(1).join("\n") ?? "";

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full rounded-lg p-3 text-left text-black ${color}`}
    >
      <div className="flex justify-between gap-2">
        <span className="font-bold">{event.summary}</span>
        <span className="text-sm">{time}</span>
      </div>
      <div
    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
      expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    }`}>
        <div className="overflow-hidden">
        <div className="mt-2 space-y-1 text-sm">
            {event.location ? <p>{event.location}</p> : null}
            {body ? <p>{body}</p> : null}
            <p className="capitalize opacity-80">{event.category}</p>
        </div>
        </div>
    </div>
    </button>
  );
};

export default EventCard;
