import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "KeepTrain",
  description: "A modern, minimalist portfolio showcasing my work and skills.",
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Gilang Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
