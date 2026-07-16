"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, Check, CircleCheck, Code2, Download, FileText, PlayCircle, Send, Smartphone } from "lucide-react";
import { featureGroups, marketingPages, pricingPlans } from "../site-data";
import { Footer, Header } from "./marketing-shell";

export default function MarketingPage({ slug }: { slug: string }) {
  const [dark, setDark] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [sent, setSent] = useState(false);
  const page = marketingPages[slug] ?? {
    eyebrow: "Informasi Ijatbilling",
    title: "Dokumen dan informasi layanan",
    description: "Informasi ini disediakan untuk membantu Anda memahami penggunaan layanan Ijatbilling.",
    icon: FileText,
    points: ["Informasi transparan", "Bahasa mudah dipahami", "Pembaruan berkala"],
  };
  const Icon = page.icon;

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div className={dark ? "site-theme dark-theme" : "site-theme"}>
      <Header dark={dark} setDark={setDark} />
      <main>
        <section className="inner-hero">
          <span className="eyebrow"><Icon size={15} /> {page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="inner-points">{page.points.map(point => <div key={point}><CircleCheck />{point}</div>)}</div>
        </section>

        {slug === "fitur" && (
          <section className="inner-content">
            <div className="feature-grid">{featureGroups.map(feature => { const FeatureIcon = feature.icon; return <article className="feature-card" id={feature.title.toLowerCase().replaceAll(" ", "-")} key={feature.title}><div className="feature-icon"><FeatureIcon /></div><h3>{feature.title}</h3><p>{feature.description}</p><div className="feature-tags">{feature.bullets.map(b => <span key={b}>{b}</span>)}</div><Link href="/register">Aktifkan fitur <ArrowRight /></Link></article>})}</div>
          </section>
        )}

        {slug === "harga" && (
          <section className="inner-content">
            <div className="billing-toggle"><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Bulanan</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Tahunan <span>Hemat 20%</span></button></div>
            <div className="pricing-grid full-pricing">{pricingPlans.map(plan => <article className={plan.popular ? "pricing-card popular" : "pricing-card"} key={plan.name}>{plan.popular && <span className="popular-label">PALING POPULER</span>}<h3>{plan.name}</h3><p>{plan.description}</p><div className="price">{plan.monthly === null ? <strong>Hubungi kami</strong> : plan.monthly === 0 ? <strong>Gratis</strong> : <><small>Rp</small><strong>{Math.round(plan.monthly * (annual ? .8 : 1)).toLocaleString("id-ID")}</strong><span>/bulan</span></>}</div><div className="customer-limit">{plan.customers}</div>{plan.features.map(f => <div className="plan-feature" key={f}><Check />{f}</div>)}<Link href={plan.monthly === null ? "/kontak" : "/register"} className={plan.popular ? "button primary" : "button secondary"}>Pilih {plan.name}</Link></article>)}</div>
            <div className="comparison-table-wrap"><table className="comparison-table"><thead><tr><th>Fitur</th><th>Starter</th><th>Growth</th><th>Professional</th><th>Business</th></tr></thead><tbody>{[["Billing otomatis","✓","✓","✓","✓"],["MikroTik","1 router","3 router","Multi-router","Multi-router"],["Payment gateway","−","✓","✓","✓"],["Teknisi & inventaris","−","✓","✓","✓"],["Multi-cabang","−","−","−","✓"],["API access","−","−","Terbatas","Penuh"]].map(row => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table></div>
          </section>
        )}

        {slug === "aplikasi" && (
          <section className="inner-content app-detail-grid">{[["Aplikasi Pelanggan", "Bayar tagihan, unduh invoice, laporkan gangguan, dan pantau tiket.", ["Tagihan real-time", "QRIS & VA", "Push notification"]], ["Aplikasi Teknisi", "Kelola tugas lapangan, navigasi, foto pekerjaan, dan permintaan barang.", ["SPK digital", "Update progres", "Inventaris lapangan"]], ["Aplikasi Pemilik", "Pantau pendapatan, pelanggan, jaringan, dan SLA dari mana saja.", ["Executive summary", "Alert operasional", "Multi-cabang"]]].map(app => <article className="app-detail-card" key={app[0] as string}><span><Smartphone /></span><h2>{app[0]}</h2><p>{app[1]}</p>{(app[2] as string[]).map(f => <div key={f}><Check />{f}</div>)}<button className="button secondary" onClick={() => window.alert("Aplikasi segera tersedia untuk diunduh.")}><Download /> Info Aplikasi</button></article>)}</section>
        )}

        {slug === "dokumentasi" && (
          <section className="inner-content docs-grid">{[["Panduan mulai cepat", "Siapkan akun, cabang, paket, dan pelanggan pertama dalam 30 menit.", PlayCircle], ["Integrasi MikroTik", "Konfigurasikan API, profil, kebijakan isolasi, dan monitoring router.", FileText], ["Referensi API", "Pelajari endpoint, autentikasi, webhook, dan contoh payload.", Code2], ["Migrasi data", "Impor pelanggan, paket, saldo, dan validasi hasil migrasi.", Download]].map(doc => { const DocIcon = doc[2]; return <Link href="/kontak" className="doc-card" key={doc[0] as string}><DocIcon /><div><h2>{doc[0] as string}</h2><p>{doc[1] as string}</p></div><ArrowRight /></Link>})}</section>
        )}

        {slug === "kontak" && (
          <section className="inner-content contact-grid">
            <div><span className="kicker">KONSULTASI PRODUK</span><h2>Ceritakan proses kerja ISP Anda</h2><p>Isi formulir berikut. Tim kami akan menghubungi Anda pada jam kerja untuk mendiskusikan kebutuhan, migrasi data, dan skenario onboarding.</p><div className="contact-details"><strong>Email</strong><span>halo@ijatbilling.id</span><strong>WhatsApp</strong><span>+62 811 9000 2026</span><strong>Jam layanan</strong><span>Senin–Jumat, 08.00–17.00 WIB</span></div></div>
            {sent ? <div className="success-panel"><CircleCheck /><h3>Pesan berhasil dikirim</h3><p>Terima kasih. Tim Ijatbilling akan menghubungi Anda melalui email atau WhatsApp.</p><button className="button secondary" onClick={() => setSent(false)}>Kirim pesan lain</button></div> : <form className="contact-form" onSubmit={submitContact}><label>Nama lengkap<input required placeholder="Nama Anda" /></label><label>Email bisnis<input type="email" required placeholder="nama@perusahaan.id" /></label><label>Nomor WhatsApp<input type="tel" required placeholder="08xxxxxxxxxx" pattern="[0-9+ ]{9,16}" /></label><label>Jumlah pelanggan<select required defaultValue=""><option value="" disabled>Pilih jumlah pelanggan</option><option>&lt; 200</option><option>200–500</option><option>501–1.500</option><option>&gt; 1.500</option></select></label><label className="full">Kebutuhan utama<textarea required placeholder="Ceritakan sistem dan kebutuhan Anda..." rows={5} /></label><button className="button primary full" type="submit"><Send /> Kirim Permintaan</button></form>}
          </section>
        )}

        {!['fitur','harga','aplikasi','dokumentasi','kontak'].includes(slug) && (
          <section className="inner-content generic-content"><div><h2>{slug === "status" ? "Pemantauan layanan" : "Operasional yang saling terhubung"}</h2><p>{slug === "status" ? "Terakhir diperbarui 16 Juli 2026, 16.30 WIB. Tidak ada gangguan yang sedang berlangsung." : "Ijatbilling dirancang agar informasi tidak berhenti di satu bagian. Pembayaran dapat memicu pembukaan layanan, tiket dapat terhubung ke teknisi dan inventaris, sementara laporan mengambil data dari sumber yang sama."}</p></div>{slug === "status" ? <div className="status-list">{["Dashboard web", "Billing engine", "MikroTik API", "Payment webhook", "Push notification"].map(x => <div key={x}><span>{x}</span><b><i /> Operasional</b></div>)}</div> : <div className="process-list">{["Data pelanggan terpusat", "Tindakan jaringan otomatis", "Pembayaran terverifikasi", "Audit log lengkap"].map((x,i) => <div key={x}><b>0{i+1}</b><span>{x}</span></div>)}</div>}</section>
        )}

        <section className="inner-content"><div className="content-callout"><div><h2>Siap melihat Ijatbilling bekerja?</h2><p>Gunakan data demo atau mulai uji coba gratis selama 14 hari.</p></div><div><Link href="/demo" className="button ghost-white">Buka Demo</Link> <Link href="/register" className="button white">Coba Gratis</Link></div></div></section>
      </main>
      <Footer />
    </div>
  );
}
