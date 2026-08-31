import { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import { locales, Locale } from "@/i18n/locales";
import { loadMessages } from "@/i18n/loadMessages";
import Footer from "@/components/Footer";
import BottomNav from "@/components/navigation/BottomNav";
import { ThemeProvider } from "@/components/theme-provider";
import { getT } from "@/i18n/server";
import { TranslationProvider } from "@/i18n/TranslationContext";

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
  const t = getT();

  return {
    title: "KeepTrain - Software Engineer",
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

  const messages = loadMessages(locale as Locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${montserrat.className} font-sans ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TranslationProvider messages={messages} locale={locale}>
            <main>{children}</main>
            <Footer />
            <BottomNav />
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
