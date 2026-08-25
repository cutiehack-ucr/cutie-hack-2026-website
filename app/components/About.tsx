"use client";

import FlipCard from "./card/FlipCard";

const STATS = [
  "#+ Hackers (Participants)",
  "#+ Projects",
  "10+ Years",
  "# hours",
  "#+ mini events (workshops & activities)",
  "#+ colleges represented",
  "# Reach",
  "Industry Partners",
  "Prizes & Swag",
];

const VALUE_CARDS = [
  {
    name: "community",
    description: "Describe community",
  },
  {
    name: "growth",
    description: "Describe growth",
  },
  {
    name: "innovation",
    description: "Describe innovation",
  },
  {
    name: "impact",
    description: "Describe impact",
  },
];

const About = () => {
  return (
    <section
      id="about"
      className="w-full bg-white px-10 py-16 text-black sm:px-14 lg:px-20"
    >
      <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">
        About [Hackathon name]
      </h2>

      <div className="mx-auto flex max-w-4xl flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div className="max-w-md space-y-6 text-base leading-relaxed sm:text-lg">
          <p>
            [Hackathon name] is ACM at UCR&apos;s [length of hackathon] hour,{" "}
            <strong>[focus of hackathon]</strong> hackathon with the goal to
            build and provide a place where students can build with the freedom
            of their creativity.
          </p>
          <p>
            Established <strong>for students by students</strong>, [hackathon
            name] has since become one of Southern California&apos;s premier
            collegiate hackathons and is a place where students can turn their
            ideas into <strong>impactful innovations.</strong>
          </p>
          <p>
            [Hackathon name] provides builders of all years, majors, and skill
            levels the chance to develop projects, present to a panel of
            industry judges, and compete for tracks and prizes!
          </p>
        </div>

        <ul className="w-fit shrink-0 list-disc pl-5 sm:text-lg">
          {STATS.map((stat) => (
            <li key={stat}>{stat}</li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-wrap justify-center gap-6">
        {VALUE_CARDS.map((card) => (
          <FlipCard
            key={card.name}
            name={card.name}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default About;
