import ScheduleUI from "./schedule/ScheduleUI";
import { GoogleEvent } from "@/app/types/schedule";
import { api } from "@/app/utils/api";
import Image from "next/image"

const SectionTitle = ({ children }: { children: string }) => (
  <h2
    className="flex items-center justify-center mb-10 gap-3 leading-none sm:gap-10"
    style={{ filter: "drop-shadow(0px 8px 4px rgba(0, 0, 0, 0.25))" }}
  >
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className="block h-5 w-auto sm:h-9"
      aria-hidden
    />
    <span className="bg-linear-to-b from-white-100 to-orange-500 bg-clip-text text-center font-fraunces text-[22px] font-semibold tracking-normal text-transparent sm:text-[32px]">
      {children}
    </span>
    <Image
      src="/diamond.svg"
      alt=""
      width={43}
      height={48}
      className="block h-5 w-auto sm:h-9"
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
