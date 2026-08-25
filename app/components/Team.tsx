"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Team.module.css";

import {
    teamMembers,
    TeamMember,
    TeamType,
} from "../data/team";

const filters: TeamType[] = [
    "All",
    "Leads",
    "Operations",
    "Finance",
    "Marketing",
    "UI/UX Design",
    "SWE",
];

const filterLabels: Record<TeamType, string> = {
    All: "All",
    Leads: "♡ Leads",
    Operations: "♧ Ops",
    Finance: "♧ Finance",
    Marketing: "♢ Marketing",
    "UI/UX Design": "♢ UI/UX",
    SWE: "♧ SWE",
};

export default function Team() {
    const [selectedType, setSelectedType] =
        useState<TeamType>("All");

    const [selectedMember, setSelectedMember] =
        useState<TeamMember | null>(null);

    const filteredMembers =
        selectedType === "All"
            ? teamMembers
            : teamMembers.filter(
                (member) => member.team === selectedType
            );

    return (
        <section className={styles.teamSection}>
            <h2 className={styles.teamTitle}>Team</h2>

            <div className={styles.teamFilters}>
                {filters.map((filter) => (
                    <button
                        key={filter}
                        className={
                            selectedType === filter ? styles.active : ""
                        }
                        onClick={() => setSelectedType(filter)}
                    >
                        {filterLabels[filter]}
                    </button>
                ))}
            </div>

            <div className={styles.teamGrid}>
                {filteredMembers.map((member) => (
                    <button
                        key={member.name}
                        className={styles.teamCard}
                        onClick={() => setSelectedMember(member)}
                    >
                        <div className={styles.teamCardImage}>
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                sizes="120px"
                            />
                        </div>

                        <span className={styles.memberName}>
                            {member.name}
                        </span>

                        <span className={styles.memberPosition}>
                            {member.position}
                        </span>
                    </button>
                ))}
            </div>

            {selectedMember && (
                <div
                    className={styles.teamOverlay}
                    onClick={() => setSelectedMember(null)}
                >
                    <div
                        className={styles.teamPopup}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className={styles.teamClose}
                            onClick={() => setSelectedMember(null)}
                            aria-label="Close team member popup"
                        >
                            ×
                        </button>

                        <div className={styles.popupImage}>
                            <Image
                                src={selectedMember.image}
                                alt={selectedMember.name}
                                fill
                                sizes="200px"
                            />
                        </div>

                        <h3>{selectedMember.name}</h3>

                        <p className={styles.popupPosition}>
                            {selectedMember.position}
                        </p>

                        <p>{selectedMember.bio}</p>

                        <div className={styles.teamLinks}>
                            <a
                                href={selectedMember.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn
                            </a>

                            <a
                                href={selectedMember.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
