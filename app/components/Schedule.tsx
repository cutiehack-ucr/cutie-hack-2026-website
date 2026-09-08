import ScheduleUI from "./schedule/ScheduleUI";
import { GoogleEvent } from "@/app/types/schedule";
import { api } from "@/app/utils/api";

const Schedule = async () => {
  const { items } = (await api({
    url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime`,
    method: "GET",
  })) as { items?: GoogleEvent[] };

  return (
    <section id="schedule" className="mt-6 w-full text-black">
      <h2 className="text-center font-sans text-3xl font-extrabold">
        Schedule
      </h2>

      <ScheduleUI eventList={items ?? []} />
    </section>
  );
};

export default Schedule;
