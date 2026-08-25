interface types {
    color: string;
    background: string;
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
  
  
  export type EventTypes =
    | "all"
    | "required"
    | "workshop"
    | "activity"
    | "meal";
  
  export const LABELS: Record<EventTypes, types> = {
    all: {
      color: "gray",
      background: "bg-gray-500",
      type: "leads",
    },
    required: {
      color: "red",
      background: "bg-red-500",
      type: "leads",
    },
    workshop: {
      color: "grayblue",
      background: "bg-blue-500",
      type: "hackathon",
    },
    activity: {
      color: "pink",
      background: "bg-pink-500",
      type: "hackathon",
    },
    meal: {
      color: "green",
      background: "bg-green-500",
      type: "hackathon",
    },
  };
  