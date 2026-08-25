"use client";

import { EventTypes, LABELS} from "@/app/types/schedule";

type Props = {
    activeTypes: Set<EventTypes>;
    onToggle: (type: EventTypes) => void

};
 
const ToggleTypes = ({activeTypes, onToggle}: Props) => {
    const types = Object.keys(LABELS) as EventTypes[];

    return (
        <div className="flex w-full flex-wrap gap-2 justify-center">
            {types.map((type) => (
                <button
                    key={type}
                    type="button"
                    onClick={() => onToggle(type)}
                    className={`flex-1 rounded px-3 py-1 text-black ${LABELS[type].background} ${activeTypes.has(type) ? "opacity-100" : "opacity-50"}`}
                    >
                    {type}
                </button>
            ))}
        </div>
    );
};

export default ToggleTypes;