"use client";
import { useState } from "react";
import Image from "next/image";
import { SPONSORS } from "../data/sponsors";

const Sponsors = () => {
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string) => {
    setFlippedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="sponsors" className="mt-6 w-full text-black">
      <h2 className="text-center font-sans text-3xl font-extrabold">
        Sponsors
      </h2>
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-4 gap-4">
        {SPONSORS.map((sponsor) => {
          const isFlipped = flippedIds.has(sponsor.id);
          return (
            <button
              key={sponsor.id}
              type="button"
              onClick={() => toggleFlip(sponsor.id)}
              className={`relative h-30 w-full max-w-sm transition-transform duration-300 [transform-style:preserve-3d] ${isFlipped ? "[transform:rotateY(180deg)]" : ""}`}
            >
              {/*front of card*/}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gray-300 backface-hidden">
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="flex h-20 w-20 flex-col items-center justify-center object-contain"
                  width={100}
                  height={100}
                />
                <span className="flex flex-col items-center justify-center text-xl font-bold">
                  {sponsor.name}
                </span>
              </div>
              {/*back of card*/}
              <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center gap-2 rounded-2xl bg-gray-300 backface-hidden">
                <span className="text-xl font-bold">{sponsor.name}</span>
                <p className="text-sm text-gray-500">{sponsor.description}</p>
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-2 bottom-2 mt-1 rounded-2xl bg-gray-400 px-3 text-sm text-black hover:text-blue-500"
                >
                  Visit
                </a>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Sponsors;
