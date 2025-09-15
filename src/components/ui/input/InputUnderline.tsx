'use client'

import React from "react";

type Props = {
  label: string,
  type: string,
  id: string,
  placeholder: string
}

const InputUnderline = ({label, type, id, placeholder}: Props) => {
  return (
    <div className="mb-6 relative">
      <label htmlFor="email-input" className="block mb-1 text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="block w-full py-2 text-gray-600 bg-transparent border-b border-blue-old text-base focus:outline-none focus:border-blue-old"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            e.currentTarget.blur();
          }
        }}
      />
    </div>
  )
}

export default InputUnderline