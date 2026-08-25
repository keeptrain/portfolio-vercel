export const Section = ["experiences", "techstack", "services"] as const;

export type Section = (typeof Section)[number];
