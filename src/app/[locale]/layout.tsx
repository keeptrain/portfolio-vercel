import { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { locales, Locale } from "@/i18n/locales";
import { loadMessages } from "@/i18n/loadMessages";
import { TranslationProvider } from "@/i18n/TranslationContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { setRequestLocale, getT } from "@/i18n/server";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = getT();

  return {
    title: "KeepTrain",
    description: t("hero.description"),
    keywords: "portfolio junior developer",
    authors: { name: "Gilang" },
    creator: "Gilang",
    alternates: {
      languages: {
        en: "/en",
        id: "/id",
      },
    },
    openGraph: {
      title: "Portfolio | Gilang",
      description: t("hero.description"),
      type: "website",
      locale: locale === "id" ? "id_ID" : "en_US",
      images: [{ url: "/images/og-cover.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Gilang",
      description: t("hero.description"),
      images: ["/images/og-cover.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Set locale ke request context cache agar server component di bawahnya bisa baca tanpa props
  setRequestLocale(locale as Locale);

  const messages = loadMessages(locale as Locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${montserrat.className} font-sans ${inter.variable}`}
    >
      <head>
        <meta
          name="viewport"
          charSet="UTF-8"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className="bg-accent">
        <ThemeProvider>
          <TranslationProvider messages={messages} locale={locale}>
            <main id="main-content">
              <div id="top" className="mb-15" />
              {children}
            </main>
            <Footer locale={locale as Locale} />
            <BottomNav locale={locale as Locale} />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
