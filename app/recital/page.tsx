"use client";

import Link from "next/link";
import { FaArrowLeft, FaInstagram } from "react-icons/fa";
import { useMemo } from "react";

export default function RecitalPage() {
  const estrelas = useMemo(() => {
    return Array.from({ length: 500 }, (_, i) => {
      const size = Math.random() < 0.15
        ? Math.random() * 3 + 2   // estrelas grandes (destaque)
        : Math.random() * 2 + 1;

      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${size}px`,
        opacity: 0.10 + Math.random() * 0.4,
        delay: `${Math.random() * 6}s`,
        duration: `${3 + Math.random() * 5}s`,
      };
    });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#cdc9f8] via-[#2a1f4a] to-[#3a2c66] px-6 pb-20 pt-20 text-[#4B2C6F] md:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="dream-mist dream-mist-1" />
        <div className="dream-mist dream-mist-2" />
        <div className="dream-mist dream-mist-3" />
        <div className="dream-glow dream-glow-1" />
        <div className="dream-glow dream-glow-2" />

        {estrelas.map((estrela) => (
          <span
            key={estrela.id}
            className="dream-star"
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
        <div className="absolute -top-24 left-0 h-[320px] w-[320px] rounded-full bg-[#d9b8ff]/40 blur-3xl" />
        <div className="absolute right-[-40px] top-[18%] h-[300px] w-[300px] rounded-full bg-[#c9d8ff]/40 blur-3xl" />
        <div className="absolute bottom-[-60px] left-[25%] h-[280px] w-[280px] rounded-full bg-[#f3d4ff]/50 blur-3xl" />
      </div>

      <Link
        href="/#recital"
        className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ffffffaa] bg-white/55 text-[#6b3fa0] shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#cfaeff] hover:text-[#4B2C6F] md:left-6 md:top-24 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#9065c7]">
              Evento anual 2026
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Recital
              <span className="block bg-gradient-to-r from-[#8555d8] via-[#b890fd] to-[#a45de6] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(180,130,255,0.28)]">
                Sonhos
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f467e]/100">
              Uma noite especial em comemoração ao aniversário do Ministério
              Lúminuss. Nesta edição, o recital convida o público a mergulhar em
              um universo de sensações, inspirado na delicadeza, na profundidade
              e na beleza dos sonhos.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-[#dcc7ff] bg-white/55 p-5 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
                <p className="text-sm uppercase tracking-wide text-[#9c7ac9]">
                  Data
                </p>
                <p className="mt-2 text-xl font-semibold text-[#5b348d]">
                  25/07
                </p>
              </div>

              <div className="rounded-3xl border border-[#dcc7ff] bg-white/55 p-5 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
                <p className="text-sm uppercase tracking-wide text-[#9c7ac9]">
                  Edição
                </p>
                <p className="mt-2 text-xl font-semibold text-[#5b348d]">
                  2026
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-[#e6d8ff] bg-white/45 p-3 shadow-[0_0_40px_rgba(180,130,255,0.14)] backdrop-blur-md">
              <img
                src="/faelton.galaxia.jpeg"
                alt="Arte do recital Lúminuss Sonhos"
                className="h-[500px] w-full rounded-[1.4rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-24 max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[#dcc7ff] bg-white/55 p-6 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#8c63c5]">
              Sobre o recital
            </h2>
            <p className="mt-4 leading-7 text-[#5f467e]/90">
              O recital é realizado todos os anos em comemoração ao aniversário
              do Ministério Lúminuss, sempre com uma temática especial que
              transforma o ambiente e a experiência vivida. Cada edição é única
              — e feita para ser sentida.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dcc7ff] bg-white/55 p-6 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#8c63c5]">
              Tema deste ano
            </h2>
            <p className="mt-4 leading-7 text-[#5f467e]/90">
              Em 2026, o recital será marcado pelo tema{" "}
              <span className="font-semibold text-[#6b42a5]">Sonhos</span>,
              trazendo uma atmosfera envolvente, com tons suaves, brilho e
              elementos que remetem ao imaginário, ao silêncio e às emoções mais
              profundas.
            </p>
          </div>

          <div className="rounded-3xl border border-[#dcc7ff] bg-white/55 p-6 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
            <h2 className="text-xl font-semibold text-[#8c63c5]">
              Mais informações
            </h2>
            <p className="mt-4 leading-7 text-[#5f467e]/90">
              Em breve, esta página poderá receber data, horário, local,
              contagem regressiva, galeria e outras informações especiais sobre
              a edição deste ano.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-24 max-w-4xl text-center">
        <div className="rounded-[2rem] border border-[#dcc7ff] bg-white/50 px-6 py-10 shadow-[0_10px_30px_rgba(180,130,255,0.10)] backdrop-blur-md">
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
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#b58cff] via-[#9a7dff] to-[#c7a4ff] px-6 py-3 font-semibold text-white shadow-[0_8px_24px_rgba(166,120,255,0.25)] transition hover:scale-105"
            >
              <FaInstagram />
              Acompanhar no Instagram
            </a>

            <Link
              href="/agendamento"
              className="rounded-full border border-[#d7bfff] bg-white/75 px-6 py-3 font-semibold text-[#5b348d] transition hover:bg-white"
            >
              ADQUIRIR INGRESSO
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .dream-star {
  position: absolute;
  border-radius: 9999px;

  background: radial-gradient(circle, #ffffff 0%, #ffffff 40%, transparent 70%);

  box-shadow:
    0 0 10px rgba(255, 255, 255, 1),
    0 0 20px rgba(200, 180, 255, 0.9),
    0 0 35px rgba(180, 140, 255, 0.7);

  animation: dreamTwinkle ease-in-out infinite;
}

        .dream-mist {
          position: absolute;
          inset: auto;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.7;
          animation: dreamFloat 14s ease-in-out infinite;
        }

        .dream-mist-1 {
          top: 10%;
          left: -8%;
          width: 280px;
          height: 180px;
          background: rgba(214, 175, 255, 0.28);
        }

        .dream-mist-2 {
          top: 38%;
          right: -6%;
          width: 300px;
          height: 200px;
          background: rgba(198, 216, 255, 0.26);
          animation-delay: 2s;
        }

        .dream-mist-3 {
          bottom: 8%;
          left: 20%;
          width: 360px;
          height: 220px;
          background: rgba(255, 223, 246, 0.24);
          animation-delay: 4s;
        }

        .dream-glow {
          position: absolute;
          border-radius: 9999px;
          filter: blur(95px);
          opacity: 0.55;
          animation: dreamPulse 9s ease-in-out infinite;
        }

        .dream-glow-1 {
          top: 12%;
          left: 35%;
          width: 260px;
          height: 260px;
          background: rgba(213, 177, 255, 0.34);
        }

        .dream-glow-2 {
          bottom: 12%;
          right: 10%;
          width: 240px;
          height: 240px;
          background: rgba(205, 224, 255, 0.32);
          animation-delay: 2.5s;
        }

        @keyframes dreamTwinkle {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.45);
            opacity: 1.2;
          }
        }

        @keyframes dreamFloat {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          25% {
            transform: translate3d(20px, -12px, 0);
          }
          50% {
            transform: translate3d(-12px, 16px, 0);
          }
          75% {
            transform: translate3d(14px, 8px, 0);
          }
        }

        @keyframes dreamPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.14);
            opacity: 0.75;
          }
        }
      `}</style>
    </main>
  );
}