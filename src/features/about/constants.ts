import React from "react";
import { Briefcase, Layers, Sparkles, LucideIcon } from "lucide-react";
import { Section } from "./types";
import ExperiencesSection from "./components/ExperiencesSection";
import TechStackSection from "./components/TechStackSection";
import ServicesSection from "./components/ServicesSection";

export const ABOUT_SECTIONS: Record<
  Section,
  {
    component: React.ComponentType;
    icon: LucideIcon;
    title: string;
    href: string;
  }
> = {
  experiences: {
    component: ExperiencesSection,
    icon: Briefcase,
    title: "Experiences",
    href: "/about/experiences",
  },
  techstack: {
    component: TechStackSection,
    icon: Layers,
    title: "Tech Stack",
    href: "/about/techstack",
  },
  services: {
    component: ServicesSection,
    icon: Sparkles,
    title: "Services",
    href: "/about/services",
  },
};
