export type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    testimonial: string;
    track: string;
    hackathon: string;
    year: string;
};

export const PROJECTS: Project[] = [
    {
        title: "Project example",
        description: "desc",
        image: "/example.svg",
        link: "example.com",
        testimonial: "something",
        track: "Best Overall",
        hackathon: "Citrus Hack",
        year: "3036",
    },
    {
        title: "Project example 2",
        description: "desc 2",
        image: "/example2.png",
        link: "example2.com",
        testimonial: "something something",
        track: "Beginner Hack",
        hackathon: "Citrus Hack",
        year: "2027",
    },
    {
        title: "Project example 3",
        description: "desc 3",
        image: "/example3.png",
        link: "example3.com",
        testimonial: "something something something",
        track: "Hardware",
        hackathon: "Cutie Hack",
        year: "1300",
    },
];