import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ThemeProvider} from '@/contexts/ThemeContext'
import {LanguageProvider} from '@/contexts/LanguageContext'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className={inter.variable}>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Portfolio</title>
    </head>
    <body className="font-sans antialiased bg-zinc-100">
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
    </body>
    </html>
  )
}