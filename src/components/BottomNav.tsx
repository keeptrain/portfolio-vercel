import { getT, getLocale } from "@/i18n/server";
import BottomNavClient, { NavItemConfig } from "./BottomNavClient";

export default function BottomNav() {
  const currentLocale = getLocale();
  const t = getT();

  const navItems: NavItemConfig[] = [
    {
      id: "home",
      href: `/${currentLocale}`,
      label: t("nav.home"),
    },
    {
      id: "projects",
      href: `/${currentLocale}/projects`,
      label: t("nav.projects"),
    },
    {
      id: "more",
      href: "#",
      label: "Appearance & Language",
    },
  ];

  return <BottomNavClient locale={currentLocale} navItems={navItems} />;
}
