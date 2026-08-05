import { redirect } from "next/navigation";

/**
 * /contact was merged into /about (see the Contact section at the end of
 * app/about/page.tsx). Kept as a redirect rather than a hard-deleted route
 * so any existing bookmarks or external links to /contact still land
 * somewhere useful instead of 404ing.
 */
export default function ContactPage() {
  redirect("/about#contact");
}
