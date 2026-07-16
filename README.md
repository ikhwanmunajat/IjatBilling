# Ijatbilling

Website SaaS dan dashboard demo untuk platform billing, manajemen pelanggan, jaringan MikroTik, keuangan, inventaris, dan operasional ISP.

## Teknologi

- Next.js App Router berbasis Vinext
- TypeScript
- Tailwind CSS
- Lucide React
- Motion
- Recharts

## Menjalankan proyek

```bash
npm install
npm run dev
```

## Build produksi

```bash
npm run build
npm run validate:artifact
```

## Rute utama

- `/` landing page
- `/fitur`, `/solusi`, `/harga`, `/aplikasi`, `/dokumentasi`
- `/tentang`, `/kontak`, `/status`
- `/login`, `/register`, `/lupa-password`
- `/demo` dashboard publik dengan data simulasi
- `/dashboard` dashboard terlindungi melalui Sign in with ChatGPT
- `/dashboard/pelanggan`, `/dashboard/tagihan`, `/dashboard/mikrotik`, dan modul operasional lain

## Akun demo

Halaman `/login` menyediakan pemilih peran untuk Owner ISP, Admin, Finance, NOC, Teknisi, dan Loket. Seluruh akun menggunakan data simulasi dan tidak menyimpan kredensial.

Contoh tampilan awal:

- Email: `owner@demo.ijatbilling.id`
- Kata sandi: `Demo1234`

## Konfigurasi

Konten produk, paket harga, menu, serta akun demo berada di `app/site-data.ts`. Warna dan token visual utama berada di `app/globals.css`.

Prototipe ini menggunakan data lokal yang realistis. Sambungkan formulir, transaksi, MikroTik, payment gateway, dan modul operasional ke API produksi sebelum digunakan untuk data pelanggan nyata.
