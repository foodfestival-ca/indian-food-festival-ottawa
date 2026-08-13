import { z } from "zod";
import { SOCIAL_URLS } from "@/content/social";

/**
 * Single source of truth for every festival fact.
 * Changing a value here propagates to hero, countdown, venue, schedule,
 * JSON-LD, OG image and meta description. Never hardcode these in a component.
 */

const FestivalSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  edition: z.string(),
  tagline: z.string(),
  themeLine: z.string(),
  subheading: z.string(),
  /** ISO-8601 WITH explicit Ottawa offset (EDT = -04:00).
   *  Must never be a floating local time: a visitor in Mumbai has to see
   *  the countdown to Ottawa's 4 PM, not their own. */
  startsAt: z.string(),
  endsAt: z.string(),
  timeZone: z.string(),
  dateLabel: z.string(),
  admission: z.string(),
  admissionPrice: z.number(),
  currency: z.string(),
  venue: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    region: z.string(),
    regionCode: z.string(),
    postalCode: z.string(),
    country: z.string(),
    countryCode: z.string(),
    lat: z.number(),
    lng: z.number(),
    mapsUrl: z.string().url(),
    directionsUrl: z.string().url(),
  }),
  days: z.array(
    z.object({
      id: z.string(),
      weekday: z.string(),
      dateLabel: z.string(),
      opens: z.string(),
      closes: z.string(),
      hoursLabel: z.string(),
    })
  ),
  organizer: z.object({
    name: z.string(),
    legalName: z.string(),
    founders: z.array(z.string()),
    email: z.string().email(),
    url: z.string().url(),
  }),
  social: z.object({
    instagram: z.string().url(),
    facebook: z.string().url(),
    youtube: z.string().url(),
    instagramHandle: z.string(),
  }),
  stats: z.array(
    z.object({ value: z.number(), suffix: z.string(), label: z.string(), sub: z.string() })
  ),
});

export const festival = FestivalSchema.parse({
  name: "Indian Food Festival of Ottawa",
  shortName: "Indian Food Festival",
  edition: "2026 · Third Edition",
  tagline: "Tastes Like India, Feels Like Home",
  themeLine: "Where Every Bite Tells a Story",
  subheading: "Ottawa's Largest Indian Food & Cultural Festival",

  startsAt: "2026-08-21T16:00:00-04:00",
  endsAt: "2026-08-23T18:00:00-04:00",
  timeZone: "America/Toronto",
  dateLabel: "August 21–23, 2026",

  admission: "FREE Admission",
  admissionPrice: 0,
  currency: "CAD",

  venue: {
    name: "Clarke Fields Park",
    street: "Clarke Fields Park",
    city: "Ottawa",
    region: "Ontario",
    regionCode: "ON",
    postalCode: "K1T",
    country: "Canada",
    countryCode: "CA",
    lat: 45.3389,
    lng: -75.6103,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Clarke+Fields+Park+Ottawa",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Clarke+Fields+Park+Ottawa",
  },

  days: [
    { id: "fri", weekday: "Friday",   dateLabel: "August 21", opens: "16:00", closes: "22:00", hoursLabel: "4 PM – 10 PM" },
    { id: "sat", weekday: "Saturday", dateLabel: "August 22", opens: "12:00", closes: "22:00", hoursLabel: "12 PM – 10 PM" },
    { id: "sun", weekday: "Sunday",   dateLabel: "August 23", opens: "12:00", closes: "18:00", hoursLabel: "12 PM – 6 PM" },
  ],

  organizer: {
    name: "Navatara Inc.",
    legalName: "Navatara Inc.",
    founders: ["Bhakti Sheth", "Sagar Vora"],
    email: "info@indianfoodfestival.ca",
    url: "https://indianfoodfestival.ca",
  },

  social: {
    // Sourced from content/social.ts — the single shared constant every
    // Instagram link on the site resolves from. Do not hardcode this URL
    // here or anywhere else.
    instagram: SOCIAL_URLS.instagram,
    facebook: "https://www.facebook.com/profile.php?id=61561209986037",
    youtube: "https://youtube.com/@indianfoodfestivalottawa",
    instagramHandle: "theindianfoodfestival",
  },

  stats: [
    { value: 25,    suffix: "",  label: "Food Vendors",      sub: "Flavours across India" },
    { value: 15,    suffix: "+", label: "Product Vendors",   sub: "& Local Businesses" },
    { value: 35,    suffix: "+", label: "Performances",      sub: "Music, Dance & More" },
    { value: 10000, suffix: "+", label: "Happy Visitors",    sub: "Every Year" },
  ],
});

export type Festival = typeof festival;
