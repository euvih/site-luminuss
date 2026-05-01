"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const esconderNoMobile = pathname === "/recital" || pathname === "/sobre";

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#061B5C]/95 backdrop-blur ${
        esconderNoMobile ? "hidden" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-white">
        <Link href="/#inicio" className="flex items-center gap-3">
          <img
            src="/logo-transparente.png"
            alt="Logo Lúminuss"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="text-xl font-bold tracking-wide transition hover:text-[#F4C021] hover:drop-shadow-[0_0_8px_#F4C021]">
            Lúminuss
          </span>
        </Link>

        <div className="hidden gap-6 md:flex">
          <a href="/#inicio" className="transition hover:text-[#F4C021]">
            Início
          </a>

          <a href="/#sobre" className="transition hover:text-[#F4C021]">
            Sobre
          </a>

          <a href="/#integrantes" className="transition hover:text-[#F4C021]">
            Integrantes
          </a>

          <a href="/#galeria" className="transition hover:text-[#F4C021]">
            Galeria
          </a>

          <a href="/#doacoes" className="transition hover:text-[#F4C021]">
            Doações
          </a>
        </div>
      </nav>
    </header>
  );
}