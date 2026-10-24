import type { Metadata, Viewport } from "next";
import { Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

/** Luxury serif for headings, doodle handwriting for the menu. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Full Websites for 20 Delhi Businesses — by Suraj Kumar",
  description:
    "Complete, mobile-first luxury websites for 20 real Delhi businesses — home, about, menu/services, life, contact and booking — built by Suraj Kumar, Delhi.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#171310",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`min-h-screen font-sans ${playfair.variable} ${caveat.variable}`}>{children}</body>
    </html>
  );
}
