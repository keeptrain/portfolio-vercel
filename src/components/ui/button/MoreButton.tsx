import React from "react";
import Link from "next/link";

type Props = {
  route: string;
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const MoreButton = ({ route, label }: Props) => {
  return (
    <Link
      href={"/" + route}
      className="group relative overflow-hidden border-black p-2 text-black hover:text-white md:border md:p-4 dark:border-white dark:text-white dark:hover:text-black"
    >
      <span className="relative z-10">
        {label}
        <span className="ml-1 inline-block">&rarr;</span>
      </span>
      <span className="absolute inset-0 -z-0 w-0 bg-black transition-all duration-300 group-hover:w-full dark:bg-chartreuse" />
    </Link>
  );
};

export default MoreButton;
