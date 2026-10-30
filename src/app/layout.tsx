import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Oswald } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["italic"],
  weight: ["600"],
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0F1115",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ct-vivi-nunes.vercel.app"),
  title: "CT Vivi Nunes | Complexo de Areia em Videira - SC • Locação de Quadras e Aulas",
  description:
    "Complexo de areia oficial em Videira - SC. 3 quadras (2 cobertas e 1 aberta) para Vôlei de Praia, Beach Tennis e Futevôlei. Aulas com a Profª Vivi Nunes e locação de horários com Jefe. Reserve pelo WhatsApp!",
  keywords: [
    "CT Vivi Nunes",
    "Complexo Esportivo Videira",
    "Quadra de areia Videira",
    "Beach Tennis Videira",
    "Vôlei de Praia Videira",
    "Futevôlei Videira",
    "Treinamento Funcional Areia",
    "Locação de Quadras Videira",
    "Professora Vivi Nunes",
    "Vôlei de areia Santa Catarina",
    "Alto da Boa Vista Videira",
    "Nossa Senhora Aparecida Videira",
  ],
  authors: [{ name: "CT Vivi Nunes" }, { name: "Profª Vivi Nunes" }],
  creator: "CT Vivi Nunes",
  publisher: "CT Vivi Nunes",
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://ct-vivi-nunes.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://ct-vivi-nunes.vercel.app",
    title: "CT Vivi Nunes | Complexo de Areia em Videira - SC",
    description:
      "Viva a energia da praia no coração de Videira. 3 Quadras de Areia (2 cobertas e 1 aberta) para Vôlei de Praia, Beach Tennis e Futevôlei. Aulas e locações pelo WhatsApp.",
    siteName: "CT Vivi Nunes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CT Vivi Nunes - Complexo Esportivo de Areia em Videira - SC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CT Vivi Nunes | Complexo de Areia em Videira - SC",
    description:
      "Viva a energia da praia no coração de Videira. 3 Quadras de Areia (2 cobertas e 1 aberta) para Vôlei, Beach Tennis e Futevôlei.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Schema do Negócio Local Esportivo
  const sportsLocationSchema = {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "SportsClub"],
    "@id": "https://ct-vivi-nunes.vercel.app/#organization",
    name: "CT Vivi Nunes - Complexo Esportivo de Areia",
    alternateName: "CT Vivi Nunes",
    description:
      "Complexo esportivo de areia em Videira - SC. 3 quadras oficiais de areia higienizada (2 cobertas e 1 ao ar livre) para Vôlei de Praia, Beach Tennis e Futevôlei, além de treinamento funcional e aulas com a ex-atleta profissional Profª Vivi Nunes.",
    image: "https://ct-vivi-nunes.vercel.app/og-image.jpg",
    logo: {
      "@type": "ImageObject",
      url: "https://ct-vivi-nunes.vercel.app/android-chrome-512x512.png",
      width: "512",
      height: "512",
    },
    telephone: "+55-49-99948-6797",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Nossa Senhora Aparecida, s/n",
      addressLocality: "Videira",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -27.012,
      longitude: -51.148,
    },
    url: "https://ct-vivi-nunes.vercel.app",
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: "Profª Vivi Nunes",
      jobTitle: "Ex-Atleta Profissional e Treinadora de Vôlei de Praia",
    },
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
    sameAs: [
      "https://www.instagram.com/ct_vivinunes",
      "https://maps.google.com/?q=CT+Vivi+Nunes+Videira",
    ],
  };

  // 2. Schema de WebSite para o Google exibir o Site Name oficial ao lado do favicon
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ct-vivi-nunes.vercel.app/#website",
    url: "https://ct-vivi-nunes.vercel.app",
    name: "CT Vivi Nunes",
    alternateName: [
      "CT Vivi Nunes Complexo de Areia",
      "Complexo Esportivo Vivi Nunes Videira",
    ],
    publisher: {
      "@id": "https://ct-vivi-nunes.vercel.app/#organization",
    },
  };

  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${oswald.variable} dark scroll-smooth antialiased`}
    >
      <head>
        {/* Google Fonts Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Playfair+Display:ital,wght@1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        {/* Metadados de Visualização Mobile & App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="CT Vivi Nunes" />
        <meta name="application-name" content="CT Vivi Nunes" />

        {/* Schemas Estruturados para o Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsLocationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-[#0F1115] text-[#F4F4F5] font-sans antialiased selection:bg-amber-500 selection:text-stone-950">
        {children}
      </body>
    </html>
  );
}
