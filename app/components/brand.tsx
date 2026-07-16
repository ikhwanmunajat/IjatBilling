import Link from "next/link";
import { RadioTower } from "lucide-react";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Ijatbilling beranda">
      <span className="brand-mark"><RadioTower size={20} strokeWidth={2.4} /></span>
      <span className={inverse ? "text-white" : ""}>Ijat<span>billing</span></span>
    </Link>
  );
}
