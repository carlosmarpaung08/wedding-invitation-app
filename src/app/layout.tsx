import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Wedding of Romeo & Juliet — 31 Desember 2026",
  description:
    "Dengan segala kerendahan hati, kami mengundang Anda untuk hadir merayakan hari bahagia kami. Romeo & Juliet, 31 Desember 2026.",
  openGraph: {
    title: "The Wedding of Romeo & Juliet ✝",
    description:
      "Kami dengan penuh sukacita mengundang Anda untuk hadir merayakan hari bahagia kami. 31 Desember 2026.",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: "/images/couple-hero.png",
        width: 1200,
        height: 630,
        alt: "The Wedding of Romeo & Juliet",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Romeo & Juliet ✝",
    description: "Undangan Pernikahan — 31 Desember 2026",
    images: ["/images/couple-hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
