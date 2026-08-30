import { ReactNode, Suspense } from "react";
import { Container } from "@/components/ui/Container";
import ListAboutMobileDrawer from "@/features/about/components/ListAboutMobileDrawer";
import AboutSideTab from "@/features/about/components/AboutSideTab";
import { Skeleton } from "@/components/ui";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mt-10 space-y-4 md:mt-16 md:mb-12">
      {/* Mobile Drawer */}
      <ListAboutMobileDrawer />

      {/* Page Header */}
      <Container className="md:mb-12">
        <h1 className="font-serif text-2xl md:text-3xl">About Me</h1>
      </Container>

      <Container>
        <div className="grid grid-cols-1 pb-16 md:grid-cols-12 md:pb-24">
          {/* Desktop Left Side: Persistent Navigation Sidebar */}
          <AboutSideTab className="hidden md:col-span-4 md:flex lg:col-span-3" />

          {/* Right Side: Tab Sub-route Content */}
          <div className="min-h-125 md:col-span-8 lg:col-span-9">
            <Suspense fallback={<AboutSkeleton />}>{children}</Suspense>
          </div>
        </div>
      </Container>
    </main>
  );
}

function AboutSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-50" />
      <Skeleton className="h-40 w-full rounded-2xl" />
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}
