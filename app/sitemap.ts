import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/fitur", "/solusi", "/harga", "/aplikasi", "/dokumentasi", "/tentang", "/kontak", "/status", "/register"];
  return routes.map((route) => ({ url: `https://ijatbilling.id${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : .7 }));
}
