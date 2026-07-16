import HomePage from "./components/home-page";

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: "Ijatbilling", url: "https://ijatbilling.id", email: "halo@ijatbilling.id" },
      { "@type": "SoftwareApplication", name: "Ijatbilling", applicationCategory: "BusinessApplication", operatingSystem: "Web, Android, iOS", description: "Platform billing dan operasional ISP terintegrasi.", offers: { "@type": "Offer", price: "0", priceCurrency: "IDR" } },
      { "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "Apakah saya memerlukan server sendiri?", acceptedAnswer: { "@type": "Answer", text: "Tidak. Paket cloud Ijatbilling sudah mencakup infrastruktur." } },
        { "@type": "Question", name: "Apakah pelanggan dapat membayar selama 24 jam?", acceptedAnswer: { "@type": "Answer", text: "Ya. QRIS, virtual account, dan e-wallet dapat diproses otomatis selama 24 jam." } }
      ] }
    ]
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><HomePage /></>;
}
