"use client";

import Link from "next/link";
import { FaArrowLeft, FaInstagram } from "react-icons/fa";
import { useMemo } from "react";

export default function RecitalPage() {
  const estrelas = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => {
      const size =
        Math.random() < 0.15
          ? Math.random() * 3 + 2
          : Math.random() * 2 + 1;

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        opacity: 0.4 + Math.random() * 0.6,
        delay: `${Math.random() * 6}s`,
        duration: `${3 + Math.random() * 5}s`,
      };
    });
  }, []);

  return (
<main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#f7f3ff] via-[#ac88e7] to-[#191036] px-6 pb-20 pt-20 text-[#3c2560] md:pt-32">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="dream-mist dream-mist-1" />
        <div className="dream-mist dream-mist-2" />
        <div className="dream-mist dream-mist-3" />
        <div className="dream-glow dream-glow-1" />
        <div className="dream-glow dream-glow-2" />

        {estrelas.map((estrela) => (
  <span
    key={estrela.id}
    className="estrela"
    style={{
      left: estrela.left,
      top: estrela.top,
      width: estrela.size,
      height: estrela.size,
      opacity: estrela.opacity,
      animationDelay: estrela.delay,
      animationDuration: estrela.duration,
    }}
  />
))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 left-0 h-[320px] w-[320px] rounded-full bg-[#e6ccff]/20 blur-3xl" />
        <div className="absolute right-[-40px] top-[18%] h-[300px] w-[300px] rounded-full bg-[#dcd6ff]/40 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[25%] h-[280px] w-[280px] rounded-full bg-[#f3e6ff]/50 blur-3xl" />
      </div>

      <Link
        href="/#recital"
        className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffffaa] bg-white/40 text-[#5b318f] shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#cfaeff] hover:text-[#4B2C6F] md:left-6 md:top-24 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#7b5bb3]">
              Evento anual 2026
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Recital
              <span className="block bg-gradient-to-r from-[#7a5bd6] via-[#c8b9f0] to-[#a67df0] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(180,130,255,0.28)]">
                Sonhos
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#4a3570]">
              Uma noite especial em comemoração ao aniversário do Ministério
              Lúminuss. Nesta edição, o recital convida o público a mergulhar em
              um universo de sensações, inspirado na delicadeza, na profundidade
              e na beleza dos sonhos.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-[#e0d4ff] bg-white/60 p-5 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
                <p className="text-sm uppercase tracking-wide text-[#9c7ac9]">
                  Data
                </p>
                <p className="mt-2 text-xl font-semibold text-[#5b348d]">
                  25/07
                </p>
              </div>

              <div className="rounded-3xl border border-[#d6c6ff] bg-white/60 p-5 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
                <p className="text-sm uppercase tracking-wide text-[#9c7ac9]">
                  Edição
                </p>
                <p className="mt-2 text-xl font-semibold text-[#5b348d]">
                  2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-15 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#f3ebff] bg-white/60 p-6 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#8c63c5]">
              Sobre o recital
            </h2>
            <p className="mt-4 leading-7 text-[#5f467e]/90">
  O recital é realizado todos os anos em gratidão a Deus pelo aniversário
  do Ministério Lúminuss. Mais do que uma programação musical, é um momento
  de adoração, louvor e celebração da forma como o Senhor tem conduzido
  este ministério. Cada edição carrega uma mensagem especial para tocar
  corações e aproximar pessoas de Cristo.
</p>
          </div>

          <div className="rounded-3xl border border-[#dcc7ff] bg-white/60 p-6 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#8c63c5]">
              Tema deste ano
            </h2>
            <p className="mt-4 leading-7 text-[#5f467e]/90">
  Em 2026, o recital será marcado pelo tema{" "}
  <span className="font-semibold text-[#6b42a5]">Sonhos</span>,
  lembrando que Deus também fala aos nossos corações através de propósitos,
  esperança e fé. A proposta é criar uma atmosfera sensível e espiritual,
  onde cada canção conduza o público a refletir, adorar e confiar nos planos
  do Senhor.
</p>
          </div>

          <div className="rounded-3xl border border-[#dcc7ff] bg-white/60 p-6 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#3e1a70]">
              Mais informações
            </h2>
            <p className="mt-4 leading-7 text-[#5f467e]/90">
  Em breve, esta página receberá informações sobre data, horário, local,
  programação, participações especiais e outros detalhes do recital. Será
  uma noite preparada com carinho para louvar a Deus e compartilhar uma
  mensagem de esperança através da música.
</p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-24 max-w-4xl text-center">
        <div className="rounded-[2rem] border border-[#d6c6ff] bg-white/80 px-6 py-10 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.35em] text-[#9c7ac9]">
            Acompanhe novidades
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#5b348d] md:text-4xl">
            Uma noite para contemplar e sentir Jesus através do louvor.
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/mluminuss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a97cff] via-[#8f6cf0] to-[#c3a6ff] px-6 py-3 font-semibold text-white shadow-[0_8px_24px_rgba(166,120,255,0.25)] transition hover:scale-105"
            >
              <FaInstagram />
              Acompanhar no Instagram
            </a>

            <button
  onClick={() => alert("Os ingressos ainda não estão disponíveis. Em breve! 🎶")}
  className="rounded-full border border-[#d7bfff] bg-white/75 px-6 py-3 font-semibold text-[#5b348d] transition hover:bg-white"
>
  ADQUIRIR INGRESSO
</button>
          </div>
        </div>
      </section>
    </main>
  );
}