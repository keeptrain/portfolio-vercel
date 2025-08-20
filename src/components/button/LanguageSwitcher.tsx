import React from "react";
import {useLanguage} from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const {language, toggleLanguage} = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium text-sm min-w-[40px]"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'ID' : 'EN'}
    </button>
  )
}

export default LanguageSwitcher;