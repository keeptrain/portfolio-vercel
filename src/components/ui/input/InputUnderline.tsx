"use client";

import React from "react";

type Props = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
};

const InputUnderline = ({ label, type, id, placeholder }: Props) => {
  return (
    <div className="relative mb-6">
      <label
        htmlFor="email-input"
        className="mb-1 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="block w-full border-b border-blue-old bg-transparent py-2 text-base text-gray-600 focus:border-blue-old focus:outline-none"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            e.currentTarget.blur();
          }
        }}
      />
    </div>
  );
};

export default InputUnderline;
