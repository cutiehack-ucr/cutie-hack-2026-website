"use client";

import { EventTypes, LABELS } from "@/app/types/schedule";

type Props = {
  activeTypes: Set<EventTypes>;
  onToggle: (type: EventTypes) => void;
};

const ToggleTypes = ({ activeTypes, onToggle }: Props) => {
  const types = Object.keys(LABELS) as EventTypes[];

  return (
    <div className="flex w-full min-w-0 gap-2 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-between lg:gap-0 lg:overflow-visible lg:px-0">
      {types.map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onToggle(type)}
          className={`shrink-0 whitespace-nowrap rounded-lg px-[max(12px,1.5vw)] py-0.5 shadow-md font-fraunces text-xl border-2 ${
            activeTypes.has(type)
              ? `${LABELS[type].background} border-white text-white`
              : `bg-white-100 ${LABELS[type].border} ${LABELS[type].text}`
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default ToggleTypes;
