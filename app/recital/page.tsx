"use client";
import Link from "next/link";
import { FaArrowLeft, FaInstagram } from "react-icons/fa";

export default function RecitalPage() {
  const estrelas = Array.from({ length: 520 }, (_, i) => {
    const size = Math.random() * 2.2 + 1;
    return {
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${2 + Math.random() * 3}s`,
      opacity: 0.4 + Math.random() * 0.6,
    };
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#6f51a8] px-6 pb-20 pt-28 text-white md:pt-32">
      {/* fundo cosmos */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="poeira-cosmica" />
        <div className="nevoa-estelar" />

        {estrelas.map((estrela) => (
          <span
            key={estrela.id}
            className="estrela"
            style={{
              left: estrela.left,
              top: estrela.top,
              width: estrela.width,
              height: estrela.height,
              opacity: estrela.opacity,
              animationDelay: estrela.animationDelay,
              animationDuration: estrela.animationDuration,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-0 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute top-[25%] right-[-80px] h-[380px] w-[380px] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[28%] h-[320px] w-[320px] rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>

      <Link
        href="/#recital"
        className="fixed left-4 top-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-24 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#c8a8ff]">
              Evento anual 2026
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Recital
              <span className="block bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-white bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(168,85,247,0.45)]">
                Sonhos
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/100">
              Uma noite especial em comemoração ao aniversário do Ministério
              Lúminuss. Nesta edição, o recital convida o público a mergulhar em
              um universo de sensações, inspirado na delicadeza, na profundidade
              e na beleza dos sonhos.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <p className="text-sm uppercase tracking-wide text-[#c8a8ff]">
                  Tema
                </p>
                <p className="mt-2 text-xl font-semibold">Sonhos</p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <p className="text-sm uppercase tracking-wide text-[#c8a8ff]">
                  Edição
                </p>
                <p className="mt-2 text-xl font-semibold">Recital 2026</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_0_40px_rgba(96,165,250,0.16)] backdrop-blur-md">
              <img
                src="/faelton.galaxia.jpeg"
                alt="Arte do recital Lúminuss Galáxia"
                className="h-[500px] w-full rounded-[1.4rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-24 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#c8a8ff]">
              Sobre o recital
            </h2>
            <p className="mt-4 leading-7 text-white/80">
              O recital é realizado todos os anos em comemoração ao aniversário
              do Ministério Lúminuss, sempre com uma temática especial que
              transforma o ambiente e a experiência vivida. Cada edição é única
              — e feita para ser sentida.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#c8a8ff]">
              Tema deste ano
            </h2>
            <p className="mt-4 leading-7 text-white/80">
              Em 2026, o recital será marcado pelo tema{" "}
              <span className="font-semibold text-[#d9d6e5]">Sonhos</span>,
              trazendo uma atmosfera envolvente, com tons suaves, brilho e
              elementos que remetem ao imaginário, ao silêncio e às emoções mais
              profundas.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#c8a8ff]">
              Mais informações
            </h2>
            <p className="mt-4 leading-7 text-white/80">
              Em breve, esta página poderá receber data, horário, local,
              contagem regressiva, galeria e outras informações especiais sobre
              a edição deste ano.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-24 max-w-4xl text-center">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-10 backdrop-blur-md">
          <p className="text-sm uppercase tracking-[0.35em] text-[#c8a8ff]">
            Acompanhe novidades
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Uma noite para contemplar e sentir Jesus através do louvor.
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://instagram.com/mluminuss/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] via-[#2563eb] to-[#9333ea] px-6 py-3 font-semibold text-white transition hover:scale-105"
            >
              <FaInstagram />
              Acompanhar no Instagram
            </a>

            <Link
              href="/agendamento"
              className="rounded-full border border-white/20 bg-black/70 px-6 py-3 font-semibold text-white transition hover:bg-white/20"
            >
              ADQUIRIR INGRESSO
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}