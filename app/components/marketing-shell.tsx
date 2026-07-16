"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronRight, Menu, Moon, Sun, X } from "lucide-react";
import { Brand } from "./brand";
import { navItems } from "../site-data";

export function Header({ dark, setDark }: { dark: boolean; setDark: (value: boolean) => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {navItems.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link className="text-button desktop-only" href="/login">Masuk</Link>
          <Link className="button primary small desktop-only" href="/register">Coba Gratis <ChevronRight size={16} /></Link>
          <button className="icon-button mobile-menu" onClick={() => setOpen(!open)} aria-label="Buka menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Navigasi mobile">
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
          <div className="mobile-nav-actions">
            <Link className="button secondary" href="/login">Masuk</Link>
            <Link className="button primary" href="/register">Coba Gratis</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const columns = [
    { title: "Produk", links: [["Fitur", "/fitur"], ["Integrasi", "/fitur#integrasi"], ["Harga", "/harga"], ["Aplikasi", "/aplikasi"], ["Pembaruan", "/status"]] },
    { title: "Sumber Daya", links: [["Dokumentasi", "/dokumentasi"], ["Tutorial video", "/dokumentasi"], ["Artikel", "/dokumentasi"], ["Status server", "/status"], ["API documentation", "/dokumentasi"]] },
    { title: "Perusahaan", links: [["Tentang kami", "/tentang"], ["Hubungi kami", "/kontak"], ["Mitra", "/kontak"], ["Karier", "/tentang"]] },
    { title: "Legal", links: [["Kebijakan privasi", "/legal?doc=privasi"], ["Syarat & ketentuan", "/legal?doc=syarat"], ["Kebijakan refund", "/legal?doc=refund"], ["Keamanan data", "/legal?doc=keamanan"]] },
  ];
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-about">
          <Brand inverse />
          <p>Platform billing dan operasional ISP terpadu untuk bisnis internet yang ingin tumbuh dengan proses lebih tertib.</p>
          <div className="system-status"><span /> Semua sistem operasional</div>
          <p className="contact-copy">Jakarta, Indonesia<br />halo@ijatbilling.id<br />+62 811 9000 2026</p>
        </div>
        {columns.map((column) => (
          <div key={column.title} className="footer-column">
            <h3>{column.title}</h3>
            {column.links.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Ijatbilling. Hak cipta dilindungi.</span><span>Indonesia · ID</span></div>
    </footer>
  );
}
