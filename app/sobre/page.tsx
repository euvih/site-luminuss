"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music2,
  Play,
  Pause,
  Users,
  Mic2,
  HeartHandshake,
  Camera,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Quote,
  Disc3,
  Star,
} from "lucide-react";

const fotos = [
  "/img1.jpeg",
  "/ftantiga1.jpeg",
  "/ftantiga2.jpeg",
  "/ftantiga3.jpeg",
  "/foto4.jpeg",
  "/foto5.jpeg",
  "/foto6.jpeg",
];

const destaques = [
  {
    icon: Users,
    title: "Uma família em missão",
    text: "O Lúminuss é mais do que um grupo musical. Somos pessoas unidas pelo desejo de adorar, servir e levar esperança por meio da música.",
  },
  {
    icon: Mic2,
    title: "Louvor com propósito",
    text: "Cada apresentação é pensada como um ministério. Nosso objetivo não é apenas cantar, mas tocar corações e apontar para Cristo.",
  },
  {
    icon: HeartHandshake,
    title: "Serviço e dedicação",
    text: "Ensaios, organização, apoio técnico, sonoplastia, mídia e instrumental: tudo é feito com carinho para oferecer excelência e reverência.",
  },
  {
    icon: Camera,
    title: "Histórias que ficam",
    text: "Ao longo do caminho, construímos memórias, aprendizados, amizades e experiências que fazem parte da identidade do ministério.",
  },
];

const curiosidades = [
  "Temos integrantes de diferentes áreas atuando juntos em um mesmo propósito.",
  "Cada apresentação envolve preparação musical, técnica e espiritual.",
  "Nosso ministério valoriza o cuidado com a mensagem e com a experiência da igreja convidada.",
  "Acreditamos que música também é acolhimento, testemunho e missão.",
];

const timeline = [
  {
    ano: "Início",
    titulo: "Nasce um propósito",
    texto:
      "O grupo surge com o desejo de usar a música como instrumento de adoração, evangelismo e apoio às igrejas.",
  },
  {
    ano: "Crescimento",
    titulo: "Mais vozes, mais dons",
    texto:
      "Com o tempo, o ministério ganha força com vocal, instrumental, apoio, mídia, sonoplastia e direção trabalhando em unidade.",
  },
  {
    ano: "Hoje",
    titulo: "Excelência com essência",
    texto:
      "Seguimos aperfeiçoando nossa organização, repertório e identidade, sem perder a simplicidade e o foco no propósito.",
  },
];

export default function SobreNosLuminuss() {
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [mutado, setMutado] = useState(false);
  const [curiosidadeAtiva, setCuriosidadeAtiva] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFotoAtiva((prev) => (prev + 1) % fotos.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const curiosidadesTimer = setInterval(() => {
      setCuriosidadeAtiva((prev) => (prev + 1) % curiosidades.length);
    }, 3500);
    return () => clearInterval(curiosidadesTimer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = mutado;
    }
  }, [mutado]);

  const textoResumo = useMemo(
    () =>
      "O Lúminuss é um ministério musical cristão que atua em cultos, congressos, eventos especiais e programações em igrejas, levando adoração, mensagem e esperança por meio da música.",
    []
  );

  const textoCompleto = useMemo(
    () =>
      "O Lúminuss nasceu do desejo de servir a Deus com excelência e sensibilidade. Ao longo da caminhada, fomos entendendo que nosso papel vai além das vozes, dos instrumentos e da técnica: cada apresentação é uma oportunidade de acolher, inspirar e transmitir a mensagem de Cristo. Nosso grupo reúne pessoas com dons diferentes, unidas por um mesmo propósito. Há quem esteja no vocal, no instrumental, na direção, na mídia, na sonoplastia e no apoio, e cada função contribui para que o ministério aconteça de forma harmoniosa. Valorizamos organização, reverência, dedicação e, acima de tudo, a essência espiritual do louvor. O que fazemos é construído com ensaios, preparação, cuidado com os detalhes e muito amor pela missão. Queremos que cada igreja, cada evento e cada pessoa alcançada pela nossa música viva uma experiência de adoração sincera, beleza, esperança e presença de Deus.",
    []
  );

  async function alternarMusica() {
    if (!audioRef.current) return;

    try {
      if (tocando) {
        audioRef.current.pause();
        setTocando(false);
      } else {
        await audioRef.current.play();
        setTocando(true);
      }
    } catch (error) {
      console.error("Não foi possível iniciar o áudio:", error);
    }
  }

  function fotoAnterior() {
    setFotoAtiva((prev) => (prev - 1 + fotos.length) % fotos.length);
  }

  function proximaFoto() {
    setFotoAtiva((prev) => (prev + 1) % fotos.length);
  }

  return (
    <main className="min-h-screen bg-[#04184d] text-white">
      <audio ref={audioRef} loop preload="none" src="/musica-luminuss.mp3" />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,192,33,0.22),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.22),transparent_25%),linear-gradient(180deg,#061B5C_0%,#04184d_100%)]" />
        <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-[#F4C021]"
            >
              <Sparkles className="h-4 w-4" />
              Sobre nós
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              Mais do que música: <span className="text-[#F4C021]">propósito, missão e história</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-2xl text-lg leading-8 text-white/85"
            >
              {textoResumo}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => setMostrarTextoCompleto((prev) => !prev)}
                className="rounded-full bg-[#F4C021] px-6 py-3 font-semibold text-[#061B5C] transition hover:scale-[1.02]"
              >
                {mostrarTextoCompleto ? "Ver menos" : "Nos conheça melhor"}
              </button>

              <button
                onClick={alternarMusica}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
              >
                {tocando ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {tocando ? "Pausar música" : "Ouvir música"}
              </button>

              <button
                onClick={() => setMutado((prev) => !prev)}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 transition hover:bg-white/10"
                aria-label={mutado ? "Ativar som" : "Silenciar som"}
              >
                {mutado ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </motion.div>

            <AnimatePresence>
              {mostrarTextoCompleto && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="leading-8 text-white/85">{textoCompleto}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-yellow-300/20 to-blue-400/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={fotos[fotoAtiva]}
                    src={fotos[fotoAtiva]}
                    alt="Fotos do Lúminuss"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-[#04184d]/85 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-[#F4C021]">
                      Lúminuss
                    </p>
                    <p className="mt-2 max-w-xs text-sm text-white/85">
                      Uma jornada de louvor, excelência e esperança construída em equipe.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fotoAnterior}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={proximaFoto}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 transition hover:bg-white/20"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {fotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setFotoAtiva(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      fotoAtiva === index ? "w-8 bg-[#F4C021]" : "w-2.5 bg-white/30"
                    }`}
                    aria-label={`Ir para foto ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {destaques.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4C021]/15 text-[#F4C021]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/80">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[#061B5C]/60 p-8">
            <div className="mb-5 flex items-center gap-3 text-[#F4C021]">
              <Quote className="h-6 w-6" />
              <span className="text-sm uppercase tracking-[0.3em]">Essência</span>
            </div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              O que faz o Lúminuss ser especial?
            </h2>
            <p className="mt-5 leading-8 text-white/85">
              Não é apenas a soma das vozes, dos instrumentos ou da organização. É a forma como tudo isso se une com intenção, reverência e carinho. Cada ensaio, cada detalhe técnico e cada canção carregam o compromisso de servir com verdade.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3 text-[#F4C021]">
                <Disc3 className="h-5 w-5" />
                <p className="font-semibold">Curiosidade em destaque</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={curiosidades[curiosidadeAtiva]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 leading-7 text-white/85"
                >
                  {curiosidades[curiosidadeAtiva]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-5">
            {timeline.map((item, index) => (
              <motion.div
                key={item.titulo}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="mb-3 inline-flex rounded-full bg-[#F4C021]/15 px-3 py-1 text-sm font-medium text-[#F4C021]">
                  {item.ano}
                </div>
                <h3 className="text-2xl font-semibold text-white">{item.titulo}</h3>
                <p className="mt-3 leading-7 text-white/80">{item.texto}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.25em] text-[#F4C021]">
            <Star className="h-4 w-4" />
            Galeria viva
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Um pouco da nossa caminhada em imagens
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {fotos.slice(0, 4).map((foto, index) => (
            <motion.div
              key={foto}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={foto}
                  alt={`Foto ${index + 1} do Lúminuss`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04184d]/85 via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#F4C021]">
                    Lúminuss
                  </p>
                  <p className="mt-2 text-sm text-white/85">
                    Memórias de uma missão construída em conjunto.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
