export type Track = {
  id: string;
  name: string;
  frontImage: string;
  backImage: string;
  width: number;
  height: number;
  kind: "bottle" | "cookie";
};

export const TRACKS: Track[] = [
  {
    id: "second-overall",
    name: "2nd Overall",
    frontImage: "/tracks/trackCardFront/second.svg",
    backImage: "/tracks/trackCardBack/second.svg",
    width: 193,
    height: 312,
    kind: "bottle",
  },
  {
    id: "first-overall",
    name: "1st Overall",
    frontImage: "/tracks/trackCardFront/first.svg",
    backImage: "/tracks/trackCardBack/first.svg",
    width: 193,
    height: 312,
    kind: "bottle",
  },
  {
    id: "third-overall",
    name: "3rd Overall",
    frontImage: "/tracks/trackCardFront/third.svg",
    backImage: "/tracks/trackCardBack/third.svg",
    width: 201,
    height: 324,
    kind: "bottle",
  },
  {
    id: "beginner",
    name: "Beginner",
    frontImage: "/tracks/trackCardFront/beginner.svg",
    backImage: "/tracks/trackCardBack/beginner.svg",
    width: 212,
    height: 234,
    kind: "cookie",
  },
  {
    id: "most-on-theme",
    name: "Most on Theme",
    frontImage: "/tracks/trackCardFront/theme.svg",
    backImage: "/tracks/trackCardBack/theme.svg",
    width: 230,
    height: 231,
    kind: "cookie",
  },
  {
    id: "social-impact",
    name: "Social Impact",
    frontImage: "/tracks/trackCardFront/social.svg",
    backImage: "/tracks/trackCardBack/social.svg",
    width: 206,
    height: 210,
    kind: "cookie",
  },
  {
    id: "ai-ml-data",
    name: "AI/ML + Data",
    frontImage: "/tracks/trackCardFront/ai.svg",
    backImage: "/tracks/trackCardBack/ai.svg",
    width: 197,
    height: 225,
    kind: "cookie",
  },
  {
    id: "hardware-build",
    name: "Hardware Build",
    frontImage: "/tracks/trackCardFront/hardware.svg",
    backImage: "/tracks/trackCardBack/hardware.svg",
    width: 222,
    height: 203,
    kind: "cookie",
  },
  {
    id: "ui-ux-design",
    name: "UI/UX Design",
    frontImage: "/tracks/trackCardFront/ui.svg",
    backImage: "/tracks/trackCardBack/ui.svg",
    width: 193,
    height: 211,
    kind: "cookie",
  },
];
