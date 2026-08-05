import { z } from "zod";

const OrganizerSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string(),
  /** CSS `object-position` for the portrait — lets each photo's face framing
   *  be tuned individually (crop, camera angle, headroom all differ) without
   *  touching the component. Defaults to "center top" in the component if
   *  omitted. */
  imagePosition: z.string().optional(),
});

export const organizers = z.array(OrganizerSchema).parse([
  {
    id: "bhakti",
    name: "Bhakti Sheth",
    role: "Co-Founder",
    bio: "Co-founded the festival in 2024 with the conviction that Ottawa was ready for something at this scale — and was proved right by ten thousand people in a single weekend.",
    image: "/media/team/bhakti.jpg",
    imagePosition: "center 15%",
  },
  {
    id: "pujan",
    name: "Pujan Sanura",
    role: "Co-Founder",
    bio: "Keeps the festival running on the ground — the team, the timeline and the hundred small decisions on-site that make three days feel effortless from the outside.",
    image: "/media/team/pujan.jpg",
    imagePosition: "center 12%",
  },
  {
    id: "sagar",
    name: "Sagar Vora",
    role: "Co-Founder",
    bio: "Builds the vendor and partner side of the festival, working with the local businesses and community groups who turn a park into a neighbourhood for three days.",
    image: "/media/team/sagar.jpg",
    imagePosition: "center 18%",
  },
]);

export const aboutCopy = {
  story: {
    eyebrow: "Our Story",
    title: "It Started With a Simple Question",
    accent: "Simple Question",
    body: [
      "Where does an Indian family in Ottawa go to find the food they grew up with — not a version of it, but the actual thing, made by someone from the place it comes from?",
      "In 2024, Navatara Inc. answered it by putting thirty vendors in a park and hoping a few thousand people would come. Ten thousand did. Stalls sold out hours before closing.",
      "In 2025 the festival grew in every direction, and CBC and CTV came to see why. In 2026 we return for a third edition — three days, over a hundred vendors, and the most ambitious cultural programme we have staged.",
    ],
  },
  mission: {
    title: "Our Mission",
    body: "To give India's regional food cultures a real stage in Ottawa — and to make that stage free, so nobody is priced out of their own heritage or a stranger's.",
  },
  vision: {
    title: "Our Vision",
    body: "A festival that belongs to the whole city: where a family from Kerala and a family from Kanata are equally at home, eating the same thing, at the same table.",
  },
} as const;

export type Organizer = (typeof organizers)[number];
