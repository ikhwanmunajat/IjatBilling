import type { Metadata } from "next";
import AuthPage from "../components/auth-page";
export const metadata: Metadata = { title: "Coba Gratis", description: "Mulai uji coba Ijatbilling gratis selama 14 hari." };
export default function Page() { return <AuthPage mode="register" />; }
