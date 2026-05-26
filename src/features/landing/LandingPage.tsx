import About from "./components/About";
import NavBar from "@/components/NavBar";
import Hero from "./components/Hero";
import IBuildStuff from "./components/IBuildStuff";

export default function LandingPage() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <IBuildStuff />
    </>
  );
}
