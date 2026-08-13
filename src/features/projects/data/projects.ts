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
    slug: "jakreq",
    title: "JakReq — Request Management System",
    imageSrc: "/images/projects/jakreq-thumb.jpg",
    stack: ["Laravel", "Livewire"],
    category: "Website Development",
    year: "2024 - 2025",
    client: "Internal / Corporate",
    description:
      "JakReq is a request management system designed to streamline workflow, ticket submission, and internal request approvals.",
    isNda: false,
    links: "/projects/jakreq",
  },
  {
    slug: "cullinarix",
    title: "Cullinarix — Food Discovery App",
    imageSrc: "/images/projects/cullinarix-thumb.jpg",
    stack: ["Android", "Kotlin", "XML"],
    category: "Mobile App Development",
    year: "2024",
    client: "Personal Project",
    description:
      "Cullinarix is an Android food discovery application that helps users find nearby restaurants, recipes, and culinary experiences.",
    isNda: false,
    links: "/projects/cullinarix",
  },
];
