"use client";

import SectionNav, { SectionNavItem } from "@/components/shared/SectionNav";
import { Section, Sections } from "../types";
import { ABOUT_SECTIONS } from "../constants";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface AboutSideTabProps {
  children?: React.ReactNode;
  className?: string;
  onItemClick?: () => void;
}

export default function AboutSideTab({
  children,
  className,
  onItemClick,
}: AboutSideTabProps) {
  const currentSegment = useSelectedLayoutSegment() as Section;
  return (
    <SectionNav className={className}>
      {Sections.map((tab) => (
        <SectionNavItem key={tab}>
          <AboutSideTabItem
            tab={tab}
            activeTab={currentSegment}
            onItemClick={onItemClick}
          />
        </SectionNavItem>
      ))}
      {children}
    </SectionNav>
  );
}

interface AboutSideTabItemProps {
  tab: Section;
  activeTab: Section;
  onItemClick?: () => void;
}

function AboutSideTabItem({
  tab,
  activeTab,
  onItemClick,
}: AboutSideTabItemProps) {
  const isActive = (activeTab || "experiences") === tab;
  const item = ABOUT_SECTIONS[tab];

  return (
    <TabLink href={item.href} isActive={isActive} onItemClick={onItemClick}>
      <TabIcon Icon={item.icon} isActive={isActive} />
      <TabText title={item.title} isActive={isActive} />
    </TabLink>
  );
}

export function TabLink({
  href,
  isActive,
  onItemClick,
  children,
}: {
  href: string;
  isActive: boolean;
  onItemClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onItemClick}
      className={cn(
        "-ml-px flex items-center gap-3 border-l-2 pl-4 text-left transition-all duration-300",
        isActive
          ? "border-zinc-500 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100"
          : "border-transparent text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300",
      )}
    >
      {children}
    </Link>
  );
}

function SubTablink() {
  return;
}

export function TabIcon({
  Icon,
  isActive,
}: {
  Icon: LucideIcon;
  isActive: boolean;
}) {
  return (
    <Icon
      className={cn(
        "size-5 shrink-0 transition-colors",
        isActive
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-400 dark:text-zinc-500",
      )}
    />
  );
}

export function TabText({
  title,
  isActive,
}: {
  title: string;
  isActive: boolean;
}) {
  return (
    <span
      className={cn(
        "text-sm font-medium transition-colors",
        isActive
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-500 dark:text-zinc-400",
      )}
    >
      {title}
    </span>
  );
}
