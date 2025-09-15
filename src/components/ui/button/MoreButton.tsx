import React from "react";
import Link from "next/link";

type Props = {
  route: string,
  label: string,
  type?: "button" | "submit" | "reset",
  onClick?: () => void,
}

const MoreButton = ({route, label}: Props) => {
  return (
    <Link href={"/" + route}
          className="border border-black dark:border-white p-4 relative text-black dark:text-white overflow-hidden group hover:text-white dark:hover:text-black">
      <span className="relative z-10">
        {label}
        <span className="inline-block ml-1">
          &rarr;
        </span>
      </span>
      <span
        className="absolute inset-0 bg-black dark:bg-chartreuse w-0 transition-all duration-300 group-hover:w-full -z-0"/>
    </Link>
  )
}

export default MoreButton;