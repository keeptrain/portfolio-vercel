"use client";

import { useState, useEffect } from "react";

const GREETINGS = ["Halo", "Hello", "Wassup", "Bonjour", "Hola"];

export default function RotatingGreeting() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % GREETINGS.length);
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <h1
      key={GREETINGS[index]}
      className="animate-in text-lg font-medium tracking-tight duration-500 fade-in slide-in-from-bottom-1 md:text-xl"
    >
      {GREETINGS[index]}
    </h1>
  );
}
