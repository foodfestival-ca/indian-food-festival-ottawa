import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] " +
  "font-medium cursor-pointer select-none whitespace-nowrap " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // ① Hero primary — the Passport ask. Loudest element on the page.
  primary:
    "bg-[var(--color-saffron)] text-white shadow-[var(--shadow-sm)] " +
    "hover:bg-[var(--color-saffron-deep)] hover:shadow-[var(--shadow-md)]",
  secondary:
    "bg-[var(--color-maroon)] text-[var(--color-cream)] shadow-[var(--shadow-sm)] " +
    "hover:bg-[var(--color-burgundy)] hover:shadow-[var(--shadow-md)]",
  // ② Hero secondary
  outline:
    "border border-[var(--color-maroon)]/35 text-[var(--color-maroon)] bg-transparent " +
    "hover:bg-[var(--color-maroon)] hover:text-[var(--color-cream)] hover:border-transparent",
  // ③ Hero tertiary
  ghost:
    "text-[var(--color-maroon)] bg-transparent hover:bg-[var(--color-maroon)]/8",
  onDark:
    "border border-[var(--color-cream)]/40 text-[var(--color-cream)] bg-transparent " +
    "hover:bg-[var(--color-cream)] hover:text-[var(--color-maroon)] hover:border-transparent",
};

/* Every size clears the 44px minimum touch target on its short axis. */
const sizes: Record<Size, string> = {
  sm: "min-h-[var(--touch-min)] px-4 text-[var(--text-sm)]",
  md: "min-h-[48px] px-6 text-[var(--text-base)]",
  lg: "min-h-[54px] px-7 text-[var(--text-base)] sm:px-8",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Stretch to full width on mobile, auto from `sm` up. The default for
   *  stacked hero CTAs, where thumb-width targets matter more than elegance. */
  fluid?: boolean;
}

type ButtonProps = CommonProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };
type AnchorProps = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href">;

export function Button(props: ButtonProps | AnchorProps) {
  const { variant = "primary", size = "md", className, children, fluid, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], fluid && "w-full sm:w-auto", className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    const external = href.startsWith("http");
    if (external) {
      return (
        <a className={classes} href={href} target="_blank" rel="noopener noreferrer" {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
