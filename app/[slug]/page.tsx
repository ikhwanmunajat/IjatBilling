import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPage from "../components/marketing-page";

const allowed = ["fitur", "solusi", "harga", "aplikasi", "dokumentasi", "tentang", "kontak", "status", "legal"];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);
  return { title, description: `${title} Ijatbilling, platform billing dan manajemen operasional ISP terintegrasi.`, alternates: { canonical: `/${slug}` } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!allowed.includes(slug)) notFound();
  return <MarketingPage slug={slug} />;
}
