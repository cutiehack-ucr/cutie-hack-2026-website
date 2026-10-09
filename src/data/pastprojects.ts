export type Project = {
  title: string;
  description: string | null;
  image: string | null;
  link: string;
  testimonial: string | null;
  track: string;
  hackathon: string;
  year: string;
  light: string;
  dark: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Christopher's Testimonial",
    description: null,
    image: null,
    link: "example.com",
    testimonial: "\u201cAt the time, I wasn't sure if I should participate and was nervous, but I decided to give it my all. We chose to make a small game and had to learn a new programming language in 12 hours.\u201d",
    track: "1st Place Winner",
    hackathon: "Cutie Hack",
    year: "2024",
    light:"#B9DEFF",
    dark:"#6A9ECA",
  },
  {
    title: "Spellcaster",
    description: "1v1 multiplayer game centered around spelling out complicated spell names.",
    image: "/pastprojects/Spellcaster.png",
    link: "example.com",
    testimonial: null,
    track: "1st Place",
    hackathon: "Cutie Hack",
    year: "2025",
    light:"#DDA4E4",
    dark:"#AF85C3",
  },
  {
    title: "Racoon Recycling",
    description: "Gaming mascot that teaches to recycle with fun virtual incentives.",
    image: "/pastprojects/Raccoon_Recycling.png",
    link: "example2.com",
    testimonial: null,
    track: "1st Place",
    hackathon: "Cutie Hack",
    year: "2024",
    light: "#A1C076",
    dark: "#7B9853",
  },
  {
    title: "EcoSort",
    description: "Improve waste management and disposal through waste, recycling, and compost category identification.",
    image: "/pastprojects/EcoSort.png",
    link: "example3.com",
    testimonial: null,
    track: "Best Hardware",
    hackathon: "Cutie Hack",
    year: "2025",
    light: "#f6b74e",
    dark: "#e38649",
  },
  {
    title: "Past Years",
    description: null,
    image: "/pastprojects/Cutie25ClosingCeremony.png",
    link: "https://example.com",
    testimonial: null,
    track: "",
    hackathon: "",
    year: "2024 & 2025",
    light: "#d94f67",
    dark: "#ae3e3d",
  },
];
