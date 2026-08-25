export type TeamType =
    | "All"
    | "Leads"
    | "Operations"
    | "Finance"
    | "Marketing"
    | "UI/UX Design"
    | "SWE";

export type TeamMember = {
    name: string;
    position: string;
    team: Exclude<TeamType, "All">;
    bio: string;
    linkedin: string;
    github: string;
    image: string;
};

export const teamMembers: TeamMember[] = [
    {
        name: "Lead Name",
        position: "Director",
        team: "Leads",
        bio: "Short bio about the team member.",
        linkedin: "#",
        github: "#",
        image: "/team/placeholder.svg",
    },
    {
        name: "Operations Lead",
        position: "Operations",
        team: "Operations",
        bio: "Short bio about the team member.",
        linkedin: "#",
        github: "#",
        image: "/team/placeholder.svg",
    },
    {
        name: "Finance Lead",
        position: "Finance",
        team: "Finance",
        bio: "Short bio about the team member.",
        linkedin: "#",
        github: "#",
        image: "/team/placeholder.svg",
    },
    {
        name: "Marketing Lead",
        position: "Marketing",
        team: "Marketing",
        bio: "Short bio about the team member.",
        linkedin: "#",
        github: "#",
        image: "/team/placeholder.svg",
    },
    {
        name: "Design Lead",
        position: "UI/UX Designer",
        team: "UI/UX Design",
        bio: "Short bio about the team member.",
        linkedin: "#",
        github: "#",
        image: "/team/placeholder.svg",
    },
    {
        name: "SWE Lead",
        position: "Software Engineering",
        team: "SWE",
        bio: "Short bio about the team member.",
        linkedin: "#",
        github: "#",
        image: "/team/placeholder.svg",
    },
];
