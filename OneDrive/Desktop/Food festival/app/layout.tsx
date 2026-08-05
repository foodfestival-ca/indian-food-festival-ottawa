import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/jsonld";
import { festival } from "@/content/festival";
import { SITE_URL } from "@/lib/seo";

/* Self-hosted via next/font: no render-blocking request to Google, and
   `adjustFontFallback` matches fallback metrics so CLS stays at zero. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${festival.name} 2026 | ${festival.subheading}`,
    template: `%s | ${festival.name}`,
  },
  description: `${festival.subheading}. ${festival.dateLabel} at ${festival.venue.name}, Ottawa. Free admission. 100+ food vendors, 50+ live performances, marketplace and Kids Zone.`,
  applicationName: festival.name,
  keywords: [
    "Indian food festival Ottawa",
    "Ottawa Indian festival 2026",
    "free festival Ottawa August",
    "Clarke Fields Park events",
    "Indian street food Ottawa",
    "family festival Ottawa",
  ],
  authors: [{ name: festival.organizer.legalName }],
  creator: festival.organizer.legalName,
  publisher: festival.organizer.legalName,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: festival.name,
    locale: "en_CA",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

/* viewportFit: "cover" is what makes env(safe-area-inset-*) resolve to real
   values on notched iPhones. Without it every safe-area token silently
   returns 0 and content sits under the Dynamic Island. */
export const viewport: Viewport = {
  themeColor: "#6B1028",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  /* maximumScale is intentionally NOT set — capping zoom fails WCAG 1.4.4. */
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
