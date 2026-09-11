"use client";
import { useState } from "react";
import Image from "next/image";
import { Project, PROJECTS } from "../data/pastprojects";

function PastProjectBubble({
  project,
  onClick,
  className,
}: {
  project: Project;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group absolute items-center justify-center overflow-hidden bg-gray-300 ${className}`}
    >
      <span className="text-s text-center transition-opacity group-hover:opacity-0">
        {project.title}
      </span>
      <Image
        src={project.image}
        alt="project_image"
        fill
        className="overflow-hidden object-cover opacity-0 transition-opacity group-hover:opacity-100"
      />
    </button>
  );
}

const PastProjects = () => {
  const [curIndex, setIndex] = useState(0);
  const curProject = PROJECTS[curIndex];
  const prevProj = () =>
    setIndex((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
  const nextProj = () => setIndex((i) => (i + 1) % PROJECTS.length);

  return (
    <section id="past-projects" className="w-full px-10 py-16 text-black">
      <h2 className="w-full text-center font-sans text-4xl font-extrabold">
        Past Projects
      </h2>
      {/*past project bubbles*/}
      <div className="relative mx-auto max-w-xl">
        {/*top right*/}
        <PastProjectBubble
          project={PROJECTS[0]}
          onClick={() => setIndex(0)}
          className="top-20 -left-50 h-30 w-30 rounded-full"
        />
        {/*bottom left*/}
        <PastProjectBubble
          project={PROJECTS[1]}
          onClick={() => setIndex(1)}
          className="top-70 -left-60 h-30 w-30 rounded-full"
        />
        {/*top right*/}
        <PastProjectBubble
          project={PROJECTS[2]}
          onClick={() => setIndex(2)}
          className="top-20 -right-50 h-30 w-30 rounded-full"
        />
        {/*bottom right*/}
        <PastProjectBubble
          project={PROJECTS[2]}
          onClick={
            /*change to more past project link or smthin*/ () => setIndex(2)
          }
          className="top-70 -right-50 h-25 w-40 rounded-2xl"
        />
      </div>

      {/*center past project card*/}
      <article className="relative mx-auto mt-6 w-full max-w-xl rounded-3xl bg-gray-300 p-6">
        <h3 className="text-center font-sans text-2xl font-extrabold">
          {curProject.title} | {curProject.hackathon} {curProject.year}
        </h3>
        <div className="mt-6 flex flex-col items-center">
          <Image
            src={curProject.image}
            alt="project_image"
            className="h-auto w-full max-w-sm rounded-2xl bg-gray-400 text-white"
            width={100}
            height={50}
          />
          <div className="w-full max-w-sm">
            <p className="text-sm text-gray-500">{curProject.track}</p>
            <p>{curProject.description}</p>
            <p>{curProject.testimonial}</p>
          </div>

          <div className="mt-10 flex flex-row items-center justify-center gap-4">
            <button onClick={prevProj}>{"<"}</button>
            <div className="flex items-center gap-4">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-3 w-3 rounded-full ${i === curIndex ? "bg-black" : "border border-black"}`}
                />
              ))}
            </div>
            <button onClick={nextProj}>{">"}</button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default PastProjects;
