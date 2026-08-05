import { z } from "zod";

/** Video-forward by design: dance is motion, and a still photograph of dance
 *  is a compromise. Poster frames until real footage lands. */

const PerformanceSchema = z.object({
  id: z.string(),
  title: z.string(),
  form: z.string(),
  blurb: z.string(),
  poster: z.string(),
  video: z.string().optional(),
  alt: z.string(),
  feature: z.boolean(),
});

export const performances = z.array(PerformanceSchema).parse([
  {
    id: "classical",
    title: "Classical Dance",
    form: "Bharatanatyam · Kathak",
    blurb:
      "Centuries-old forms performed by Ottawa's dance schools — the students and the teachers who taught them, on the same stage.",
    poster: "/media/cultural/classical.jpg",
    alt: "A Bharatanatyam dancer mid-performance on the main stage",
    feature: true,
  },
  {
    id: "folk",
    title: "Folk Traditions",
    form: "Garba · Bhangra · Lavani",
    blurb: "Regional dance with the volume up. Audience participation is not optional so much as inevitable.",
    poster: "/media/dance/folk.jpg",
    alt: "Folk dancers performing garba in colourful dress",
    feature: false,
  },
  {
    id: "live-music",
    title: "Live Music",
    form: "Folk · Fusion · Playback",
    blurb: "Ensembles moving between classical instrumentation and film music, often inside the same set.",
    poster: "/media/music/live.jpg",
    alt: "Musicians performing live at the festival",
    feature: false,
  },
  {
    id: "dj",
    title: "DJ Nights",
    form: "Bollywood · Bhangra",
    blurb: "Three nights that end with the field turned into a dance floor. Saturday is the big one.",
    poster: "/media/music/dj.jpg",
    alt: "Crowd dancing at the festival DJ night",
    feature: false,
  },
]);

export type Performance = (typeof performances)[number];
