import NavBar from "@/components/NavBar";
import { Locale } from "@/i18n/locales";

export default async function ProjectsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return (
    <>
      <NavBar locale={locale} />
      {children}
    </>
  );
}