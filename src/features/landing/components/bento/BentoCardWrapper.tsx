import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import HandDrawnWrappingText from "@/components/shared/HandDrawnWrappingText";

export interface BentoCardStyleOptions {
  enableHover?: boolean;
  tagCard?: {
    enabled?: boolean;
    label?: string;
    action?: React.ReactNode;
  };
}

interface BentoCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: BentoCardStyleOptions;
}

interface BentoCardHeaderProps {
  label?: string;
  action?: React.ReactNode;
}

export default function BentoCardWrapper({
  children,
  className,
  style = {},
}: BentoCardWrapperProps) {
  const { enableHover = false, tagCard } = style;

  const hoverStyles = enableHover
    ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:hover:border-zinc-700/80"
    : "";

  return (
    <Card className={cn(hoverStyles, className)}>
      {tagCard?.enabled && (
        <BentoCardHeader label={tagCard.label} action={tagCard.action} />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function BentoCardHeader({ label, action }: BentoCardHeaderProps) {
  if (!label && !action) return null;

  return (
    <CardHeader>
      {label && (
        <CardTitle>
          <HandDrawnWrappingText>{label}</HandDrawnWrappingText>
        </CardTitle>
      )}
      {action && <CardAction>{action}</CardAction>}
    </CardHeader>
  );
}
