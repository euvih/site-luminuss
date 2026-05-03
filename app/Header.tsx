"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const esconderNoMobile = pathname === "/recital" || pathname === "/sobre";

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#061B5C]/95 backdrop-blur ${
        esconderNoMobile ? "hidden" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 py-2 text-white">
        <div className="flex items-center justify-between">
          <Link
            href="/#inicio"
            className="flex items-center gap-3"
            onClick={() => setMenuAberto(false)}
          >
            <img
              src="/logo-transparente.png"
              alt="Logo Lúminuss"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <div className="hidden gap-6 md:flex">
            <a href="/#inicio" className="transition hover:text-[#F4C021]">
              Início
            </a>
            <a href="/#agenda" className="transition hover:text-[#F4C021]">
              Agenda
            </a>
            <a href="/#sobre" className="transition hover:text-[#F4C021]">
              Sobre
            </a>
            <a href="/#recital" className="transition hover:text-[#F4C021]">
              Recital
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

          <button
            type="button"
            onClick={() => setMenuAberto((prev) => !prev)}
            className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          >
            {menuAberto ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuAberto ? "max-h-96 pt-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 rounded-2xl border border-white/10 bg-[#061B5C] p-3 shadow-lg">
            {[
              ["Início", "/#inicio"],
              ["Agenda", "/#agenda"],
              ["Sobre", "/#sobre"],
              ["Recital", "/#recital"],
              ["Integrantes", "/#integrantes"],
              ["Galeria", "/#galeria"],
              ["Doações", "/#doacoes"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuAberto(false)}
                className="block rounded-xl px-4 py-3 transition hover:bg-white/10 hover:text-[#F4C021]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}