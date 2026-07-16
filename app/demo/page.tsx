import type { Metadata } from "next";
import DashboardApp from "../components/dashboard-app";
export const metadata: Metadata = { title: "Demo Dashboard", description: "Coba dashboard Ijatbilling dengan data simulasi realistis.", robots: { index: false } };
export default function Page() { return <DashboardApp demo />; }
