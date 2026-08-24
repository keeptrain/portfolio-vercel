import { Container } from "@/components/ui";
import { getT } from "@/i18n/server";
import HowIWorkTest from "./section-two/HowIWorkTest";

export default function SectionTwo() {
  const t = getT();
  return (
    <section id="section-2" className="my-20 md:py-6">
      <div className="mx-4 mb-10 flex items-baseline gap-3">
        <h2 className="text-4xl font-semibold">How I Work?</h2>
        <p className="text-lg">
          Currently i adopt modern worflow and standarazie by myself.
        </p>
      </div>
      <Container>
        <HowIWorkTest />
      </Container>
    </section>
  );
}

// function NavigationButton({
//   activeTab,
//   onTabChange,
// }: {
//   activeTab: string;
//   onTabChange: (tab: string) => void;
// }) {
//   const { t } = useTranslations();

//   return (
//     <div className="flex items-end gap-4">
//       {[
//         { id: "howIWork", label: t("sectionTwo.tab1") },
//         { id: "techStack", label: t("sectionTwo.tab2") },
//       ].map((tab) => {
//         const isActive = activeTab === tab.id;
//         return (
//           <button
//             key={tab.id}
//             type="button"
//             onClick={() => onTabChange(tab.id)}
//             aria-pressed={isActive}
//             className={cn(
//               "cursor-pointer bg-transparent transition-colors duration-300",
//               isActive
//                 ? "text-xl font-medium text-black sm:text-xl md:text-2xl dark:text-white"
//                 : "text-lg font-light text-gray-400 sm:text-xl md:text-2xl dark:text-gray-500",
//             )}
//           >
//             {tab.label} {tab.id === "techStack" ? "" : "/"}
//           </button>
//         );
//       })}
//     </div>
//   );
// }
