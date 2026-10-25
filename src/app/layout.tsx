import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ct-vivi-nunes.vercel.app"),
  title: "CT Vivi Nunes | Complexo Esportivo de Areia em Videira - SC",
  description:
    "Quadras de areia higienizada para Beach Tennis, Vôlei de Praia e Futevôlei em Videira - SC. Treinamento funcional de alta performance e aulas com acompanhamento profissional. Reserve seu horário!",
  keywords: [
    "CT Vivi Nunes",
    "Complexo Esportivo Videira",
    "Quadra de areia Videira",
    "Beach Tennis Videira",
    "Vôlei de Praia Videira",
    "Futevôlei Videira",
    "Treinamento Funcional Areia",
    "Locação de Quadras Videira",
    "Santa Lúcia Videira",
  ],
  authors: [{ name: "CT Vivi Nunes" }],
  creator: "CT Vivi Nunes",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ct-vivi-nunes.vercel.app",
    title: "CT Vivi Nunes | Viva a energia da praia no coração de Videira",
    description:
      "Locação de quadras de areia para Beach Tennis, Vôlei e Futevôlei, além de treinamento funcional e aulas especializadas em Videira - SC. Avaliação 5.0 no Google.",
    siteName: "CT Vivi Nunes",
    images: [
      {
        url: "/vivinunes/telainicialdesktop.jpg",
        width: 1200,
        height: 630,
        alt: "Quadras de Areia do CT Vivi Nunes com iluminação e vista panorâmica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CT Vivi Nunes | Complexo Esportivo de Areia em Videira - SC",
    description:
      "Quadras de Beach Tennis, Vôlei e Futevôlei com areia higienizada e iluminação noturna em Videira.",
    images: ["/vivinunes/telainicialdesktop.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "CT Vivi Nunes - Complexo Esportivo de Areia",
    description:
      "Complexo esportivo de areia especializado em locação de quadras para Beach Tennis, Vôlei de Praia, Futevôlei e Treinamento Funcional.",
    image: "https://ct-vivi-nunes.vercel.app/vivinunes/telainicialdesktop.jpg",
    logo: "https://ct-vivi-nunes.vercel.app/vivinunes/logo.jpg",
    telephone: "+55-49-99948-6797",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Benedito Tomaz Scussiato, 200",
      addressLocality: "Videira",
      addressRegion: "SC",
      postalCode: "89565-350",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.012,
      longitude: -51.148,
    },
    url: "https://ct-vivi-nunes.vercel.app",
    priceRange: "$$",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "23:30",
      },
    ],
    sameAs: ["https://www.instagram.com/ct_vivinunes"],
  };

  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0F1115] text-[#F4F4F5] font-sans antialiased selection:bg-amber-500 selection:text-stone-950">
        {children}
      </body>
    </html>
  );
}
