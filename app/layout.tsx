import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ijatbilling.id"),
  title: { default: "Ijatbilling | Aplikasi Billing ISP & MikroTik", template: "%s | Ijatbilling" },
  description: "Platform billing ISP, MikroTik, pelanggan, pembayaran, teknisi, inventaris, dan keuangan dalam satu sistem otomatis.",
  keywords: ["aplikasi billing ISP", "billing MikroTik", "software RT/RW Net", "aplikasi manajemen ISP", "billing internet otomatis"],
  openGraph: { title: "Ijatbilling", description: "Billing, jaringan, dan operasional ISP dalam satu platform.", type: "website", locale: "id_ID" },
  twitter: { card: "summary_large_image", title: "Ijatbilling", description: "Platform operasional ISP terintegrasi." },
  alternates: { canonical: "/" },
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
