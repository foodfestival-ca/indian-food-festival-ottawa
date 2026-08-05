import { z } from "zod";

/** Source of truth for both the FAQ accordion and FAQPage JSON-LD.
 *  One list, no drift between the UI and the structured data. */

const FaqSchema = z.object({ q: z.string(), a: z.string() });

export const faqs = z.array(FaqSchema).parse([
  {
    q: "Is the festival really free?",
    a: "Yes. Admission to the Indian Food Festival of Ottawa is completely free for all three days. You only pay for what you choose to eat or buy from vendors.",
  },
  {
    q: "Where is it held, and is there parking?",
    a: "Clarke Fields Park in Ottawa, Ontario. On-site and nearby street parking is available, and the venue is reachable by OC Transpo. Full directions and parking detail are in the Venue section.",
  },
  {
    q: "Is the festival suitable for children?",
    a: "Very much so. There is a dedicated Kids Zone with activities and performances, and the whole site is stroller-friendly. Admission is free for every age.",
  },
  {
    q: "I have never eaten Indian food. Where should I start?",
    a: "Start with Dabeli — a soft bun with spiced potato, pomegranate and peanuts. It is mildly spiced, familiar in format and one of the most approachable things on site. Vendors are glad to guide first-timers.",
  },
  {
    q: "Are there vegetarian and vegan options?",
    a: "Extensively. A large share of Indian cuisine is naturally vegetarian, and most vendors clearly mark vegetarian, vegan and Jain options. Ask at any stall.",
  },
  {
    q: "What is the Festival Passport?",
    a: "A free digital passport you claim before the festival. Check in at participating vendors across the weekend to collect stamps and enter prize draws. Claiming takes under a minute.",
  },
  {
    q: "What happens if it rains?",
    a: "The festival runs rain or shine. Covered areas are available, and any significant weather change is announced first on our Instagram.",
  },
  {
    q: "Can I pay by card?",
    a: "Most vendors accept card and tap payments, though a small amount of cash is useful for the quickest stalls. ATMs are available on site.",
  },
  {
    q: "Is the venue accessible?",
    a: "Yes. Pathways are level and accessible, with accessible washrooms on site. If you have specific access needs, contact us in advance and we will help you plan the visit.",
  },
  {
    q: "What are the opening hours?",
    a: "Friday 4 PM – 10 PM, Saturday 12 PM – 10 PM, and Sunday 12 PM – 6 PM. Full details are in the Schedule section.",
  },
  {
    q: "Can I bring outside food?",
    a: "The festival is a celebration of our vendors' cooking, so outside food isn't permitted on site — but sealed water bottles and snacks for young children are always fine.",
  },
  {
    q: "Are pets allowed?",
    a: "Leashed, well-behaved pets are welcome in the outdoor grounds. Please be mindful around food stalls and performance crowds, and bring water for them on warm days.",
  },
  {
    q: "How can I become a vendor or sponsor?",
    a: "Visit the Get Involved section for booth options, sponsorship packages and application forms, or email hello@indianfoodfestival.ca.",
  },
]);

export type Faq = (typeof faqs)[number];
