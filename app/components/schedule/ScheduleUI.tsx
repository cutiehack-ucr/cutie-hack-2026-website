"use client";
import { useState } from "react";
import { GoogleEvent, EventTypes, LABELS } from "@/app/types/schedule";
import ToggleTypes from "./ToggleTypes";
import EventCard from "./EventCard";	


type Props = {
  eventList: GoogleEvent[];
}
{/*gets the event type from the description*/}
function getEventType(description?: string): EventTypes {
    const type = description?.split("\n")[0]?.replace(/^#/, "").trim().toLowerCase();

    if (type && type in LABELS) {return type as EventTypes;}
    else {return "all";}
}
{/*converts date key into date object*/}
function getDay(dateTime: string) {
    return new Date(dateTime).toLocaleDateString("en-CA", {timeZone: "America/Los_Angeles"});
}
{/*gets nearest day with event, or if none then today*/}
function getNearestDate(dayKeys: string[]) {
    const today = new Date().toLocaleDateString("en-CA", {timeZone: "America/Los_Angeles"});

    return dayKeys.find((d) => d >= today) ?? dayKeys.at(-1) ?? today;
}


const ScheduleUI = ({ eventList }: Props) => {
    const days = [
        ...new Set(
            eventList.filter((e) => e.start?.dateTime).map((e) => getDay(e.start.dateTime))
        )
    ].sort();

    {/*active days*/}
    const [selectedDay, setSelectedDay] = useState(() => getNearestDate(days));

    {/*active categories of events*/}
    const [activeTypes, setActiveTypes] = useState<Set<EventTypes>>(
        () => new Set(Object.keys(LABELS) as EventTypes[]),
    );

    const handleToggle = (type: EventTypes) => {
        setActiveTypes((prev) => {
            const next = new Set(prev);
            if (type === "all" && !next.has(type)) {
                return new Set((Object.keys(LABELS) as EventTypes[]));
            }
            if (next.has(type)) {
                next.delete(type);
                next.delete("all");
            }
            else next.add(type)
            return next;
        });
    };

    const visibleEvents = eventList.filter((event) => {
        if (!event.start?.dateTime) return false;

        const day = getDay(event.start.dateTime);

        const type = getEventType(event.description);

        return day === selectedDay && activeTypes.has(type);
        
    });

    {/*whether an event card is expanded or not*/}
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    
    return (
        <div className="mx-auto mt-6 flex w-11/12 max-w-3xl flex-col items-center">
        
        <div className="w-full max-w-md">
            <select
                value={selectedDay}
                onChange={(e)=>{
                    setSelectedDay(e.target.value);
                    setExpandedCard(null);
                }}
                className="w-full rounded-lg border-2 border-black p-2 text-black text-center font-bold text-xl">

                {days.map((day) => {
                    const date = new Date(`${day}T12:00:00`);
                    const weekday = date.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles", weekday: "long"});
                    const fullDate = date.toLocaleDateString("en-US", {timeZone: "America/Los_Angeles", year: "numeric", month: "long", day: "numeric"});

                    return (
                        <option key={day} value={day}>{`${weekday}: ${fullDate} (PST)`}</option>
                    );
                })}
                    
            </select>
        </div>

        <div className="mt-4 w-full">
            <ToggleTypes activeTypes={activeTypes} onToggle={handleToggle} />
        </div>

        <div className="mt-4 w-full space-y-2">
            {visibleEvents.length === 0 ? (
            <p className="text-center text-lg font-semibold">No events available</p>
            ) : (
            visibleEvents.map((event) => {
                const category = getEventType(event.description);
                return (
                <EventCard
                    key={event.id}
                    event={{ ...event, category }}
                    color={LABELS[category].background}
                    expanded={expandedCard === event.id}
                    onToggle={() =>
                    setExpandedCard((id) => (id === event.id ? null : event.id))
                    }
                />
                );
            })
            )}
        </div>
        </div>
    );
};

export default ScheduleUI;
