"use client";


import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
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
  Quote,
  Disc3,
  Star,
} from "lucide-react";

const fotos = [
  "/ruhama.jpeg",
  "/jucilene.jpeg",
  "/julia.jpeg",
  "/reginaldo.jpeg",
  "/girls.jpeg",
  "/rejane.jpeg",
  "/guilherme.jpeg",
];
const postsInstagram = [
  {
    usuario: "mluminuss",
    subtitulo: "Ministério musical",
    texto:
      "Louvor, comunhão e missão em cada detalhe. Um pedacinho da nossa caminhada registrado em imagem.",
  },
  {
    usuario: "mluminuss",
    subtitulo: "Memórias especiais",
    texto:
      "Cada foto guarda um capítulo da nossa história, com momentos de união, crescimento e gratidão a Deus.",
  },
  {
    usuario: "mluminuss",
    subtitulo: "Nossa caminhada",
    texto:
      "Entre ensaios, apresentações e amizades, seguimos construindo um ministério com propósito e dedicação.",
  },
  {
    usuario: "mluminuss",
    subtitulo: "Serviço com amor",
    texto:
      "Tudo o que fazemos envolve preparo, carinho e desejo sincero de transmitir esperança através da música.",
  },
  {
    usuario: "mluminuss",
    subtitulo: "Adoração e beleza",
    texto:
      "Mais do que estética, cada detalhe aponta para uma experiência de adoração sensível e significativa.",
  },
  {
    usuario: "mluminuss",
    subtitulo: "Luzes e sons",
    texto:
      "Instrumentos, vozes, apoio técnico e organização se unem para tornar cada apresentação especial.",
  },
  {
    usuario: "mluminuss",
    subtitulo: "Nossa essência",
    texto:
      "Somos um grupo formado por pessoas diferentes, mas com o mesmo desejo de servir e louvar com excelência.",
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
const floresAzuis = [
  { left: "6%", size: 13, delay: 0, duration: 38 },
  { left: "24%", size: 8, delay: 2.5, duration: 42 },
  { left: "72%", size: 11, delay: 1.2, duration: 40 },
  { left: "48%", size: 9, delay: 4, duration: 44 },
  { left: "88%", size: 8, delay: 3, duration: 39 },
  { left: "35%", size: 10, delay: 6, duration: 45 },
  { left: "12%", size: 15, delay: 7.5, duration: 41 },
  { left: "61%", size: 9, delay: 5.2, duration: 43 },
  { left: "80%", size: 8, delay: 8.5, duration: 46 },
  { left: "18%", size: 13, delay: 10, duration: 40 },
  { left: "55%", size: 8, delay: 11.5, duration: 44 },
  { left: "94%", size: 9, delay: 13, duration: 42 },
  { left: "20%", size: 13, delay: 10, duration: 40 },
  { left: "85%", size: 15, delay: 11.5, duration: 44 },
  { left: "90%", size: 9, delay: 13, duration: 42 },
  
];

export default function SobreNosLuminuss() {
  const [fotoAtiva, setFotoAtiva] = useState(0);
  const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState(false);
  const [tocando, setTocando] = useState(false);
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

    audioRef.current
      .play()
      .then(() => {
        setTocando(true);
      })
      .catch(() => {
        console.log("Autoplay bloqueado pelo navegador");
      });
  }
}, []);


  const textoResumo = useMemo(
    () =>
      "O Ministério Lúminuss é um grupo musical da Igreja Adventista do Sétimo Dia Central de Igapó, localizado em Natal - RN. Atuamos em cultos, congressos, eventos especiais e programações em igrejas, levando adoração, mensagem e esperança por meio da música.",
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
        <Link
      href="/"
      className="fixed left-4 top-24 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lg transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-28 md:h-12 md:w-12"
    >
      <FaArrowLeft className="text-sm md:text-lg" />
    </Link>
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        src="/musica-luminuss.mp3"
      />
<section
  className={`relative overflow-hidden border-b border-white/10 pl-7 pt-16 md:pt-0 transition-all duration-700 ${
    mostrarTextoCompleto
      ? "bg-gradient-to-b from-[#065c49] via-[#0b2a7a] to-[#04184d]"
      : ""
  }`}
>
  {/* FUNDO */}
  <div
    className={`absolute inset-0 transition-all duration-700 ${
      mostrarTextoCompleto
        ? "bg-[linear-gradient(180deg,#409dc4_0%,#041b6e_50%,#010a2a_100%)]"
        : "bg-[radial-gradient(circle_at_top_left,rgba(244,192,33,0.22),transparent_25%),radial-gradient(circle_at_80%_20%,rgba(96,165,250,0.22),transparent_25%),linear-gradient(180deg,#061B5C_0%,#04184d_100%)]"
    }`}
  />

  {/* GLOW ORIGINAL */}
  <div className="absolute -left-20 top-16 h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />
  <div className="absolute right-0 top-24 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

<div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
    {floresAzuis.map((flor, i) => (
    <motion.span
      key={i}
      className="absolute -top-10 text-pink-100/90 drop-shadow-[0_0_8px_rgba(255,182,193,0.55)]"
      style={{
        left: flor.left,
        fontSize: `${flor.size}px`,
      }}
      initial={{ y: "-5vh", opacity: 0 }}
      animate={{
        y: "105vh",
        x: [0, 12, -8, 6, -4, 0],
        opacity: [0, 0.85, 0.75, 0],
        rotate: [0, 60, 140, 220],
      }}
      transition={{
        duration: flor.duration,
        delay: flor.delay,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.08, 0.85, 1],
      }}
    >
      🌸
    </motion.span>
  ))}
</div>

  {/* GLOW QUANDO ABRE TEXTO */}
  {mostrarTextoCompleto && (
<div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
  <div className="absolute left-1/4 top-20 h-40 w-40 rounded-full bg-[#F4C021]/20 blur-3xl animate-pulse" />
      <div className="absolute right-10 bottom-20 h-52 w-52 rounded-full bg-blue-400/20 blur-3xl animate-pulse" />
    </div>
  )}

  {/* CONTEÚDO */}
<div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">  
    {/* TODO seu conteúdo continua igual aqui */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#F4C021]"
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
              Mais que um ministério: <span className="text-[#75b5ff]">Uma família em propósito.</span>
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
                className="rounded-full bg-[#6cacff] px-6 py-3 font-semibold text-[#061B5C] transition hover:scale-[1.02]"
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

            </motion.div>

            <AnimatePresence>
  {mostrarTextoCompleto && (
    <motion.div
      initial={{ opacity: 0, height: 0, y: 12 }}
      animate={{ opacity: 1, height: "auto", y: 0 }}
      exit={{ opacity: 0, height: 0, y: 12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.28)] backdrop-blur-md"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F4C021]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#7589ff]/25 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4C021]/15 text-[#F4C021]">
            <Music2 className="h-5 w-5" />
          </div>

          <div>
            <h3 className="mt-1 text-lg font-bold text-white">
              O ano era 1990...
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-sm leading-7 text-white/85">
          <p>
            O Lúminuss nasceu do desejo de servir a Deus com excelência,
            sensibilidade e propósito.
          </p>

          <p>
            Com o tempo, entendemos que nosso papel vai além das vozes,
            dos instrumentos e da técnica. Cada apresentação é uma
            oportunidade de acolher, inspirar e transmitir esperança.
          </p>

          <p>
            Somos pessoas diferentes, com dons diferentes, mas unidas pelo
            mesmo desejo: transformar cada canção em uma experiência de
            adoração.
          </p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mx-auto w-full max-w-[430px]"
          >
            <div className="absolute left-1/2 top-6 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-300/10 blur-3xl" />
                {/* celular */}
            <div className="relative mx-auto w-[230px] rounded-[2.4rem] border-4 border-[#b433c0] bg-[#111] p-2 shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
  <div className="relative overflow-hidden rounded-[2rem] bg-[#ececec]">
    <div className="absolute left-1/2 top-3 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

    <div className="relative h-[460px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={fotos[fotoAtiva]}
          initial={{ opacity: 0.18, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.18, x: -30 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0">
            <img
              src={fotos[fotoAtiva]}
              alt="Foto do Instagram do Lúminuss"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

          <div className="absolute inset-x-0 top-0 z-10 bg-white/92 px-3 pb-2 pt-8 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#061B5C]/60">
                  Instagram
                </p>
                <p className="mt-1 text-xs font-semibold text-[#061B5C]">
                  @mluminuss
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#F4C021]" />
                <div className="h-2 w-2 rounded-full bg-[#061B5C]/25" />
                <div className="h-2 w-2 rounded-full bg-[#061B5C]/25" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-3 bottom-16 z-20 rounded-[1.3rem] border border-white/40 bg-white/88 p-3 text-[#061B5C] shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[#F4C021]/40">
                <img
                  src="/logo.jpeg"
                  alt="Perfil do Lúminuss"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                      <p className="text-xs font-semibold">{postsInstagram[fotoAtiva].usuario}</p>
                      <p className="text-[10px] text-[#061B5C]/65">
                        {postsInstagram[fotoAtiva].subtitulo}
                      </p>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#061B5C]/85">
                    {postsInstagram[fotoAtiva].texto}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[10px] text-[#061B5C]/60">
                    <span>❤️ Curtidas e comentários</span>
                    <span>#{fotoAtiva + 1}</span>
                  </div>
                </div>

                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-white/92 px-4 py-3 backdrop-blur-sm">
                      <button className="text-xs font-semibold text-[#061B5C] opacity-80">
                        Início
                      </button>
                      <button className="rounded-full bg-[#061B5C] px-4 py-1.5 text-xs font-semibold text-[#F4C021] shadow-sm">
                        Ver
                      </button>
                      <button className="text-xs font-semibold text-[#061B5C] opacity-80">
                        Perfil
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={fotoAnterior}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
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

              <button
                onClick={proximaFoto}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
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
    </main>
  );
}
