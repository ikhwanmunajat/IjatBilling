"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CircleCheck, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Users } from "lucide-react";
import { Brand } from "./brand";
import { demoUsers } from "../site-data";

type Mode = "login" | "register" | "forgot";

export default function AuthPage({ mode }: { mode: Mode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState("Owner ISP");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mode === "login") window.location.href = `/demo?role=${encodeURIComponent(selectedRole)}`;
    if (mode === "register") setMessage("Akun uji coba berhasil disiapkan. Silakan periksa email untuk langkah berikutnya.");
    if (mode === "forgot") setMessage("Tautan pengaturan ulang kata sandi telah dikirim jika email terdaftar.");
  };

  return (
    <main className="auth-layout">
      <section className="auth-panel">
        <div className="auth-top"><Brand /><Link href="/"><ArrowLeft /> Kembali ke website</Link></div>
        <div className="auth-form-wrap">
          <span className="auth-icon">{mode === "register" ? <Users /> : mode === "forgot" ? <Mail /> : <LockKeyhole />}</span>
          <h1>{mode === "login" ? "Masuk ke Ijatbilling" : mode === "register" ? "Mulai uji coba gratis" : "Pulihkan akses akun"}</h1>
          <p>{mode === "login" ? "Gunakan akses demo untuk mengeksplorasi dashboard sesuai peran." : mode === "register" ? "Aktifkan seluruh fitur selama 14 hari. Tanpa kartu kredit." : "Masukkan email akun. Kami akan mengirim tautan pengaturan ulang."}</p>

          {message ? (
            <div className="auth-success"><CircleCheck /><h2>Berhasil</h2><p>{message}</p><Link href={mode === "forgot" ? "/login" : "/demo"} className="button primary">Lanjutkan <ArrowRight /></Link></div>
          ) : (
            <form className="auth-form" onSubmit={submit}>
              {mode === "register" && <><label>Nama lengkap<input required minLength={3} placeholder="Nama Anda" /></label><label>Nama ISP<input required minLength={3} placeholder="Contoh: Nusa Fiber" /></label></>}
              <label>Email bisnis<input required type="email" defaultValue={mode === "login" ? "owner@demo.ijatbilling.id" : ""} placeholder="nama@perusahaan.id" /></label>
              {mode !== "forgot" && <label>Kata sandi<div className="password-field"><input required minLength={8} type={showPassword ? "text" : "password"} defaultValue={mode === "login" ? "Demo1234" : ""} placeholder="Minimal 8 karakter" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Tampilkan kata sandi">{showPassword ? <EyeOff /> : <Eye />}</button></div></label>}
              {mode === "register" && <label className="checkbox-label"><input required type="checkbox" /> <span>Saya menyetujui <Link href="/legal?doc=syarat">syarat layanan</Link> dan <Link href="/legal?doc=privasi">kebijakan privasi</Link>.</span></label>}
              {mode === "login" && <div className="form-options"><label className="checkbox-label"><input type="checkbox" /><span>Ingat saya</span></label><Link href="/lupa-password">Lupa kata sandi?</Link></div>}
              {mode === "login" && <label>Peran demo<select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>{demoUsers.map(user => <option key={user.role}>{user.role}</option>)}</select></label>}
              <button className="button primary auth-submit" type="submit">{mode === "login" ? "Masuk ke Demo" : mode === "register" ? "Buat Akun Trial" : "Kirim Tautan"}<ArrowRight /></button>
              {mode === "login" && <><div className="auth-divider"><span>atau akses workspace</span></div><Link className="button secondary auth-submit" href="/signin-with-chatgpt?return_to=%2Fdashboard"><ShieldCheck /> Masuk dengan ChatGPT</Link></>}
            </form>
          )}
          <div className="auth-switch">{mode === "login" ? <>Belum punya akun? <Link href="/register">Coba gratis</Link></> : mode === "register" ? <>Sudah punya akun? <Link href="/login">Masuk</Link></> : <>Ingat kata sandi? <Link href="/login">Kembali masuk</Link></>}</div>
        </div>
      </section>
      <section className="auth-visual">
        <div className="auth-glow" />
        <div className="auth-visual-copy"><span>IJATBILLING CLOUD</span><h2>Kontrol bisnis ISP Anda dari satu pusat komando.</h2><p>Data pelanggan, tagihan, jaringan, dan tim lapangan selalu selaras.</p><div className="auth-benefits">{["Setup dibantu tim onboarding", "Data demo realistis", "Akses sesuai peran", "Tanpa kartu kredit"].map(x => <div key={x}><Check />{x}</div>)}</div></div>
        <div className="auth-metric-card"><small>Pendapatan bulan ini</small><strong>Rp146,8 juta</strong><span>↑ 12,6% dari bulan lalu</span><div className="auth-bars">{[35,55,45,72,62,87,74,96].map((h,i) => <i key={i} style={{height: `${h}%`}} />)}</div></div>
      </section>
    </main>
  );
}
