import About from "./components/About";
import Hero from "./components/Hero";
import IBuildStuff from "./components/IBuildStuff";

interface LandingPageProps {
  locale: string;
}

export default function LandingPage({ locale }: LandingPageProps) {
  return (
    <>
      <Hero />
      <About />
      <IBuildStuff locale={locale} />
    </>
  );
}