import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { AboutNav } from "@/features/about/components/AboutNav";
import ListAboutMobileDrawer from "@/features/about/components/ListAboutMobileDrawer";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mt-10 md:mt-16 md:mb-12">
      {/* Page Header */}
      <Container className="md:mb-12">
        <h1 className="font-serif text-lg md:text-3xl">About Me</h1>
      </Container>

      {/* Mobile Drawer */}
      <ListAboutMobileDrawer />

      <Container>
        <div className="grid grid-cols-1 pb-16 md:grid-cols-12 md:pb-24">
          {/* Desktop Left Side: Persistent Navigation Sidebar */}
          <AboutNav className="sticky top-24 hidden self-start md:col-span-4 md:flex lg:col-span-3" />

          {/* Right Side: Tab Sub-route Content */}
          <div className="min-h-125 md:col-span-8 lg:col-span-9">
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}
