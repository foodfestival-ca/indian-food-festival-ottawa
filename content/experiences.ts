import { z } from "zod";

/** "More Than Food" — Kids Zone, Culture, Community.
 *  Marketplace has its own section and is deliberately not here. */

const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  blurb: z.string(),
  image: z.string(),
  alt: z.string(),
  icon: z.enum(["baby", "landmark", "heart"]),
  href: z.string(),
});

export const experiences = z.array(ExperienceSchema).parse([
  {
    id: "kids",
    title: "Kids Zone",
    blurb: "Rangoli, henna, craft tables and performances built for small people — so parents get to eat their food warm.",
    image: "/media/kids/kids-zone.jpg",
    alt: "Children taking part in craft activities at the Kids Zone",
    icon: "baby",
    href: "/schedule",
  },
  {
    id: "culture",
    title: "Culture",
    blurb: "Classical and folk traditions from across India, performed by the communities who carry them.",
    image: "/media/cultural/culture.jpg",
    alt: "A classical dance performance on the main stage",
    icon: "landmark",
    href: "/gallery",
  },
  {
    id: "community",
    title: "Community",
    blurb: "Three days that turn a park into a neighbourhood — cultural associations, volunteers and ten thousand neighbours.",
    image: "/media/community/community.jpg",
    alt: "Festival visitors gathered together on the festival grounds",
    icon: "heart",
    href: "/gallery",
  },
]);

export type Experience = (typeof experiences)[number];
