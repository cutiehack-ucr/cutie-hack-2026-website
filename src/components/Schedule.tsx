import ScheduleUI from "./schedule/ScheduleUI";
import { GoogleEvent } from "../types/schedule";
import { api } from "../utils/api";
import Image from "next/image"

const SectionTitle = ({ children }: { children: string }) => (
  <h2
    className="mb-10 flex items-center justify-center gap-6 leading-none"
    style={{ filter: "drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.25))" }}
  >
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className="block h-9 w-auto"
      aria-hidden
    />
    <span className="bg-linear-to-b from-white-100 to-orange-500 bg-clip-text text-center font-fraunces text-[22px] font-semibold tracking-normal text-transparent">
      {children}
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


const Schedule = async () => {

    const { items } = (await api({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime`,
        method: "GET",
      })) as {items? : GoogleEvent[]};
    
    return (
        <section id="schedule" className="relative z-1 text-black mt-6">
            <SectionTitle>Schedule</SectionTitle>

      <ScheduleUI eventList={items ?? []} />
    </section>
  );
};

export default Schedule;
