import { redirect } from "next/navigation";

/**
 * /faqs was merged into /venue (see the Faq section at the end of
 * app/venue/page.tsx). Kept as a redirect rather than a hard-deleted route
 * so any existing bookmarks or external links to /faqs still land
 * somewhere useful instead of 404ing.
 */
export default function FaqsPage() {
  redirect("/venue#faq");
}
