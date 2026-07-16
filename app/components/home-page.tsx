"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  CircleCheck,
  Download,
  Gauge,
  Headphones,
  Menu as MenuIcon,
  Play,
  Router,
  ShieldCheck,
  Sparkles,
  TicketCheck,
  Users,
  WalletCards,
  Wifi,
  Zap,
} from "lucide-react";
import { Footer, Header } from "./marketing-shell";
import { featureGroups, pricingPlans } from "../site-data";

const chartPoints = [42, 54, 49, 68, 62, 77, 73, 91, 84, 106, 98, 121];

function MiniChart() {
  const path = useMemo(() => chartPoints.map((point, index) => `${index === 0 ? "M" : "L"}${index * 31},${150 - point}`).join(" "), []);
  return (
    <svg className="mini-chart" viewBox="0 0 350 150" role="img" aria-label="Grafik pendapatan meningkat">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#176BFF" stopOpacity=".3" /><stop offset="1" stopColor="#176BFF" stopOpacity="0" /></linearGradient>
      </defs>
      <path d={`${path} L341,150 L0,150 Z`} fill="url(#chartFill)" />
      <path d={path} fill="none" stroke="#176BFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="341" cy="29" r="5" fill="#16C7E8" stroke="white" strokeWidth="3" />
    </svg>
  );
}

function DashboardMockup() {
  return (
    <motion.div className="dashboard-mockup" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .15 }}>
      <div className="mock-sidebar">
        <div className="mock-logo"><Wifi size={17} /></div>
        {[Gauge, Users, WalletCards, Router, TicketCheck, BarChart3].map((Icon, i) => <span className={i === 0 ? "active" : ""} key={i}><Icon size={16} /></span>)}
      </div>
      <div className="mock-content">
        <div className="mock-top"><div><strong>Ringkasan bisnis</strong><small>Data diperbarui real-time</small></div><span className="online"><i /> 8 router online</span></div>
        <div className="mock-stats">
          <div><small>Pendapatan bulan ini</small><strong>Rp146,8 jt</strong><em>+12,6%</em></div>
          <div><small>Pelanggan aktif</small><strong>1.284</strong><em>+28 baru</em></div>
          <div><small>Tagihan tertunda</small><strong>86</strong><em className="warn">Rp9,4 jt</em></div>
        </div>
        <div className="mock-grid">
          <div className="mock-chart-card"><div className="card-heading"><span><strong>Arus pendapatan</strong><small>12 bulan terakhir</small></span><span className="chip">Bulanan</span></div><MiniChart /><div className="chart-legend"><span><i className="blue" />Pemasukan Rp146,8 jt</span><span><i className="cyan" />Pengeluaran Rp38,2 jt</span></div></div>
          <div className="mock-activity"><div className="card-heading"><span><strong>Pembayaran terbaru</strong><small>Hari ini</small></span></div>{[["RP", "Rudi Purnama", "Rp325.000"], ["NA", "Nadia Aulia", "Rp275.000"], ["BH", "Bima Haryanto", "Rp450.000"]].map((item) => <div className="activity-row" key={item[1]}><b>{item[0]}</b><span><strong>{item[1]}</strong><small>QRIS · berhasil</small></span><em>{item[2]}</em></div>)}</div>
        </div>
      </div>
      <motion.div className="floating-card router-card" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }}><span><Router size={18} /></span><div><small>Router Utama</small><strong>Online · 14 ms</strong></div></motion.div>
      <motion.div className="floating-card payment-card" animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 4.5 }}><CircleCheck size={22} /><div><strong>Pembayaran berhasil</strong><small>Layanan dibuka otomatis</small></div></motion.div>
    </motion.div>
  );
}

const faqs = [
  ["Apakah sistem kompatibel dengan semua versi MikroTik?", "Ijatbilling menggunakan RouterOS API yang tersedia pada versi MikroTik modern. Tim onboarding akan memeriksa versi dan konfigurasi router Anda."],
  ["Apakah saya memerlukan server sendiri?", "Tidak. Paket cloud kami sudah mencakup infrastruktur. Opsi dedicated server tersedia untuk kebutuhan Enterprise."],
  ["Bagaimana proses isolir otomatis bekerja?", "Saat tagihan melewati jatuh tempo, sistem menjalankan kebijakan isolasi yang Anda tetapkan. Layanan dapat dibuka otomatis setelah pembayaran terverifikasi."],
  ["Apakah pelanggan dapat membayar selama 24 jam?", "Ya. Pembayaran QRIS, virtual account, dan e-wallet dapat diproses otomatis selama 24 jam."],
  ["Apakah tersedia aplikasi pelanggan?", "Tersedia aplikasi pelanggan untuk melihat tagihan, membayar, mengunduh invoice, dan melaporkan gangguan."],
  ["Bisakah data dari sistem lama dipindahkan?", "Bisa. Tim kami menyediakan template migrasi dan bantuan validasi untuk data pelanggan, paket, dan saldo awal."],
  ["Apakah sistem mendukung multi-router?", "Ya. Paket Professional ke atas mendukung multi-router dengan monitoring dan sinkronisasi terpusat."],
  ["Bagaimana keamanan data pelanggan?", "Kami menerapkan enkripsi saat transit, kontrol akses berbasis peran, log aktivitas, serta praktik backup berkala."],
];

export default function HomePage() {
  const [dark, setDark] = useState(false);
  const [annual, setAnnual] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [toast, setToast] = useState("");

  const handleConsult = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToast("Permintaan konsultasi berhasil dikirim. Tim kami akan menghubungi Anda.");
    window.setTimeout(() => setToast(""), 4200);
  };

  return (
    <div className={dark ? "site-theme dark-theme" : "site-theme"}>
      <Header dark={dark} setDark={setDark} />
      <main>
        <section className="hero-section">
          <div className="hero-grid-pattern" />
          <div className="hero-inner">
            <motion.div className="hero-copy" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .55 }}>
              <span className="eyebrow"><Sparkles size={15} /> Platform Operasional ISP Terintegrasi</span>
              <h1>Billing, jaringan, dan operasional ISP dalam <span>satu platform.</span></h1>
              <p>Kelola pelanggan, tagihan, MikroTik, teknisi, inventaris, dan laporan keuangan melalui dashboard terpusat yang bekerja otomatis dan real-time.</p>
              <div className="hero-actions">
                <Link href="/register" className="button primary large">Mulai Uji Coba Gratis <ArrowRight size={18} /></Link>
                <Link href="/fitur" className="button secondary large"><Play size={17} /> Lihat Semua Fitur</Link>
              </div>
              <div className="hero-note"><Check size={16} /> Gratis 14 hari <span>•</span> Tanpa kartu kredit <span>•</span> Dukungan onboarding</div>
              <div className="trust-row"><div className="avatar-stack"><b>AR</b><b>DS</b><b>MF</b><b>+</b></div><div><strong>4,9/5</strong><span>Dipercaya operator di Indonesia</span></div></div>
            </motion.div>
            <DashboardMockup />
          </div>
        </section>

        <section className="proof-section">
          <p>Dipercaya oleh Operator ISP dan RT/RW Net di Seluruh Indonesia</p>
          <div className="logo-marquee">{["NusaLink", "SinyalNet", "RuangFiber", "ArunaISP", "KoneksiKita"].map((name, i) => <span key={name}><i className={`logo-shape s${i}`} />{name}</span>)}</div>
          <div className="stat-strip">
            <div><strong>500<span>+</span></strong><small>Operator ISP</small></div>
            <div><strong>100.000<span>+</span></strong><small>Pelanggan dikelola</small></div>
            <div><strong>99,9<span>%</span></strong><small>Uptime sistem</small></div>
            <div><strong>1 juta<span>+</span></strong><small>Tagihan diproses</small></div>
          </div>
        </section>

        <section className="section light-section" id="solusi">
          <div className="section-heading"><span className="kicker">OPERASIONAL TANPA RIBET</span><h2>Otomatiskan operasional ISP Anda</h2><p>Kurangi pekerjaan manual, cegah kesalahan penagihan, dan tingkatkan kualitas layanan melalui otomasi yang terhubung langsung dengan jaringan.</p></div>
          <div className="comparison-grid">
            <article className="comparison-card featured"><div className="comparison-icon"><Zap /></div><span className="recommended">DIREKOMENDASIKAN</span><h3>Sistem Ijatbilling</h3><p>Semua proses terhubung dalam satu alur.</p>{["Isolir dan buka layanan otomatis", "Pembayaran terverifikasi real-time", "Notifikasi aplikasi", "Data pelanggan terpusat"].map(x => <div className="comparison-point good" key={x}><Check />{x}</div>)}</article>
            <article className="comparison-card"><div className="comparison-icon muted"><WalletCards /></div><h3>Penagihan manual</h3><p>Banyak pemeriksaan dan risiko pencatatan.</p>{["Pemeriksaan mutasi satu per satu", "Risiko salah pencatatan", "Proses lebih lambat", "Tunggakan sulit dipantau"].map(x => <div className="comparison-point" key={x}><span>−</span>{x}</div>)}</article>
            <article className="comparison-card"><div className="comparison-icon muted"><Router /></div><h3>Pengelolaan via Winbox</h3><p>Eksekusi teknis tanpa konteks bisnis.</p>{["Risiko salah memilih pengguna", "Eksekusi satu per satu", "Tanpa laporan terintegrasi", "Menyita waktu admin"].map(x => <div className="comparison-point" key={x}><span>−</span>{x}</div>)}</article>
          </div>
        </section>

        <section className="section" id="fitur">
          <div className="section-heading split-heading"><div><span className="kicker">MODUL TERINTEGRASI</span><h2>Semua yang dibutuhkan ISP untuk tumbuh</h2></div><p>Satu sumber data untuk tim admin, NOC, keuangan, teknisi, dan manajemen. Setiap modul bekerja bersama tanpa input berulang.</p></div>
          <div className="feature-grid">{featureGroups.map((feature, index) => { const Icon = feature.icon; return <motion.article className="feature-card" key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * .04 }}><div className="feature-icon"><Icon /></div><h3>{feature.title}</h3><p>{feature.description}</p><div className="feature-tags">{feature.bullets.map(b => <span key={b}>{b}</span>)}</div><Link href={`/fitur#${feature.title.toLowerCase().replaceAll(" ", "-")}`}>Pelajari fitur <ArrowRight /></Link></motion.article>})}</div>
        </section>

        <section className="network-section" id="integrasi">
          <div className="network-inner">
            <div className="network-copy"><span className="eyebrow dark"><Router size={15} /> Network automation</span><h2>Terhubung langsung dengan MikroTik</h2><p>Jalankan perubahan jaringan dari data bisnis yang terverifikasi. Setiap tindakan tercatat, aman, dan mudah diaudit.</p><div className="network-list">{["Tambah pelanggan PPPoE", "Ubah profil bandwidth", "Isolir pelanggan menunggak", "Buka layanan setelah pembayaran", "Batch processing", "Monitoring router online/offline"].map(item => <span key={item}><CircleCheck />{item}</span>)}</div><div className="badge-row"><span><ShieldCheck /> Secure API</span><span><Activity /> Real-time sync</span><span><Zap /> Automated action</span></div></div>
            <div className="network-visual"><div className="network-ring r1" /><div className="network-ring r2" /><div className="router-device"><div className="router-top"><Router /><strong>Core Router</strong><span>ONLINE</span></div><div className="router-screen"><small>CPU Load</small><strong>18%</strong><i style={{ width: "18%" }} /><small>Active sessions</small><strong>1.284</strong><i style={{ width: "72%" }} /></div><div className="router-ports">{Array.from({ length: 8 }).map((_, i) => <span key={i} className={i < 6 ? "on" : ""} />)}</div></div><div className="connection-node n1"><Users /> Pelanggan</div><div className="connection-node n2"><CreditCard /> Billing API</div><div className="connection-node n3"><Activity /> Audit log</div></div>
          </div>
        </section>

        <section className="section mobile-section" id="aplikasi">
          <div className="mobile-copy"><span className="kicker">AKSES DI MANA SAJA</span><h2>Satu ekosistem, tiga aplikasi</h2><p>Berikan pengalaman yang tepat untuk pelanggan, teknisi, dan pemilik ISP melalui aplikasi yang terhubung dengan data yang sama.</p><div className="app-tabs"><button className="active">Pelanggan</button><button>Teknisi</button><button>Pemilik</button></div><div className="app-features">{["Lihat dan bayar tagihan", "Unduh invoice digital", "Laporkan gangguan", "Pantau status tiket"].map(x => <span key={x}><Check />{x}</span>)}</div><div className="store-buttons"><button onClick={() => setToast("Aplikasi Android segera tersedia.")}><Download /><span><small>Unduh di</small>Google Play</span></button><button onClick={() => setToast("Aplikasi iOS segera tersedia.")}><Download /><span><small>Unduh di</small>App Store</span></button><Link href="/login"><MenuIcon /><span><small>Buka</small>Web App</span></Link></div></div>
          <div className="phone-stage"><div className="phone back-phone"><div className="phone-screen technician"><span className="phone-pill" /><small>TUGAS HARI INI</small><h4>Halo, Arya</h4><div className="task-card"><TicketCheck /><span><strong>Instalasi baru</strong><small>08.30 · Kemang</small></span></div><div className="task-card"><WrenchIcon /><span><strong>Gangguan koneksi</strong><small>10.15 · Tebet</small></span></div></div></div><div className="phone front-phone"><div className="phone-screen customer"><span className="phone-pill" /><div className="phone-brand"><Wifi /> Ijatbilling</div><p>Tagihan bulan Juli</p><h4>Rp325.000</h4><span className="due">Jatuh tempo 20 Juli 2026</span><button>Bayar Sekarang</button><div className="phone-menu"><span><WalletCards />Tagihan</span><span><TicketCheck />Gangguan</span><span><Headphones />Bantuan</span></div><div className="wifi-card"><Wifi /><span><strong>Layanan aktif</strong><small>50 Mbps · Stabil</small></span></div></div></div></div>
        </section>

        <section className="section pricing-section" id="harga">
          <div className="section-heading"><span className="kicker">HARGA TRANSPARAN</span><h2>Pilih kapasitas yang sesuai pertumbuhan Anda</h2><p>Mulai kecil dan tingkatkan paket kapan saja. Tidak ada biaya tersembunyi.</p><div className="billing-toggle"><button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>Bulanan</button><button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>Tahunan <span>Hemat 20%</span></button></div></div>
          <div className="pricing-grid">{pricingPlans.slice(0, 4).map(plan => <article className={plan.popular ? "pricing-card popular" : "pricing-card"} key={plan.name}>{plan.popular && <span className="popular-label">PALING POPULER</span>}<h3>{plan.name}</h3><p>{plan.description}</p><div className="price">{plan.monthly === null ? <strong>Hubungi kami</strong> : plan.monthly === 0 ? <strong>Gratis</strong> : <><small>Rp</small><strong>{Math.round(plan.monthly * (annual ? .8 : 1)).toLocaleString("id-ID")}</strong><span>/bulan</span></>}</div><div className="customer-limit"><Users /> {plan.customers}</div>{plan.features.map(f => <div className="plan-feature" key={f}><Check />{f}</div>)}<Link href={plan.monthly === null ? "/kontak" : "/register"} className={plan.popular ? "button primary" : "button secondary"}>{plan.monthly === 0 ? "Mulai Gratis" : plan.monthly === null ? "Konsultasi" : "Pilih Paket"}</Link></article>)}</div>
          <div className="pricing-more"><Link href="/harga">Bandingkan seluruh paket dan fitur <ArrowRight /></Link></div>
        </section>

        <section className="section testimonial-section">
          <div className="section-heading"><span className="kicker">CERITA PENGGUNA</span><h2>Operasional lebih rapi, tim lebih fokus</h2></div>
          <div className="testimonial-grid">{[["AP", "Andika Pratama", "Owner, Nusa Koneksi", "1.200 pelanggan", "Penagihan yang sebelumnya memakan dua hari kini berjalan otomatis. Tim kami bisa fokus meningkatkan kualitas jaringan."], ["SR", "Sinta Rahma", "Finance Lead, Arunika Net", "680 pelanggan", "Rekonsiliasi pembayaran jauh lebih cepat. Status tagihan dan arus kas bisa kami pantau dalam satu layar."], ["DF", "Dimas Firmansyah", "NOC Manager, Ruang Fiber", "2.400 pelanggan", "Integrasi MikroTik membantu kami mengurangi pekerjaan berulang dan setiap tindakan jaringan tercatat jelas."]].map(t => <article className="testimonial-card" key={t[1]}><div className="stars">★★★★★</div><blockquote>“{t[4]}”</blockquote><div className="testimonial-author"><b>{t[0]}</b><span><strong>{t[1]}</strong><small>{t[2]} · {t[3]}</small></span></div></article>)}</div>
        </section>

        <section className="section faq-section">
          <div className="faq-intro"><span className="kicker">PERTANYAAN UMUM</span><h2>Jawaban cepat sebelum Anda mulai</h2><p>Belum menemukan jawaban? Tim kami siap membantu Anda memilih konfigurasi yang tepat.</p><Link href="/kontak" className="button secondary">Hubungi Tim Kami</Link></div>
          <div className="faq-list">{faqs.map((faq, i) => <div className={faqOpen === i ? "faq-item open" : "faq-item"} key={faq[0]}><button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}><span>{faq[0]}</span><ChevronDown /></button><AnimatePresence>{faqOpen === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{faq[1]}</p></motion.div>}</AnimatePresence></div>)}</div>
        </section>

        <section className="cta-section">
          <div className="cta-copy"><span className="eyebrow dark"><Sparkles size={15} /> Mulai transformasi operasional</span><h2>Siap mengelola ISP dengan lebih efisien?</h2><p>Mulai otomatisasi tagihan, jaringan, pembayaran, dan operasional teknisi melalui satu dashboard.</p><div className="hero-actions"><Link className="button white large" href="/register">Coba Gratis 14 Hari <ArrowRight /></Link><Link className="button ghost-white large" href="/kontak">Konsultasi dengan Tim Kami</Link></div><small>Tidak memerlukan kartu kredit. Tim kami siap membantu migrasi dan onboarding.</small></div>
          <form className="consult-card" onSubmit={handleConsult}><h3>Jadwalkan konsultasi</h3><p>Dapatkan rekomendasi konfigurasi sesuai skala ISP Anda.</p><label>Nama lengkap<input required name="name" placeholder="Nama Anda" /></label><label>Email bisnis<input required type="email" name="email" placeholder="nama@perusahaan.id" /></label><label>Jumlah pelanggan<select name="customers" defaultValue=""><option value="" disabled>Pilih jumlah pelanggan</option><option>&lt; 200</option><option>200 - 500</option><option>501 - 1.500</option><option>&gt; 1.500</option></select></label><button className="button primary" type="submit">Minta Jadwal <ArrowRight /></button></form>
        </section>
      </main>
      <Footer />
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}><CircleCheck />{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}

function CreditCard(props: { size?: number }) { return <WalletCards {...props} />; }
function WrenchIcon(props: { size?: number }) { return <TicketCheck {...props} />; }
