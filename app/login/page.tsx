import type { Metadata } from "next";
import AuthPage from "../components/auth-page";
export const metadata: Metadata = { title: "Masuk", robots: { index: false } };
export default function Page() { return <AuthPage mode="login" />; }
