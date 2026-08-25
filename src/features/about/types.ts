export const Sections = ["experiences", "techstack", "services"] as const;

export type Section = (typeof Sections)[number];
