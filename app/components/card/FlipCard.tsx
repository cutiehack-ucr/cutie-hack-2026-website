"use client";

import { useState } from "react";

type FlipCardProps = {
  name: string;
  description: string;
};

const FlipCard = ({ name, description }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((prev) => !prev)}
      aria-pressed={isFlipped}
      aria-label={`${name} card, ${
        isFlipped ? "showing description" : "click to flip"
      }`}
      className="h-48 w-36 cursor-pointer transition-transform hover:scale-105 sm:w-40"
    >
      <div
        className="relative h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d]"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-black bg-white [backface-visibility:hidden]">
          <span className="text-xl font-semibold capitalize tracking-wide">
            {name}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-black bg-white px-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="text-base leading-snug">{description}</span>
        </div>
      </div>
    </button>
  );
};

export default FlipCard;