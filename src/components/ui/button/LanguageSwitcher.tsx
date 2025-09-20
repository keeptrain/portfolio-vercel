import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="min-w-[40px] rounded-full p-2 text-sm font-medium text-gray-600 shadow-sm transition-colors duration-200 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-primary-400"
      aria-label="Toggle language"
    >
      {language === "en" ? "ID" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
