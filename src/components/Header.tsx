'use client'

import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useLanguage} from '@/contexts/LanguageContext'
import LanguageSwitcher from "@/components/ui/button/LanguageSwitcher";
import {Bars3BottomRight, XMark} from "@/components/icons/heroicons";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const {t} = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const navItems = [
    {href: '#about', label: t('nav.about')},
    {href: '/blog', label: 'Blog'},
    {href: '#projects', label: t('nav.projects')},
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 transform
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}>
      <nav className="max-w-7xl mx-auto px-12">
        <div className="flex items-center justify-between h-16 px-12">
          <Link
            href="/"
            className="text-sm font-bold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
          </Link>

          <div
            className="hidden md:flex bg-white/80 text-sm font-medium items-center space-x-8 shadow-sm rounded-full px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}

          </div>

          <ul className="hidden md:flex relative">
            <button
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              className="cursor-pointer">
              {isOpenDropdown ? (
                <XMark color="black"/>
              ) : (
                <Bars3BottomRight color="black"/>
              )}
            </button>
            <div
              className={`absolute top-16 left-0 right-0 -translate-x-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg w-48 transition-all duration-300 ${isOpenDropdown ? 'block' : 'hidden'}`}>
              <li>
                test
              </li>
              <li>
                test
              </li>

            </div>
          </ul>

          {/*<LanguageSwitcher/>*/}

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher/>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
