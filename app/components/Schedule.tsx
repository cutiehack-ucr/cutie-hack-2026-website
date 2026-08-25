import ScheduleUI from "./schedule/ScheduleUI";
import { GoogleEvent } from "@/app/types/schedule";
import {api} from "@/app/utils/api";

const Schedule = async () => {

    const { items } = (await api({
        url: `https://www.googleapis.com/calendar/v3/calendars/${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR}/events?key=${process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY}&singleEvents=true&orderBy=startTime`,
        method: "GET",
      })) as {items? : GoogleEvent[]};
    
    return (
        <section id="schedule" className="w-full text-black mt-6">
            <h2 className="text-center text-3xl font-extrabold font-sans">Schedule</h2>

            <ScheduleUI eventList={items ?? []} />
        </section>
    );
};

export default Schedule;