import React from "react";

interface Props {
  width?: string;
  children: React.ReactNode;
}

const SectionContainer = ({ width, children }: Props) => {
  const maxWidthClass = width ? `max-w-${width}` : "max-w-7xl";

  return (
    <div className={`${maxWidthClass} mx-auto px-4 sm:px-8 md:px-12`}>
      {children}
    </div>
  );
};

export default SectionContainer;
