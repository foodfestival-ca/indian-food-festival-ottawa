"use client";

import { Button } from "@/components/ui/Button";
import { formLink, type FormKey } from "@/content/links";
import type { ReactNode } from "react";

/**
 * Registration CTA. Resolves its href from content/links.ts.
 *
 * If the client hasn't supplied a Google Form URL yet, this falls back to a
 * pre-filled mailto rather than a dead "#" — so no CTA on the live site can
 * ever dead-end, whatever state the config is in.
 */
export function FormButton({
  form,
  children,
  variant = "primary",
  size = "lg",
  fluid,
  className,
}: {
  form: FormKey;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "onDark";
  size?: "sm" | "md" | "lg";
  fluid?: boolean;
  className?: string;
}) {
  const link = formLink(form);

  return (
    <Button
      href={link.href}
      variant={variant}
      size={size}
      fluid={fluid}
      className={className}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Button>
  );
}
