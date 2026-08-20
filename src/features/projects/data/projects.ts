export interface Project {
  slug: string;
  name: string;
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
    slug: "rptra-cibubur",
    name: "RPTRA Cibubur",
    title:
      "RPTRA Cibubur — Public Information With Dashboard Management Website",
    imageSrc: "/images/projects/rptra-cibubur-mockups.jpeg",
    stack: ["Next.js", "Typescript"],
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
    name: "Cullinarix",
    title: "Cullinarix — Food Discovery App",
    imageSrc: "/images/projects/cullinarix-mockups.jpeg",
    stack: ["Android", "Kotlin"],
    category: "Mobile App Development",
    year: "2024",
    client: "Capstone Project",
    description:
      "Cullinarix is a modern Android food discovery application that helps users explore nearby culinary spots, search customized recipes, and manage favorite meals.",
    isNda: false,
    links: "/projects/cullinarix",
  },
];
