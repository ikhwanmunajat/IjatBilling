import type { Metadata } from "next";
import DashboardApp from "../../components/dashboard-app";
import { requireChatGPTUser } from "../../chatgpt-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

export default async function Page({ params }: { params: Promise<{ section?: string[] }> }) {
  const { section } = await params;
  const path = section?.[0] ? `/dashboard/${section[0]}` : "/dashboard";
  const user = await requireChatGPTUser(path);
  return <DashboardApp section={section?.[0] || "ringkasan"} displayName={user.fullName || "Pengguna Ijatbilling"} />;
}
