import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/dashboard", "/demo", "/login", "/lupa-password"] }, sitemap: "https://ijatbilling.id/sitemap.xml" };
}
