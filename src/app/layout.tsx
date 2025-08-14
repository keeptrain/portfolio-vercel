import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {ThemeProvider} from '@/contexts/ThemeContext'
import {LanguageProvider} from '@/contexts/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KeepTrain',
  description: 'A modern, minimalist portfolio showcasing my work and skills.',
  keywords: 'portfolio, web developer, designer, projects',
  authors: [{name: 'Your Name'}],
  creator: 'Your Name',
  openGraph: {
    title: 'Portfolio | Your Name',
    description: 'A modern, minimalist portfolio showcasing my work and skills.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Your Name',
    description: 'A modern, minimalist portfolio showcasing my work and skills.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout(
  {
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <html lang="en" className={inter.variable}>
    <body className="font-sans antialiased">
    <div
      className="inset-0 z-0 bg-[repeating-linear-gradient(45deg,theme(colors.gray.100)_0,theme(colors.gray.200)_1px,transparent_1px,transparent_12px)] dark:bg-[repeating-linear-gradient(45deg,theme(colors.blue.900)_0,theme(colors.blue.900)_1px,transparent_1px,transparent_12px)]">
      <ThemeProvider>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </div>
    </body>
    </html>
  )
}