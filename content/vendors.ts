import { z } from "zod";

/**
 * Vendors — single source of truth for the /vendor page.
 *
 * Originally sourced verbatim from "Meet the Food Vendors.docx" (names,
 * cuisines, descriptions and menu items). The client has since confirmed
 * the festival's vendor roster also includes non-food vendors (henna,
 * jewellery/accessories, tarot), so a handful of `VENDOR_CATEGORIES` values
 * exist purely to bucket those. Adding or removing a vendor only requires
 * editing this file — components/vendors/* renders whatever is here, with
 * no vendor data hardcoded in JSX.
 *
 * `image` holds a real vendor logo (in `/public/vendors/`) where one has
 * been supplied and confidently matched to a vendor by name; it stays empty
 * for vendors without a supplied logo yet. `VendorCard` falls back to a
 * premium initials placeholder in that case (same graceful-fallback pattern
 * already used for sponsors without artwork), so nothing renders as a
 * broken image.
 *
 * `category` drives the filter chips and must be one of `VENDOR_CATEGORIES`
 * below. It's a single primary cuisine bucket chosen for vendors whose
 * document listing spans more than one (e.g. "Hyderabadi & North Indian");
 * `cuisine` keeps the full text from the document for display on the card.
 * For non-food vendors added later with only a logo confirmed (no source
 * document), `cuisine`/`description`/`menuItems` are left empty rather than
 * invented — `VendorCard`/`VendorModal` render fine with empty strings/
 * arrays here, just without that optional line of copy.
 */

export const VENDOR_CATEGORIES = [
  "South Indian",
  "North Indian",
  "Hyderabadi",
  "Street Food",
  "Himalayan",
  "Nepalese",
  "Gujarati",
  "Maharashtrian",
  "Desserts",
  "Café",
  "Beverages",
  "Fusion",
  "Henna Art",
  "Fashion & Jewelry",
  "Tarot & Wellness",
] as const;

const VendorCategorySchema = z.enum(VENDOR_CATEGORIES);

const VendorSchema = z.object({
  id: z.string(),
  name: z.string(),
  cuisine: z.string(),
  category: VendorCategorySchema,
  description: z.string(),
  image: z.string(),
  menuItems: z.array(z.string()),
});

export const vendors = z.array(VendorSchema).parse([
  {
    id: "dosa-king",
    name: "Dosa King",
    cuisine: "South Indian",
    category: "South Indian",
    description:
      "Experience the authentic flavours of South India with crispy dosas, soft idlis, medu vadas, sambar, and spicy appetizers like Cauliflower 65. Dosa King celebrates the comforting breakfasts and street food traditions of Tamil Nadu and Karnataka.",
    image: "/vendors/dosa-king.png",
    menuItems: ["Dosa", "Idli", "Medu Vada", "Sambar", "Cauliflower 65"],
  },
  {
    id: "everest-cuisine",
    name: "Everest Cuisine",
    cuisine: "",
    category: "Himalayan",
    description: "",
    image: "/vendors/everest-cuisine.png",
    menuItems: [],
  },
  {
    id: "chawlas",
    name: "Chawlas",
    cuisine: "Punjabi",
    category: "North Indian",
    description:
      "Known for hearty North Indian comfort food, Chawlas brings fluffy chole bhature, crispy pakoras, golden jalebi, and refreshing mango lassi — a true taste of Punjab's rich culinary traditions.",
    image: "/vendors/chawlas.jpg",
    menuItems: ["Chole Bhature", "Pakoras", "Jalebi", "Mango Lassi"],
  },
  {
    id: "zaika",
    name: "Zaika",
    cuisine: "Indian Street Food",
    category: "Street Food",
    description:
      "A paradise for chaat lovers, Zaika recreates India's bustling street food scene with buttery pav bhaji, tangy chole kulche, crispy samosas, bhel puri, dahi vada, onion kachori, and freshly brewed masala tea.",
    image: "/vendors/zaika.jpg",
    menuItems: ["Pav Bhaji", "Chole Kulche", "Samosas", "Bhel Puri", "Dahi Vada", "Onion Kachori", "Masala Tea"],
  },
  {
    id: "bawarchi",
    name: "Bawarchi",
    cuisine: "Hyderabadi & North Indian",
    category: "Hyderabadi",
    description:
      "Famous for aromatic Hyderabadi biryanis, Bawarchi brings together royal flavours with Chicken 65, Butter Chicken, Paneer Tikka Masala, freshly baked naan, and traditional Indian beverages like badam milk and rose milk.",
    image: "/vendors/bawarchi.png",
    menuItems: ["Chicken Biryani", "Chicken 65", "Butter Chicken", "Paneer Tikka Masala", "Naan", "Badam Milk", "Rose Milk"],
  },
  {
    id: "vylora-cafe",
    name: "Vylora Café",
    cuisine: "Indian Fusion Café",
    category: "Café",
    description:
      "A modern take on Indian comfort food, Vylora Café blends stuffed kulchas, aloo tikka chaat, Indo-Chinese Hakka noodles, specialty coffees, handcrafted lemonades, and indulgent milkshakes into a contemporary café experience.",
    image: "/vendors/vylora-cafe.jpg",
    menuItems: ["Stuffed Kulchas", "Aloo Tikka Chaat", "Hakka Noodles", "Specialty Coffee", "Lemonade", "Milkshakes"],
  },
  {
    id: "spice-handi",
    name: "Spice Handi",
    cuisine: "Gujarati Street Food",
    category: "Gujarati",
    description:
      "Discover the vibrant flavours of Gujarat through iconic dishes like dabeli, vada pav, pav bhaji, papdi no lot (khichu), methi na gota, and sabudana khichdi — simple, comforting, and packed with authentic regional spices.",
    image: "/vendors/spice-handi.jpg",
    menuItems: ["Dabeli", "Vada Pav", "Pav Bhaji", "Khichu", "Methi Na Gota", "Sabudana Khichdi"],
  },
  {
    id: "cafe-de-momo",
    name: "Café De Momo",
    cuisine: "Himalayan",
    category: "Himalayan",
    description:
      "Dedicated to authentic Himalayan dumplings, Café De Momo serves freshly prepared chicken and paneer momos that are juicy, flavourful, and perfect for sharing.",
    image: "/vendors/cafe-de-momo.png",
    menuItems: ["Chicken Momos", "Paneer Momos"],
  },
  {
    id: "craving-coffee-company",
    name: "Craving Coffee Company",
    cuisine: "Specialty Coffee & Refreshments",
    category: "Beverages",
    description:
      "Recharge between food stops with handcrafted iced coffees, flavoured coffee creations, matcha beverages, blue pea drinks, and refreshing fruit-inspired specialties.",
    image: "/vendors/craving-coffee-company.png",
    menuItems: ["Iced Coffee", "Flavoured Coffee", "Matcha", "Blue Pea Drinks", "Fruit Specialties"],
  },
  {
    id: "chai-talks",
    name: "Chai Talks",
    cuisine: "Indian Tea House & Street Snacks",
    category: "Beverages",
    description:
      "A perfect stop for refreshing beverages and light bites, featuring authentic chai, pani puri, samosas, falooda, masala soda, lemonade, sweets, and classic Indian café favourites.",
    image: "/vendors/chai-talks.jpg",
    menuItems: ["Chai", "Pani Puri", "Samosas", "Falooda", "Masala Soda", "Lemonade", "Sweets"],
  },
  {
    id: "kathiyawadi-bites",
    name: "Kathiyawadi Bites",
    cuisine: "Gujarati Kathiyawadi",
    category: "Gujarati",
    description:
      "Inspired by the rustic cuisine of Gujarat's Kathiyawad region, this vendor brings regional street food favourites with bold spices, including pani puri, frankies, and traditional Gujarati flavours.",
    image: "",
    menuItems: ["Pani Puri", "Frankies"],
  },
  {
    id: "himalayan-momo",
    name: "Himalayan Momo",
    cuisine: "Himalayan Fusion",
    category: "Himalayan",
    description:
      "Serving handmade dumplings, Himalayan burgers, noodles, spring rolls, and refreshing mango lassi, this vendor blends traditional Himalayan recipes with modern street food favourites.",
    image: "/vendors/himalayan-momo.jpg",
    menuItems: ["Momos", "Himalayan Burgers", "Noodles", "Spring Rolls", "Mango Lassi"],
  },
  {
    id: "desi-tadka",
    name: "Desi Tadka",
    cuisine: "Indian Fusion Comfort Food",
    category: "Fusion",
    description:
      "A creative fusion kitchen featuring butter chicken poutine, paneer poutine, masala fries, rice bowls, samosas, and bread pakoras — bringing together Canadian comfort food with bold Indian flavours.",
    image: "/vendors/desi-tadka.jpg",
    menuItems: ["Butter Chicken Poutine", "Paneer Poutine", "Masala Fries", "Rice Bowls", "Samosas", "Bread Pakoras"],
  },
  {
    id: "celebrations",
    name: "Celebrations",
    cuisine: "South Indian & Hyderabadi",
    category: "South Indian",
    description:
      "Offering a delicious mix of South Indian breakfast classics like punugulu, Mysore bonda, idly, dosa, and poori alongside fragrant chicken and paneer biryanis.",
    image: "/vendors/celebrations.png",
    menuItems: ["Punugulu", "Mysore Bonda", "Idly", "Dosa", "Poori", "Chicken Biryani", "Paneer Biryani"],
  },
  {
    id: "mahesh-foods",
    name: "Mahesh Foods",
    cuisine: "Traditional Maharashtrian",
    category: "Maharashtrian",
    description:
      "Experience the authentic home-style flavours of Maharashtra through festive delicacies including modak, puran poli, pithla bhakri, varan bhatti, shrikhand, chakli, shakarpale, buttermilk, and traditional chutneys.",
    image: "/vendors/mahesh-foods.jpg",
    menuItems: ["Modak", "Puran Poli", "Pithla Bhakri", "Varan Bhatti", "Shrikhand", "Chakli", "Shakarpale", "Buttermilk"],
  },
  {
    id: "swaaha",
    name: "Swaaha Pure Maharashtrian Cuisine",
    cuisine: "Maharashtrian Street Food",
    category: "Maharashtrian",
    description:
      "Bringing the bold flavours of western India with misal pav, sabudana khichdi, ragda pattice, cut vada, thalipith, kokam juice, and solkadhi — perfect for those looking to explore authentic Maharashtrian cuisine.",
    image: "/vendors/swaaha.jpg",
    menuItems: ["Misal Pav", "Sabudana Khichdi", "Ragda Pattice", "Cut Vada", "Thalipith", "Kokam Juice", "Solkadhi"],
  },
  {
    id: "freshly",
    name: "Freshly",
    cuisine: "Indian Beverages & Café",
    category: "Beverages",
    description:
      "A refreshing destination featuring handcrafted lemonades, fresh fruit coolers, traditional Indian drinks like aam panna and jaljeera, flavoured lassis, milkshakes, jigarthanda, and nostalgic bun maska.",
    image: "/vendors/freshly.jpg",
    menuItems: ["Lemonades", "Fruit Coolers", "Aam Panna", "Jaljeera", "Lassi", "Milkshakes", "Jigarthanda", "Bun Maska"],
  },
  {
    id: "bertolucci",
    name: "Bertolucci",
    cuisine: "Artisan Bakery",
    category: "Desserts",
    description:
      "An irresistible dessert destination featuring handcrafted cakes inspired by Indian and international flavours, including rasmalai, mango, pistachio, tiramisu, black forest, pineapple cheesecake, and carrot cake.",
    image: "",
    menuItems: ["Rasmalai Cake", "Mango Cake", "Pistachio Cake", "Tiramisu", "Black Forest Cake", "Pineapple Cheesecake", "Carrot Cake"],
  },
  {
    id: "chai-and-juice",
    name: "Chai and Juice",
    cuisine: "Indian Street Café",
    category: "Street Food",
    description:
      "Serving youthful street café favourites including Maggi, kulhad pizza, burgers, pani puri, bhel puri, sev puri, and loaded chaat creations that combine comfort food with Indian flavours.",
    image: "/vendors/chai-and-juice.jpg",
    menuItems: ["Maggi", "Kulhad Pizza", "Burgers", "Pani Puri", "Bhel Puri", "Sev Puri", "Loaded Chaat"],
  },
  {
    id: "iceflame",
    name: "Iceflame",
    cuisine: "Desserts & Refreshments",
    category: "Desserts",
    description:
      "Cool off with colourful ice gola, falooda, ice cream, cold cocoa, strawberry kunafa, jamun shots, masala soda, and creative dessert combinations including samosa poutine.",
    image: "/vendors/iceflame.jpg",
    menuItems: ["Ice Gola", "Falooda", "Ice Cream", "Cold Cocoa", "Strawberry Kunafa", "Jamun Shots", "Masala Soda", "Samosa Poutine"],
  },
  {
    id: "shaaz",
    name: "Shaaz",
    cuisine: "Hyderabadi & South Indian",
    category: "Hyderabadi",
    description:
      "One of the festival's largest menus, Shaaz showcases the rich food culture of Hyderabad with signature Chicken 65, aromatic biryanis, mandi, haleem, authentic dosas, idlis, shawarmas, Irani chai, Osmania biscuits, kulfis, and traditional café favourites that celebrate the city's famous culinary heritage.",
    image: "/vendors/shaaz.jpg",
    menuItems: ["Chicken 65", "Biryani", "Mandi", "Haleem", "Dosa", "Idli", "Shawarma", "Irani Chai", "Osmania Biscuits", "Kulfi"],
  },
  {
    id: "indian-curry-and-kebab-house",
    name: "Indian Curry and Kebab House",
    cuisine: "North Indian",
    category: "North Indian",
    description:
      "Bringing traditional North Indian comfort food with samosa chaat, papdi chaat, and classic aloo puri halwa prepared using authentic family recipes.",
    image: "/vendors/indian-curry-and-kebab-house.png",
    menuItems: ["Samosa Chaat", "Papdi Chaat", "Aloo Puri Halwa"],
  },
  {
    id: "taste-of-egg",
    name: "Taste of Egg",
    cuisine: "Surat Egg Street Food",
    category: "Street Food",
    description:
      "A unique festival experience celebrating Surat's famous late-night egg food culture — from Surati Locho with egg and spicy gotala to rich bhurji, half fry, signature egg rolls, cheese specialties, and egg pulao, plus vegetarian favourites like pav bhaji and masala pav for everyone.",
    image: "",
    menuItems: ["Surati Locho", "Egg Bhurji", "Egg Half Fry", "Egg Rolls", "Egg Pulao", "Pav Bhaji", "Masala Pav"],
  },
  {
    id: "flaunt-it-by-f",
    name: "Flaunt It by F",
    cuisine: "Henna Art by Fatima Ehsan",
    category: "Henna Art",
    description: "",
    image: "/vendors/flaunt-it-by-f.jpg",
    menuItems: [],
  },
  {
    id: "glorious-gleam-by-aditi",
    name: "Glorious Gleam by Aditi",
    cuisine: "Fashion Accessories, Jewelry & More",
    category: "Fashion & Jewelry",
    description: "",
    image: "/vendors/glorious-gleam-by-aditi.jpg",
    menuItems: [],
  },
  {
    id: "tarot-ocean",
    name: "Tarot Ocean",
    cuisine: "Divine Insights Await",
    category: "Tarot & Wellness",
    description: "",
    image: "/vendors/tarot-ocean.jpg",
    menuItems: [],
  },
  {
    id: "the-bling-baari",
    name: "The Bling Baari",
    cuisine: "",
    category: "Fashion & Jewelry",
    description: "",
    image: "/vendors/the-bling-baari.jpg",
    menuItems: [],
  },
  {
    id: "bbg-bangle-box-girl",
    name: "BBG (Bangle Box Girl)",
    cuisine: "",
    category: "Fashion & Jewelry",
    description: "",
    image: "/vendors/bbg-bangle-box-girl.jpg",
    menuItems: [],
  },
]);

export type Vendor = (typeof vendors)[number];

/** Hero copy — the intro paragraph is taken verbatim from the document. */
export const vendorsHero = {
  eyebrow: "Festival Vendors",
  title: "Meet Our Festival Vendors",
  subtitle: "Every Bite Tells a Story",
  description:
    "The Indian Food Festival of Ottawa 2026 brings together some of the region's most exciting restaurants, each representing a different corner of India's diverse culinary landscape. From authentic regional specialties and legendary street food to Himalayan favourites, indulgent desserts, and refreshing beverages, every vendor offers a unique experience waiting to be discovered.",
} as const;

/** Closing "A Culinary Journey Across India" section — from the document's summary. */
export const vendorHighlights = [
  { emoji: "🇮🇳", label: "Authentic Regional Cuisine", detail: "From every corner of India" },
  { emoji: "🥟", label: "Himalayan Specialties", detail: "Himalayan & Nepalese favourites" },
  { emoji: "🌶️", label: "Hyderabadi Flavours", detail: "Legendary biryanis and specialties" },
  { emoji: "🫓", label: "Punjabi Comfort Food", detail: "Hearty North Indian classics" },
  { emoji: "🥥", label: "South Indian Classics", detail: "Dosas, idlis and breakfast staples" },
  { emoji: "🥔", label: "Gujarati Street Food", detail: "Gujarati & Kathiyawadi favourites" },
  { emoji: "🥘", label: "Maharashtrian Cuisine", detail: "Regional delicacies of the west" },
  { emoji: "🍰", label: "Artisan Desserts", detail: "Handcrafted cakes and sweets" },
  { emoji: "☕", label: "Chai, Coffee & Refreshments", detail: "Traditional chai and specialty coffee" },
] as const;

export const vendorsClosing =
  "Whether you're revisiting childhood favourites or discovering a new regional cuisine for the very first time, the Indian Food Festival of Ottawa 2026 promises a culinary adventure where every bite truly tells a story.";
