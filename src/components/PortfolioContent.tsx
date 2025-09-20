"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ProjectsBlogs from "@/components/ProjectsBlogs";

const PortfolioContent = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Loading
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Hero />
      <About />
      {/*<Projects/>*/}
      <ProjectsBlogs />
      <Footer />
    </>
  );
};

export default PortfolioContent;
