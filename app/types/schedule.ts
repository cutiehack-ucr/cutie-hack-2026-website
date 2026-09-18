interface types {
  color: string;
  text: string;
  border: string;
  background: string;
  line: string;
  type: string;
}

export type GoogleEvent = {
  id: string;
  description: string;
  end: {
    dateTime: string;
    timeZone: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  summary: string;
  location: string;
};

export type HackathonEvent = {
  id: string;
  name: string;
  location: string;
  description: string;
  category: EventTypes;
  start: Date;
  end: Date;
  hidden: boolean;
  color: string;
  day: string;
};

export type EventTypes = "All" | "Required" | "Workshop" | "Activity" | "Meal";

export const LABELS: Record<EventTypes, types> = {
  All: {
    color: "blue-900",
    text: "text-blue-900",
    border: "border-blue-900",
    background: "bg-blue-900",
    line: "bg-blue-900",
    type: "leads",
  },
  Required: {
    color: "red-500",
    text: "text-red-500",
    border: "border-red-500",
    background: "bg-red-500",
    line: "bg-red-500",
    type: "leads",
  },
  Workshop: {
    color: "blue-500",
    text: "text-blue-500",
    border: "border-blue-500",
    background: "bg-blue-500",
    line: "bg-blue-500",
    type: "hackathon",
  },
  Activity: {
    color: "orange-700",
    text: "text-orange-700",
    border: "border-orange-700",
    background: "bg-orange-700",
    line: "bg-orange-700",
    type: "hackathon",
  },
  Meal: {
    color: "purple-500",
    text: "text-purple-500",
    border: "border-purple-500",
    background: "bg-purple-500",
    line: "bg-purple-300",
    type: "hackathon",
  },
};
