import { Ticket, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FormButton } from "@/components/ui/FormButton";
import { Reveal } from "@/components/motion/Reveal";
import { MandalaCorner, GoldRule } from "@/components/ornament/Ornaments";

/** The page's loudest moment. Warmth returns after the plain-spoken
 *  logistics band (Schedule → Venue). */
export function PassportCTA() {
  return (
    <section
      id="passport-cta"
      aria-labelledby="passport-cta-heading"
      className="section-y relative overflow-hidden bg-[var(--color-maroon)] text-[var(--color-cream)]"
    >
      <MandalaCorner className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 text-[var(--color-gold)] opacity-[0.09] lg:h-96 lg:w-96" />

      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow text-[var(--color-gold-soft)]">Sweet Finish</p>
          <GoldRule className="mx-auto mt-3 mb-6 max-w-[12rem]" />
          <h2
            id="passport-cta-heading"
            className="mx-auto max-w-[22ch] font-[family-name:var(--font-display)] text-[length:var(--text-4xl)] font-bold leading-tight"
          >
            Claim Your Festival <span className="text-[var(--color-gold)]">Passport</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-[length:var(--text-lg)] text-[var(--color-cream)]/80">
            Free, takes under a minute, and turns three days of eating into something you can win prizes for.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <FormButton form="passport" variant="primary" size="lg" fluid>
              <Ticket size={18} aria-hidden="true" />
              Get Your Passport
            </FormButton>
            <Button href="/passport" variant="onDark" size="lg" fluid>
              How It Works
              <ArrowRight size={17} aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
