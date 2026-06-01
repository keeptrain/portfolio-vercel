import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/app/globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KeepTrain",
  description: "A modern, minimalist portfolio showcasing my work and skills.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(montserrat.className, "font-sans", inter.variable)}
    >
      <head>
        <meta
          name="viewport"
          charSet="UTF-8"
          content="width=device-width, initial-scale=1.0"
        />
        <title>KeepDev</title>
      </head>
      <body className={`${montserrat.className}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}