import { z } from "zod";

/**
 * Sponsors.
 *
 * `logo` may be an empty string — the component then renders a graceful
 * lettermark placeholder instead of a broken image, so the section is
 * presentable before any logo files arrive.
 *
 * To add a real logo: drop the file in /public/sponsors/ and set `logo`.
 */

const SponsorSchema = z.object({
  id: z.string(),
  name: z.string(),
  tier: z.enum(["presenting", "gold", "community"]),
  logo: z.string(),
  url: z.string().url().optional(),
});

export const sponsorTiers = {
  presenting: { label: "Presenting Partner", order: 0 },
  gold: { label: "Gold Partners", order: 1 },
  community: { label: "Community Partners", order: 2 },
} as const;

/** PLACEHOLDER ROSTER — replace with the confirmed 2026 sponsors. */
export const sponsors = z.array(SponsorSchema).parse([
  { id: "s1", name: "Presenting Partner", tier: "presenting", logo: "" },
  { id: "s2", name: "Gold Partner One", tier: "gold", logo: "" },
  { id: "s3", name: "Gold Partner Two", tier: "gold", logo: "" },
  { id: "s4", name: "Gold Partner Three", tier: "gold", logo: "" },
  { id: "s5", name: "Community Partner", tier: "community", logo: "" },
  { id: "s6", name: "Community Partner", tier: "community", logo: "" },
]);

export const HAS_REAL_SPONSORS = sponsors.some((s) => s.logo !== "");
export type Sponsor = (typeof sponsors)[number];
