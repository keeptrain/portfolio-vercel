export interface Project {
  slug: string;
  title: string;
  imageSrc: string;
  stack: string[];
  category: string;
  year: string;
  client?: string;
  description: string;
  isNda?: boolean;
  logoSrc?: string;
  links: string;
}

export const projectsData: Project[] = [
  {
    slug: "sim-ors",
    title: "SIM — ORS",
    imageSrc: "/images/projects/jakreq-thumb.jpg",
    stack: [
      "React.js",
      "Typescript",
      "Laravel",
      "MySQL",
      "Zustand",
      "Tailwind",
      "Shadcn",
      "Docker",
    ],
    category: "Website Development",
    year: "2025 - 2026",
    client: "Swakarya Insan Mandiri",
    description:
      "ORS (Outsourcing Recruitment System) is an outsourcing recruitment platform that simplifies the hiring process, helping teams manage job requests, track candidates, and oversee recruitment from sourcing to placement.",
    isNda: true,
    links: "/projects/sim-ors",
  },
  {
    slug: "jakreq",
    title: "JakReq — Request Management System",
    imageSrc: "/images/projects/jakreq-thumb.jpg",
    stack: ["Laravel", "Livewire", "Tailwind CSS", "MySQL"],
    category: "Website Development",
    year: "2024 - 2025",
    client: "Internal / Corporate",
    description:
      "JakReq is a request management system designed to streamline internal workflow, ticket submission, and request approvals with automated status tracking.",
    isNda: false,
    links: "/projects/jakreq",
  },
  {
    slug: "cullinarix",
    title: "Cullinarix — Food Discovery App",
    imageSrc: "/images/projects/cullinarix-thumb.jpg",
    stack: ["Android", "Kotlin", "XML", "Retrofit", "Room"],
    category: "Mobile App Development",
    year: "2024",
    client: "Personal Project",
    description:
      "Cullinarix is a modern Android food discovery application that helps users explore nearby culinary spots, search customized recipes, and manage favorite meals.",
    isNda: false,
    links: "/projects/cullinarix",
  },
];
