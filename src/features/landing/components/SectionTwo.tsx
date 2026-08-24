import { Container } from "@/components/ui";
import { getT } from "@/i18n/server";
import HowIWorkTest from "./section-two/HowIWorkTest";

export default function SectionTwo() {
  const t = getT();
  return (
    <section id="section-2" className="my-20 md:py-6">
      <Container className="space-y-10">
        <div className="flex items-baseline justify-center gap-3">
          <h2 className="text-3xl font-semibold">How I Work?</h2>
          <p>Currently i adopt modern worflow and standarazie by myself.</p>
        </div>
        <HowIWorkTest />
        {/* <NavigationButton activeTab={activeTab} onTabChange={setActiveTab} /> */}
        {/* <div key={activeTab} className="animate-fade-in min-h-80 md:min-h-90">
          {activeTab === "howIWork" ? <HowIWorkTest /> : <TechStack />}
        </div> */}
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
