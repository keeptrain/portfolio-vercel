import type {Metadata} from 'next'
import {Inter, Montserrat} from 'next/font/google'
import {ThemeProvider} from '@/contexts/ThemeContext'
import {LanguageProvider} from '@/contexts/LanguageContext'
import '@/app/globals.css'
import Header from "@/components/Header";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KeepTrain',
  description: 'A modern, minimalist portfolio showcasing my work and skills.',
  keywords: 'portfolio junior developer',
  authors: [{name: 'Gilang'}],
  creator: 'Gilang',
  openGraph: {
    title: 'Portfolio | Gilang',
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
  }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>KeepDev</title>
    </head>
    <body className={`${montserrat.className} bg-zinc-50 dark:bg-[#080808]`}>
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}