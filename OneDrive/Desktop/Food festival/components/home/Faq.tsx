"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { faqs } from "@/content/faq";
import { cn } from "@/lib/cn";

/**
 * FAQ — accordion, one item open at a time.
 *
 * `content/faq.ts` is the single source of truth already shared with the
 * FAQPage JSON-LD emitted on the homepage (see lib/jsonld.ts `faqJsonLd`) —
 * this section is what makes that structured data correspond to something a
 * visitor actually sees, rather than markup with no visible counterpart.
 *
 * Ground is "white": the section sits between Sponsors (cream-deep) and
 * Contact (cream), and the Thali rule (no two adjacent sections share a
 * ground) rules both of those out here.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section id="faq" ground="white" labelledBy="faq-heading">
      <Container>
        <SectionHeader
          id="faq-heading"
          eyebrow="Good to Know"
          title="Frequently Asked Questions"
          accent="Frequently Asked"
        />

        <Reveal className="mx-auto mt-12 max-w-[46rem]">
          <dl className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {faqs.map((item, i) => {
              const open = openIndex === i;
              const buttonId = `${baseId}-faq-button-${i}`;
              const panelId = `${baseId}-faq-panel-${i}`;

              return (
                <div key={item.q}>
                  <dt>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className={cn(
                        "tap-target flex w-full items-center justify-between gap-4 py-5 text-left",
                        "font-[family-name:var(--font-display)] text-[length:var(--text-lg)] font-bold text-[var(--color-maroon)]",
                        "transition-colors hover:text-[var(--color-burgundy)]",
                        "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-maroon)]"
                      )}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={20}
                        aria-hidden="true"
                        className={cn(
                          "shrink-0 text-[var(--color-saffron)] transition-transform duration-300",
                          open && "rotate-180"
                        )}
                      />
                    </button>
                  </dt>
                  <dd
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!open}
                    className="pb-5 pr-10 text-[length:var(--text-base)] leading-[var(--leading-body)] text-[var(--color-ink-muted)]"
                  >
                    {item.a}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
