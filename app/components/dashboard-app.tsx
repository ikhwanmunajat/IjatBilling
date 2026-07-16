"use client";

import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Command,
  Download,
  Ellipsis,
  Filter,
  Menu,
  Moon,
  MoreHorizontal,
  Plus,
  Router,
  Search,
  ShieldCheck,
  Sun,
  TicketCheck,
  TrendingUp,
  Users,
  WalletCards,
  Wifi,
  Wrench,
  X,
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Brand } from "./brand";
import { dashboardNav, demoUsers } from "../site-data";

const revenueData = [
  { month: "Feb", income: 92, expense: 28 }, { month: "Mar", income: 108, expense: 31 },
  { month: "Apr", income: 104, expense: 35 }, { month: "Mei", income: 121, expense: 34 },
  { month: "Jun", income: 132, expense: 39 }, { month: "Jul", income: 147, expense: 38 },
];
const invoiceData = [{ name: "Lunas", value: 78, color: "#22c55e" }, { name: "Tertunda", value: 15, color: "#f59e0b" }, { name: "Terlambat", value: 7, color: "#ef4444" }];
const customers = [
  { id: "IJ-001284", name: "Rudi Purnama", service: "PPP-1284", plan: "Home 50", area: "Kemang", due: "20 Jul", bill: "Lunas", network: "Aktif" },
  { id: "IJ-001283", name: "Nadia Aulia", service: "PPP-1283", plan: "Home 30", area: "Tebet", due: "20 Jul", bill: "Tertunda", network: "Aktif" },
  { id: "IJ-001282", name: "Bima Haryanto", service: "PPP-1282", plan: "Bisnis 100", area: "Pancoran", due: "15 Jul", bill: "Terlambat", network: "Terisolir" },
  { id: "IJ-001281", name: "Sari Maharani", service: "PPP-1281", plan: "Home 50", area: "Kemang", due: "20 Jul", bill: "Lunas", network: "Aktif" },
  { id: "IJ-001280", name: "Dedi Kurniawan", service: "PPP-1280", plan: "Home 20", area: "Mampang", due: "25 Jul", bill: "Tertunda", network: "Aktif" },
  { id: "IJ-001279", name: "Ayu Permatasari", service: "PPP-1279", plan: "Home 30", area: "Tebet", due: "20 Jul", bill: "Lunas", network: "Aktif" },
  { id: "IJ-001278", name: "Fajar Nugraha", service: "PPP-1278", plan: "Bisnis 50", area: "Pasar Minggu", due: "15 Jul", bill: "Terlambat", network: "Terisolir" },
];

type Customer = (typeof customers)[number];

type CustomerViewProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  customers: Customer[];
  selected: string[];
  setSelected: Dispatch<SetStateAction<string[]>>;
  toggleAll: () => void;
  setModal: Dispatch<SetStateAction<string | null>>;
  notify: (message: string) => void;
};

const roleMenus: Record<string, string[]> = {
  "Owner ISP": dashboardNav.map(x => x.label),
  Admin: ["Ringkasan", "Pelanggan", "Paket Internet", "Tagihan", "Pembayaran", "Tiket Gangguan", "Laporan", "Pengaturan"],
  Finance: ["Ringkasan", "Tagihan", "Pembayaran", "Keuangan", "Laporan"],
  NOC: ["Ringkasan", "MikroTik", "Pelanggan", "Infrastruktur", "Peta Jaringan", "Integrasi"],
  Teknisi: ["Ringkasan", "Tiket Gangguan", "Teknisi", "Inventaris", "Peta Jaringan"],
  Loket: ["Ringkasan", "Pelanggan", "Tagihan", "Pembayaran"],
};

const modules: Record<string, { title: string; description: string; stats: string[][]; items: string[][] }> = {
  mikrotik: { title: "MikroTik", description: "Pantau router, session, profil bandwidth, dan tindakan otomatis.", stats: [["Router online","8 / 9"],["Active PPPoE","1.284"],["Latency rata-rata","18 ms"],["Action hari ini","146"]], items: [["Core-JKT-01","Online · 12 ms","1.024 session"],["POP-Kemang","Online · 18 ms","168 session"],["POP-Tebet","Online · 21 ms","92 session"],["Backup-DC","Offline · 32 menit","0 session"]] },
  tagihan: { title: "Tagihan", description: "Kelola siklus tagihan, jatuh tempo, diskon, dan denda pelanggan.", stats: [["Total Juli","Rp156,2 jt"],["Sudah dibayar","Rp146,8 jt"],["Belum lunas","Rp9,4 jt"],["Collection rate","94,0%"]], items: [["INV-0726-1284","Rudi Purnama","Lunas · Rp325.000"],["INV-0726-1283","Nadia Aulia","Tertunda · Rp275.000"],["INV-0726-1282","Bima Haryanto","Terlambat · Rp450.000"]] },
  pembayaran: { title: "Pembayaran", description: "Rekonsiliasi otomatis transaksi QRIS, virtual account, e-wallet, dan loket.", stats: [["Hari ini","Rp12,4 jt"],["Transaksi","43"],["Berhasil","98,6%"],["Menunggu","2"]], items: [["TRX-88291","QRIS · Rudi Purnama","Rp325.000"],["TRX-88290","BCA VA · Sari Maharani","Rp325.000"],["TRX-88289","Loket · Ayu Permatasari","Rp275.000"]] },
  keuangan: { title: "Keuangan", description: "Kontrol arus kas, biaya, piutang, komisi, dan laba rugi sederhana.", stats: [["Pemasukan","Rp146,8 jt"],["Pengeluaran","Rp38,2 jt"],["Arus kas bersih","Rp108,6 jt"],["Piutang","Rp9,4 jt"]], items: [["Pendapatan langganan","16 Jul 2026","+Rp12.400.000"],["Pembelian 20 ONT","15 Jul 2026","−Rp7.800.000"],["Biaya backbone","12 Jul 2026","−Rp4.500.000"]] },
  tiket: { title: "Tiket Gangguan", description: "Prioritaskan insiden, atur SLA, dan pantau progres teknisi.", stats: [["Tiket aktif","18"],["Prioritas tinggi","3"],["SLA tercapai","96,4%"],["Rata-rata selesai","2j 14m"]], items: [["TKT-1082","LOS · Kemang","Prioritas tinggi"],["TKT-1081","Lambat · Tebet","Dalam proses"],["TKT-1080","Router restart · Mampang","Dijadwalkan"]] },
  teknisi: { title: "Teknisi", description: "Jadwalkan tugas, pantau lokasi, dan nilai penyelesaian pekerjaan.", stats: [["Teknisi aktif","12"],["Bertugas","8"],["Tugas hari ini","26"],["Selesai","18"]], items: [["Arya Pratama","Area Kemang","3 tugas aktif"],["Doni Saputra","Area Tebet","2 tugas aktif"],["Rizky Maulana","Area Mampang","3 tugas aktif"]] },
  inventaris: { title: "Inventaris", description: "Pantau stok perangkat dan material dari gudang hingga teknisi.", stats: [["Total item","2.846"],["Nilai stok","Rp184,6 jt"],["Stok menipis","7 item"],["Dipinjam teknisi","46"]], items: [["ONT HG6145F","Gudang pusat","42 unit"],["Kabel dropcore","Gudang pusat","2.140 meter"],["Fast connector","Gudang cabang","18 unit · menipis"]] },
  laporan: { title: "Laporan", description: "Bangun laporan operasional dan keuangan sesuai periode serta cabang.", stats: [["Laporan tersimpan","24"],["Dibuat bulan ini","8"],["Terjadwal","5"],["Ekspor terbaru","Hari ini"]], items: [["Laporan pendapatan Juli","PDF · XLSX","Diperbarui 5 menit lalu"],["Tunggakan per area","XLSX","Diperbarui 1 jam lalu"],["Kinerja teknisi","PDF","Diperbarui kemarin"]] },
};

function StatCard({ icon: Icon, label, value, trend, tone = "blue" }: { icon: typeof Users; label: string; value: string; trend: string; tone?: string }) {
  return <article className="dash-stat"><span className={`dash-stat-icon ${tone}`}><Icon /></span><div><small>{label}</small><strong>{value}</strong><em className={trend.startsWith("−") ? "down" : ""}>{trend.startsWith("−") ? <ArrowDownRight /> : <ArrowUpRight />}{trend}</em></div></article>;
}

export default function DashboardApp({ section: sectionProp, displayName = "Andika Pratama", demo = false }: { section?: string; displayName?: string; demo?: boolean }) {
  const searchParams = useSearchParams();
  const section = sectionProp || searchParams.get("section") || "ringkasan";
  const [role, setRole] = useState(searchParams.get("role") || "Owner ISP");
  const [dark, setDark] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua status");
  const [selected, setSelected] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<string | null>(null);
  const [period, setPeriod] = useState("Bulan ini");
  const allowedMenu = roleMenus[role] || roleMenus["Owner ISP"];

  const filteredCustomers = customers.filter(customer => {
    const matches = `${customer.name} ${customer.id} ${customer.area} ${customer.plan}`.toLowerCase().includes(search.toLowerCase());
    const statusMatches = statusFilter === "Semua status" || customer.network === statusFilter || customer.bill === statusFilter;
    return matches && statusMatches;
  });
  const currentLabel = section === "ringkasan" ? "Ringkasan" : dashboardNav.find(x => x.href.endsWith(`/${section}`))?.label || section.charAt(0).toUpperCase() + section.slice(1);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 3500); };
  const toggleAll = () => setSelected(selected.length === filteredCustomers.length ? [] : filteredCustomers.map(x => x.id));
  const linkFor = (href: string) => demo ? (href === "/dashboard" ? `/demo?role=${encodeURIComponent(role)}` : `/demo?section=${href.split("/").pop()}&role=${encodeURIComponent(role)}`) : href;

  return (
    <div className={dark ? "dashboard-theme dash-dark" : "dashboard-theme"}>
      <aside className={sidebar ? "dashboard-sidebar open" : "dashboard-sidebar"}>
        <div className="dash-brand"><Brand /><button onClick={() => setSidebar(false)} aria-label="Tutup menu"><X /></button></div>
        <div className="workspace-switch"><span>NK</span><div><strong>Nusa Koneksi</strong><small>Cabang Jakarta</small></div><ChevronDown /></div>
        <nav className="dash-nav" aria-label="Menu dashboard">
          <small>MENU UTAMA</small>
          {dashboardNav.filter(item => allowedMenu.includes(item.label)).map(item => { const Icon = item.icon; const itemSection = item.href === "/dashboard" ? "ringkasan" : item.href.split("/").pop(); return <Link className={section === itemSection ? "active" : ""} href={linkFor(item.href)} key={item.label} onClick={() => setSidebar(false)}><Icon /><span>{item.label}</span>{item.label === "Tiket Gangguan" && <b>18</b>}</Link> })}
        </nav>
        <div className="sidebar-help"><ShieldCheck /><strong>Pusat Bantuan</strong><p>Butuh bantuan konfigurasi?</p><button onClick={() => notify("Tim support telah diberi tahu.")}>Hubungi Support</button></div>
        <div className="dash-user"><span>AP</span><div><strong>{displayName}</strong><small>{role}</small></div><MoreHorizontal /></div>
      </aside>

      <div className="dashboard-main">
        <header className="dash-topbar">
          <button className="dash-icon mobile-dash-menu" onClick={() => setSidebar(true)} aria-label="Buka sidebar"><Menu /></button>
          <div className="global-search"><Search /><input aria-label="Pencarian global" placeholder="Cari pelanggan, invoice, tiket..." /><kbd><Command /> K</kbd></div>
          <div className="topbar-actions">
            {demo && <select className="role-switch" value={role} onChange={(e) => setRole(e.target.value)} aria-label="Pilih peran demo">{demoUsers.map(user => <option key={user.role}>{user.role}</option>)}</select>}
            <button className="dash-icon" onClick={() => setDark(!dark)} aria-label="Ubah tema">{dark ? <Sun /> : <Moon />}</button>
            <div className="notification-wrap"><button className="dash-icon notification-button" onClick={() => setNotifications(!notifications)} aria-label="Notifikasi"><Bell /><i /></button>{notifications && <div className="notification-panel"><div><strong>Notifikasi</strong><button onClick={() => setNotifications(false)}><X /></button></div>{[["Pembayaran diterima","Rudi Purnama · Rp325.000","2 menit"],["Router kembali online","POP Kemang · latency 18 ms","12 menit"],["Stok menipis","Fast connector tersisa 18 unit","1 jam"]].map(n => <article key={n[0]}><span><CheckCircle2 /></span><div><strong>{n[0]}</strong><p>{n[1]}</p></div><small>{n[2]}</small></article>)}</div>}</div>
            <button className="profile-button"><span>AP</span><div><strong>{displayName}</strong><small>{role}</small></div><ChevronDown /></button>
          </div>
        </header>

        <main className="dash-content">
          {demo && <div className="demo-banner"><span>MODE DEMO</span> Data pada halaman ini hanya simulasi dan dapat digunakan untuk mencoba interaksi. <Link href="/register">Mulai akun trial <ArrowUpRight /></Link></div>}
          <div className="dash-page-heading"><div><p>Dashboard <ChevronRight /> {currentLabel}</p><h1>{currentLabel}</h1><span>{section === "ringkasan" ? "Pantau performa bisnis dan operasional jaringan Anda." : modules[section]?.description || "Kelola data dan aktivitas operasional secara terpusat."}</span></div><div className="dash-heading-actions"><button className="filter-button"><CalendarDays />{period}<ChevronDown /></button><select className="invisible-select" value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Periode"><option>Hari ini</option><option>Minggu ini</option><option>Bulan ini</option><option>Tahun ini</option></select><button className="button primary" onClick={() => setModal(section === "pelanggan" ? "Tambah Pelanggan" : "Buat Laporan")}><Plus />{section === "pelanggan" ? "Tambah Pelanggan" : "Buat Laporan"}</button></div></div>

          {section === "ringkasan" && <SummaryView notify={notify} />}
          {section === "pelanggan" && <CustomerView search={search} setSearch={setSearch} statusFilter={statusFilter} setStatusFilter={setStatusFilter} customers={filteredCustomers} selected={selected} setSelected={setSelected} toggleAll={toggleAll} setModal={setModal} notify={notify} />}
          {section !== "ringkasan" && section !== "pelanggan" && <ModuleView section={section} notify={notify} />}
        </main>
      </div>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(null)}><div className="dash-modal" onMouseDown={e => e.stopPropagation()}><div className="modal-title"><div><strong>{modal}</strong><p>Isi data berikut untuk melanjutkan.</p></div><button onClick={() => setModal(null)}><X /></button></div><form onSubmit={(e) => {e.preventDefault(); setModal(null); notify(`${modal} berhasil disimpan.`)}}><label>Nama / judul<input required placeholder={modal === "Tambah Pelanggan" ? "Nama pelanggan" : "Nama laporan"} /></label><div className="form-row"><label>Area<select><option>Kemang</option><option>Tebet</option><option>Mampang</option></select></label><label>Status<select><option>Aktif</option><option>Draft</option></select></label></div><label>Catatan<textarea rows={3} placeholder="Tambahkan catatan..." /></label><div className="modal-actions"><button type="button" className="button secondary" onClick={() => setModal(null)}>Batal</button><button className="button primary" type="submit">Simpan</button></div></form></div></div>}
      {toast && <div className="dash-toast"><CheckCircle2 />{toast}</div>}
    </div>
  );
}

function SummaryView({ notify }: { notify: (message: string) => void }) {
  return <>
    <section className="dash-stats-grid"><StatCard icon={CircleDollarSign} label="Total pendapatan" value="Rp146,8 jt" trend="12,6%" /><StatCard icon={Users} label="Pelanggan aktif" value="1.284" trend="28 pelanggan" tone="cyan" /><StatCard icon={WalletCards} label="Tagihan belum dibayar" value="86" trend="−8,2%" tone="amber" /><StatCard icon={Router} label="Router online" value="8 / 9" trend="99,2% uptime" tone="green" /></section>
    <section className="dash-chart-grid"><article className="dash-card revenue-card"><div className="dash-card-title"><div><strong>Tren pendapatan</strong><span>Pemasukan dan pengeluaran 6 bulan</span></div><button onClick={() => notify("Data grafik diekspor ke Excel.")}><Download /> Ekspor</button></div><div className="chart-summary"><span><small>Pemasukan</small><strong>Rp146,8 jt</strong></span><span><small>Pengeluaran</small><strong>Rp38,2 jt</strong></span></div><div className="revenue-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueData} margin={{ left: -20, right: 6, top: 6 }}><defs><linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#176bff" stopOpacity={.3}/><stop offset="1" stopColor="#176bff" stopOpacity={0}/></linearGradient><linearGradient id="expense" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#16c7e8" stopOpacity={.18}/><stop offset="1" stopColor="#16c7e8" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6ebf2"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#8090a5'}}/><YAxis axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#8090a5'}}/><Tooltip formatter={(v) => [`Rp${v} jt`, ""]}/><Area type="monotone" dataKey="income" stroke="#176bff" strokeWidth={3} fill="url(#income)"/><Area type="monotone" dataKey="expense" stroke="#16c7e8" strokeWidth={2} fill="url(#expense)"/></AreaChart></ResponsiveContainer></div></article><article className="dash-card invoice-card"><div className="dash-card-title"><div><strong>Status tagihan</strong><span>Periode Juli 2026</span></div><button><Ellipsis /></button></div><div className="invoice-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={invoiceData} dataKey="value" innerRadius={55} outerRadius={74} paddingAngle={4}>{invoiceData.map(entry => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div><strong>1.284</strong><small>Total</small></div></div><div className="invoice-legend">{invoiceData.map(item => <span key={item.name}><i style={{background:item.color}} /><b>{item.name}</b><em>{item.value}%</em></span>)}</div></article></section>
    <section className="dash-bottom-grid"><article className="dash-card transactions"><div className="dash-card-title"><div><strong>Transaksi terbaru</strong><span>Pembayaran yang masuk hari ini</span></div><button>Lihat semua <ChevronRight /></button></div>{[["RP","Rudi Purnama","QRIS · 16.24","Rp325.000"],["SM","Sari Maharani","BCA VA · 16.17","Rp325.000"],["AP","Ayu Permatasari","Loket · 15.58","Rp275.000"],["DK","Dedi Kurniawan","GoPay · 15.42","Rp225.000"]].map(row => <div className="transaction-row" key={row[1]}><b>{row[0]}</b><span><strong>{row[1]}</strong><small>{row[2]}</small></span><em>{row[3]}</em><i>Berhasil</i></div>)}</article><article className="dash-card operations"><div className="dash-card-title"><div><strong>Status operasional</strong><span>Pembaruan real-time</span></div></div>{[["Router & jaringan","8 dari 9 online","good"],["Tiket gangguan","18 tiket aktif","warn"],["Teknisi lapangan","8 sedang bertugas","blue"],["Stok perangkat","7 item menipis","danger"]].map(row => <div className="operation-row" key={row[0]}><span className={row[2]}>{row[0] === "Router & jaringan" ? <Wifi /> : row[0] === "Tiket gangguan" ? <TicketCheck /> : row[0] === "Teknisi lapangan" ? <Wrench /> : <AlertTriangle />}</span><div><strong>{row[0]}</strong><small>{row[1]}</small></div><ChevronRight /></div>)}</article></section>
  </>;
}

function CustomerView({ search, setSearch, statusFilter, setStatusFilter, customers, selected, setSelected, toggleAll, setModal, notify }: CustomerViewProps) {
  return <section className="dash-card customer-table-card"><div className="table-toolbar"><div className="table-search"><Search /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, ID, area..." /></div><div><select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}><option>Semua status</option><option>Aktif</option><option>Terisolir</option><option>Lunas</option><option>Tertunda</option><option>Terlambat</option></select><button className="toolbar-button"><Filter />Filter</button><button className="toolbar-button" onClick={() => notify("Data pelanggan diekspor ke CSV.")}><Download />Ekspor</button></div></div>{selected.length > 0 && <div className="bulk-bar"><strong>{selected.length} pelanggan dipilih</strong><button onClick={() => notify("Tagihan bulk berhasil dibuat.")}>Buat tagihan</button><button onClick={() => notify("Perintah isolir dimasukkan ke antrean.")}>Isolir</button><button onClick={() => setSelected([])}>Batal</button></div>}<div className="table-scroll"><table className="customer-table"><thead><tr><th><input type="checkbox" checked={selected.length === customers.length && customers.length > 0} onChange={toggleAll}/></th><th>ID Pelanggan</th><th>Nama</th><th>Paket</th><th>Area</th><th>Jatuh tempo</th><th>Status tagihan</th><th>Jaringan</th><th>Aksi</th></tr></thead><tbody>{customers.map((c) => <tr key={c.id}><td><input type="checkbox" checked={selected.includes(c.id)} onChange={() => setSelected(selected.includes(c.id) ? selected.filter((x) => x !== c.id) : [...selected,c.id])}/></td><td><strong>{c.id}</strong><small>{c.service}</small></td><td><div className="customer-name"><b>{c.name.split(" ").map((x)=>x[0]).join("").slice(0,2)}</b><span>{c.name}</span></div></td><td>{c.plan}</td><td>{c.area}</td><td>{c.due}</td><td><span className={`status-pill ${c.bill.toLowerCase()}`}>{c.bill}</span></td><td><span className={`status-pill ${c.network.toLowerCase()}`}>{c.network}</span></td><td><button className="row-menu" onClick={() => setModal(`Detail ${c.name}`)}><Ellipsis /></button></td></tr>)}</tbody></table></div>{customers.length === 0 && <div className="empty-state"><Search /><h3>Data tidak ditemukan</h3><p>Ubah kata kunci atau filter untuk menemukan pelanggan.</p></div>}<div className="table-pagination"><span>Menampilkan 1–{customers.length} dari {customers.length} pelanggan</span><div><button disabled><ChevronLeft /></button><button className="active">1</button><button>2</button><button>3</button><button><ChevronRight /></button></div></div></section>;
}

function ModuleView({ section, notify }: { section: string; notify: (message:string)=>void }) {
  const currentModule = modules[section] || { title: section, description: "Modul operasional", stats: [["Status","Aktif"],["Pembaruan","Real-time"],["Cabang","Jakarta"],["Akses","Terbatas"]], items: [["Konfigurasi utama","Sistem","Aktif"],["Sinkronisasi data","Terakhir 2 menit","Berhasil"],["Audit aktivitas","Hari ini","24 aktivitas"]] };
  return <><section className="module-stats">{currentModule.stats.map((s,i) => <article key={s[0]}><span className={`module-icon tone-${i}`}><TrendingUp /></span><small>{s[0]}</small><strong>{s[1]}</strong></article>)}</section><section className="dash-card module-list"><div className="dash-card-title"><div><strong>{currentModule.title} terbaru</strong><span>{currentModule.description}</span></div><button onClick={() => notify("Data berhasil diekspor.")}><Download /> Ekspor</button></div><div className="module-list-head"><span>Nama / ID</span><span>Informasi</span><span>Status / Nilai</span><span>Aksi</span></div>{currentModule.items.map((item) => <div className="module-list-row" key={item[0]}><div><b>{item[0].split(" ").map(x=>x[0]).join("").slice(0,2)}</b><strong>{item[0]}</strong></div><span>{item[1]}</span><em>{item[2]}</em><button onClick={() => notify(`${item[0]} dibuka.`)}><MoreHorizontal /></button></div>)}</section></>;
}
