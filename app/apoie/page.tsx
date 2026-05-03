"use client";

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function ApoiePage() {
  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-28 text-white">
      <div className="mx-auto max-w-6xl">

        {/* VOLTAR */}
        <Link
  href="/"
  className="fixed left-4 top-24 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-28 md:h-12 md:w-12"
>
  <FaArrowLeft className="text-sm md:text-lg" />
</Link>

        {/* TÍTULO */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Apoie o Lúminuss
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Faça parte dessa missão
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-white/70">
            Sua contribuição ajuda o Ministério Lúminuss a continuar levando
            louvor, adoração e esperança a mais pessoas.
          </p>
        </div>

        {/* CONTEÚDO */}
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* IMAGEM */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <img
              src="/camisetas.jpeg"
              alt="Produtos Lúminuss"
              className="w-full rounded-2xl object-cover"
            />
          </div>

          {/* TEXTO */}
          <div>

            <h2 className="mb-4 text-2xl font-semibold">
              Apoie através de produtos oficiais
            </h2>

            <p className="mb-6 leading-7 text-white/70">
              Ao adquirir produtos do Lúminuss, você contribui diretamente
              para o crescimento do ministério e para que possamos continuar
              levando música e esperança a mais igrejas.
            </p>

            {/* BOTÕES */}
            <div className="mb-10 flex flex-wrap gap-4">

              <button className="rounded-full bg-[#F4C021] px-6 py-3 font-semibold text-[#061B5C] transition hover:scale-105">
                Comprar produtos
              </button>

              <button className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                Fazer doação
              </button>

            </div>

            {/* METAS */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-[#F4C021]">
                Veja com o que você estará contribuindo:
              </h3>

              <ul className="space-y-3 text-white/80">

                <li>🎤 Compra de equipamentos de som</li>
                <li>🎹 Aquisição e manutenção de instrumentos</li>
                <li>🚐 Transporte para eventos e apresentações</li>
                <li>🎼 Produção de novos projetos musicais</li>

                {/* 👉 depois você pode editar/adicionar aqui */}

              </ul>
            </div>

          </div>
        </div>

        {/* EXTRA FUTURO */}
        <div className="mt-20 text-center">
          <p className="text-white/50 text-sm">
            Em breve: loja completa, pagamentos online e acompanhamento de metas 🙌
          </p>
          página em manutenção
        </div>

      </div>
    </main>
  );
}