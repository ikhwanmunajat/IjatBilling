import {
  BadgeDollarSign,
  Boxes,
  Cable,
  ChartNoAxesCombined,
  CircleGauge,
  CreditCard,
  Headphones,
  Megaphone,
  Network,
  RadioTower,
  Router,
  Smartphone,
  TicketCheck,
  Users,
  Wrench,
} from "lucide-react";

export const navItems = [
  { label: "Solusi", href: "/solusi" },
  { label: "Fitur", href: "/fitur" },
  { label: "Harga", href: "/harga" },
  { label: "Aplikasi", href: "/aplikasi" },
  { label: "Dokumentasi", href: "/dokumentasi" },
  { label: "Tentang Kami", href: "/tentang" },
];

export const featureGroups = [
  {
    icon: BadgeDollarSign,
    title: "Billing Otomatis",
    description: "Tagihan, denda, diskon, invoice, dan rekonsiliasi berjalan otomatis setiap periode.",
    bullets: ["Tagihan bulanan", "Jatuh tempo fleksibel", "Invoice digital"],
  },
  {
    icon: Router,
    title: "Integrasi MikroTik",
    description: "Kelola PPPoE, hotspot, static IP, profil bandwidth, dan isolasi dari satu panel.",
    bullets: ["Isolir otomatis", "Sinkronisasi profil", "Monitoring router"],
  },
  {
    icon: RadioTower,
    title: "Integrasi GenieACS",
    description: "Pantau dan konfigurasikan ONT pelanggan dari jarak jauh melalui TR-069.",
    bullets: ["Status ONT", "Remote restart", "Konfigurasi perangkat"],
  },
  {
    icon: Users,
    title: "Manajemen Pelanggan",
    description: "Satukan profil, paket, lokasi, dokumen, dan seluruh riwayat pelanggan.",
    bullets: ["Database terpusat", "Riwayat pembayaran", "Dokumen pelanggan"],
  },
  {
    icon: CreditCard,
    title: "Payment Gateway",
    description: "Terima pembayaran 24 jam melalui QRIS, virtual account, dan e-wallet.",
    bullets: ["Verifikasi real-time", "Webhook transaksi", "Multi-channel"],
  },
  {
    icon: ChartNoAxesCombined,
    title: "Keuangan",
    description: "Lihat arus kas, piutang, komisi agen, dan laba rugi sederhana secara real-time.",
    bullets: ["Pemasukan & pengeluaran", "Laporan loket", "Piutang"],
  },
  {
    icon: TicketCheck,
    title: "Tiket Gangguan",
    description: "Atur prioritas, SLA, penugasan, dokumentasi, dan riwayat penanganan.",
    bullets: ["SLA terukur", "Penugasan teknisi", "Foto pekerjaan"],
  },
  {
    icon: Wrench,
    title: "Manajemen Teknisi",
    description: "Jadwalkan pekerjaan dan pantau progres tim lapangan dari awal hingga selesai.",
    bullets: ["SPK digital", "Lokasi teknisi", "Penilaian kinerja"],
  },
  {
    icon: Boxes,
    title: "Inventaris",
    description: "Kontrol stok perangkat, distribusi barang, dan penggunaan material di lapangan.",
    bullets: ["Stok minimum", "Barang masuk-keluar", "Distribusi teknisi"],
  },
  {
    icon: Network,
    title: "Infrastruktur",
    description: "Petakan POP, ODC, ODP, router, jalur distribusi, dan kapasitas port.",
    bullets: ["Peta perangkat", "Kapasitas port", "Jalur distribusi"],
  },
  {
    icon: Megaphone,
    title: "Broadcast Informasi",
    description: "Kirim informasi tersegmentasi lewat push notification, email, dan aplikasi.",
    bullets: ["Segmentasi pelanggan", "Jadwal kirim", "Riwayat notifikasi"],
  },
  {
    icon: CircleGauge,
    title: "Laporan Terpadu",
    description: "Analisis pelanggan, tagihan, pembayaran, tunggakan, dan keuangan dengan cepat.",
    bullets: ["PDF, Excel, CSV", "Filter lengkap", "Ringkasan otomatis"],
  },
];

export const pricingPlans = [
  { name: "Trial", customers: "50 pelanggan", monthly: 0, description: "Eksplorasi fitur inti selama 14 hari.", features: ["Semua fitur dasar", "1 router", "Dukungan onboarding"] },
  { name: "Starter", customers: "200 pelanggan", monthly: 199000, description: "Untuk RT/RW Net yang mulai berkembang.", features: ["Billing otomatis", "Integrasi MikroTik", "1 loket"] },
  { name: "Growth", customers: "500 pelanggan", monthly: 449000, description: "Operasional tim yang makin kompleks.", features: ["Payment gateway", "Tiket & teknisi", "GenieACS"] },
  { name: "Professional", customers: "1.500 pelanggan", monthly: 899000, description: "Kontrol menyeluruh untuk ISP profesional.", popular: true, features: ["Multi-router & loket", "Laporan lengkap", "Aplikasi mobile"] },
  { name: "Business", customers: "5.000 pelanggan", monthly: 1799000, description: "Skala multi-cabang dengan kontrol akses.", features: ["Multi-cabang", "Role management", "API access"] },
  { name: "Enterprise", customers: "Tanpa batas", monthly: null, description: "Solusi khusus untuk kebutuhan berskala besar.", features: ["Dedicated server", "White label", "Account manager"] },
];

export const dashboardNav = [
  { label: "Ringkasan", href: "/dashboard", icon: CircleGauge },
  { label: "MikroTik", href: "/dashboard/mikrotik", icon: Router },
  { label: "Pelanggan", href: "/dashboard/pelanggan", icon: Users },
  { label: "Paket Internet", href: "/dashboard/paket", icon: Cable },
  { label: "Tagihan", href: "/dashboard/tagihan", icon: BadgeDollarSign },
  { label: "Pembayaran", href: "/dashboard/pembayaran", icon: CreditCard },
  { label: "Keuangan", href: "/dashboard/keuangan", icon: ChartNoAxesCombined },
  { label: "Tiket Gangguan", href: "/dashboard/tiket", icon: TicketCheck },
  { label: "Teknisi", href: "/dashboard/teknisi", icon: Wrench },
  { label: "Inventaris", href: "/dashboard/inventaris", icon: Boxes },
  { label: "Infrastruktur", href: "/dashboard/infrastruktur", icon: Network },
  { label: "Peta Jaringan", href: "/dashboard/peta", icon: RadioTower },
  { label: "Laporan", href: "/dashboard/laporan", icon: ChartNoAxesCombined },
  { label: "Integrasi", href: "/dashboard/integrasi", icon: Smartphone },
  { label: "Pengaturan", href: "/dashboard/pengaturan", icon: Headphones },
];

export const demoUsers = [
  { role: "Owner ISP", email: "owner@demo.ijatbilling.id", access: "Akses penuh" },
  { role: "Admin", email: "admin@demo.ijatbilling.id", access: "Pelanggan & tagihan" },
  { role: "Finance", email: "finance@demo.ijatbilling.id", access: "Keuangan & laporan" },
  { role: "NOC", email: "noc@demo.ijatbilling.id", access: "Jaringan & MikroTik" },
  { role: "Teknisi", email: "teknisi@demo.ijatbilling.id", access: "Tiket & inventaris" },
  { role: "Loket", email: "loket@demo.ijatbilling.id", access: "Pembayaran pelanggan" },
];

export const marketingPages: Record<string, { eyebrow: string; title: string; description: string; icon: typeof Router; points: string[] }> = {
  solusi: { eyebrow: "Solusi sesuai skala bisnis", title: "Satu sistem untuk seluruh tim operasional ISP", description: "Ijatbilling menghubungkan pekerjaan owner, admin, NOC, finance, teknisi, loket, dan pelanggan dalam alur yang terukur.", icon: Network, points: ["Otomasi penagihan dan jaringan", "Kontrol operasional lintas cabang", "Layanan pelanggan lebih responsif"] },
  fitur: { eyebrow: "Kapabilitas lengkap", title: "Fitur yang mengikuti alur kerja ISP sehari-hari", description: "Mulai dari aktivasi pelanggan sampai laporan keuangan, semua data terhubung dan mudah ditelusuri.", icon: CircleGauge, points: ["12 modul operasional", "Integrasi perangkat dan pembayaran", "Hak akses berbasis peran"] },
  aplikasi: { eyebrow: "Mobile first", title: "Tiga aplikasi, satu sumber data", description: "Pelanggan, teknisi, dan pemilik ISP mendapatkan informasi yang tepat sesuai kebutuhannya.", icon: Smartphone, points: ["Aplikasi pelanggan", "Aplikasi teknisi", "Executive mobile dashboard"] },
  dokumentasi: { eyebrow: "Pusat bantuan", title: "Mulai cepat, integrasikan dengan percaya diri", description: "Panduan langkah demi langkah untuk setup awal, MikroTik, payment gateway, migrasi data, dan API.", icon: Headphones, points: ["Quick start", "Referensi API", "Panduan troubleshooting"] },
  tentang: { eyebrow: "Tentang Ijatbilling", title: "Dibangun untuk membuat operasional ISP lebih tertib", description: "Kami berfokus pada perangkat lunak yang praktis, transparan, dan relevan dengan kebutuhan operator internet di Indonesia.", icon: RadioTower, points: ["Produk lokal", "Keamanan sejak awal", "Pengembangan berbasis kebutuhan pengguna"] },
  kontak: { eyebrow: "Hubungi tim kami", title: "Diskusikan kebutuhan operasional ISP Anda", description: "Ceritakan jumlah pelanggan, jaringan, dan proses kerja Anda. Tim kami akan membantu menyusun skenario implementasi.", icon: Headphones, points: ["Konsultasi produk", "Bantuan migrasi", "Onboarding administrator"] },
  status: { eyebrow: "Status layanan", title: "Seluruh sistem beroperasi normal", description: "Status operasional Ijatbilling dipantau secara berkala. Pembaruan insiden akan ditampilkan di halaman ini.", icon: CircleGauge, points: ["API: Operasional", "Dashboard: Operasional", "Payment webhook: Operasional"] },
};
