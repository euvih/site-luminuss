"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { categorias } from "./dados/integrantes";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

type Pedido = {
  igreja: string;
  responsavel: string;
  whatsapp: string;
  local: string;
  data: string;
  hora: string;
  observacoes: string;
  status: string;
  aprovado?: string;
};

export default function Home() {
  const [scrollAtivo, setScrollAtivo] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrollAtivo(window.scrollY > 20);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  function parseData(dataString: string) {
    if (!dataString) return null;

    const limpa = dataString.trim().split(" ")[0];

    if (limpa.includes("/")) {
      const [dia, mes, ano] = limpa.split("/");
      if (!dia || !mes || !ano) return null;
      return new Date(Number(ano), Number(mes) - 1, Number(dia));
    }

    if (limpa.includes("-")) {
      const [ano, mes, dia] = limpa.split("-");
      if (!dia || !mes || !ano) return null;
      return new Date(Number(ano), Number(mes) - 1, Number(dia));
    }

    return null;
  }

  function formatarMesAbreviado(data: Date) {
    return data
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", "")
      .toUpperCase();
  }

  function formatarDiaSemana(data: Date) {
    return data.toLocaleDateString("pt-BR", { weekday: "long" });
  }

  const [menuAberto, setMenuAberto] = useState(false);
  const [form, setForm] = useState({
    igreja: "",
    responsavel: "",
    whatsapp: "",
    local: "",
    data: "",
    hora: "",
    observacoes: "",
  });

  const pathname = usePathname();
  const esconderHeaderMobile = pathname === "/recital";
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [mostrarMaisFotos, setMostrarMaisFotos] = useState(false);
  const [agenda, setAgenda] = useState<any[]>([]);
  const botaoSobreRef = useRef<HTMLDivElement | null>(null);
  const [animarBotaoSobre, setAnimarBotaoSobre] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const resposta = await fetch(
        "https://script.google.com/macros/s/AKfycbwVh2XcV89W9QxNPaqWDBKaQAoDR0c6swKxFWImBee2jW_nGFUegIebi94SiB-T7w9x/exec",
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      const data = await resposta.json();

      if (data.ok) {
        alert("Solicitação enviada com sucesso!");

        setForm({
          igreja: "",
          responsavel: "",
          whatsapp: "",
          local: "",
          data: "",
          hora: "",
          observacoes: "",
        });
      } else {
        alert("Não foi possível enviar a solicitação.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Erro ao enviar solicitação.");
    }
  }

  const fotos = [
    "/ftantiga1.jpeg",
    "/ftantiga2.jpeg",
    "/ftantiga3.jpeg",
    "/auroraboreal.webp",
    "/logo.jpeg",
    "/foto6.jpeg",
  ];

  useEffect(() => {
    fetch(
    "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/agendamentos"
)      .then((res) => res.json())
      .then((data) => {
        console.log("Dados da planilha:", data);
        console.log("Primeiro item recebido:", data?.[0]);

        if (!Array.isArray(data)) {
          console.error("A resposta não veio como lista:", data);
          setAgenda([]);
          return;
        }

        const hoje = new Date();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();

const aceitosDoMes = data
  .filter((item) => {
    const status = item.status?.toLowerCase().trim();
    const aprovado = item.aprovado?.toLowerCase().trim();

    return status === "aceito" || aprovado === "sim";
  })
  .map((item) => {
    const dataConvertida = parseData(item.data);

    return {
      ...item,
      dataConvertida,
    };
  })
  .filter(
    (item) =>
      item.dataConvertida &&
      item.dataConvertida.getMonth() === mesAtual &&
      item.dataConvertida.getFullYear() === anoAtual
  )
  .sort(
    (a, b) =>
      a.dataConvertida.getTime() - b.dataConvertida.getTime()
  );

        setAgenda(aceitosDoMes);
      })
      .catch((err) => {
        console.error("Erro ao carregar agenda:", err);
        setAgenda([]);
      });
  }, []);

  useEffect(() => {
    const botao = botaoSobreRef.current;
    if (!botao) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile) return;

    let jaAnimou = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !jaAnimou) {
          jaAnimou = true;
          setAnimarBotaoSobre(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.6,
      }
    );

    observer.observe(botao);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-[#061B5C]">
      

      <section
        id="inicio"
        className="relative min-h-screen overflow-hidden bg-[#061B5C] pt-[140px] text-white md:pt-[89px]"
      > 
        <div className="relative z-10 grid min-h-[calc(100vh-89px)] grid-cols-1 md:grid-cols-2">
          <div className="flex items-center px-6 md:px-16">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
                Ministério
              </p>

              <h1 className=" mb-6 text-5xl font-bold leading-tight text-[#f0f6ff] drop-shadow-[0_0_8px_#3b82f6] transition duration-300 hover:text-[#28bbf5] hover:drop-shadow-[0_0_30px_#60a5fa] md:text-6xl">
                Lúminuss
              </h1>

              <p className="mb-8 max-w-xl text-base leading-8 text-white/90">
  Levando louvor, adoração e mensagens de esperança às igrejas por
  meio da música.
</p>

              <div className="flex flex-col items-start gap-4">
                <Link
                  href="/agendamento"
                  className="rounded-full bg-[#e9ebfc] px-4 py-2 font-semibold text-[#061B5C] transition hover:scale-105"
                >
                  Solicitar agendamento
                </Link>

                <a
                  href="#sobre"
                  className="rounded-full border border-white px-4 py-2 font-semibold text-white transition hover:bg-white hover:text-[#061B5C]"
                >
                  Conhecer o grupo
                </a>

                <div className="ml-2 flex items-center gap-3">
                  <a
                    href="https://instagram.com/mluminuss/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white/80 transition hover:text-pink-400"
                  >
                    <FaInstagram size={30} />
                  </a>

                  <a
                    href="https://www.youtube.com/@ministerioluminuss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white/80 transition hover:text-red-500"
                  >
                    <FaYoutube size={30} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-5 w-full overflow-hidden md:mt-0 md:h-full">
            <img
              src="/img1.png"
              alt="Grupo Lúminuss"
              className="block h-full w-full object-cover md:object-bottom"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="pointer-events-none absolute inset-0 md:hidden">
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#061B5C] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#061B5C] to-transparent" />
              <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#061B5C] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#061B5C] to-transparent" />
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-[#061B5C] via-[#3b82f6]/30 to-transparent md:block md:w-56" />
          </div>
        </div>
      </section>

      <section
  id="agenda"
  className="scroll-mt-24 bg-[#ebeffc] px-6 py-24 md:min-h-[70vh]"
>
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
              Agenda
            </p>
 

            <h2 className="text-4xl font-bold text-[#061B5C]">
              Agenda do mês
            </h2>
          </div>

          {agenda.length === 0 ? (
            <p className="text-center text-lg text-[#17327e]/80">
              Ainda não há eventos aceitos para este mês.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">              
            {agenda.map((evento, index) => {
                const dataEvento = evento.dataConvertida;
                if (!dataEvento) return null;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-5 rounded-2xl border border-[#e3e8f5] bg-white px-5 py-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="min-w-[58px] text-center leading-none">
                      <p className="text-4xl font-light text-[#7d8fb3]">
                        {dataEvento.getDate()}
                      </p>
                      <p className="mt-1 text-sm uppercase tracking-wide text-[#8ea0bf]">
                        {formatarMesAbreviado(dataEvento)}
                      </p>
                    </div>

                    <div className="flex-1">
                      <p className="text-xl font-semibold text-[#0053a6]">
                        {evento.local || "Local não informado"}
                      </p>

                      <p className="mt-2 text-lg text-[#3f4f6a]">
                        {formatarDiaSemana(dataEvento)},{" "}
                        {evento.hora || "Horário a definir"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section
        id="sobre"
        className="bg-[#d7e0ff] px-6 py-20 min-h-[80vh] md:min-h-screen flex items-center justify-center"
      >
        <div className="mx-auto max-w-5xl text-center px-4 space-y-6">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#d4a106]">
            Sobre o grupo
          </p>
          <h2 className="mb-6 text-4xl font-bold">Quem somos</h2>

          <div className="mt-10" ref={botaoSobreRef}>
            <Link
              href="/sobre"
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#061B5C] px-6 py-3 font-semibold text-white shadow-[0_10px_30px_rgba(6,27,92,0.28)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:bg-[#0a2a8a] hover:shadow-[0_16px_40px_rgba(6,27,92,0.38)] active:scale-[0.98] 
                ${
                animarBotaoSobre ? "animate-[pulse_0.9s_ease-out_1]" : ""
              }`}
            >
              <span
                className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${
                  animarBotaoSobre
                    ? "animate-[brilhoMobile_1.2s_ease-out_1]"
                    : "translate-x-[-120%] group-hover:translate-x-[120%]"
                } transition-transform duration-700`}
              />

              <span className="relative z-10 " >
                Conhecer              
                </span>
            </Link>
          </div>
        </div>
      </section>


      <section
  id="recital"
  className="relative overflow-hidden bg-[#000b3d] px-6 py-24 text-white"
>
  <div className="absolute inset-0">
    <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-[#9b4b8a]/20 blur-3xl" />
    <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-[#4b2c6f]/30 blur-3xl" />
    <div className="absolute bottom-0 left-[30%] h-64 w-64 rounded-full bg-[#c9a3d0]/10 blur-3xl" />
  </div>

  <div className="pointer-events-none absolute inset-0 overflow-hidden">
  <span className="estrela left-[8%] top-[12%] h-[2px] w-[2px]" />
  <span className="estrela left-[18%] top-[24%] h-[3px] w-[3px]" />
  <span className="estrela left-[30%] top-[10%] h-[2px] w-[2px]" />
  <span className="estrela left-[42%] top-[18%] h-[1.5px] w-[1.5px]" />
  <span className="estrela left-[55%] top-[8%] h-[2.5px] w-[2.5px]" />
  <span className="estrela left-[67%] top-[22%] h-[2px] w-[2px]" />
  <span className="estrela left-[78%] top-[14%] h-[3px] w-[3px]" />
  <span className="estrela left-[88%] top-[28%] h-[2px] w-[2px]" />

  <span className="estrela left-[12%] top-[38%] h-[2px] w-[2px]" />
  <span className="estrela left-[24%] top-[46%] h-[3px] w-[3px]" />
  <span className="estrela left-[36%] top-[34%] h-[2px] w-[2px]" />
  <span className="estrela left-[49%] top-[42%] h-[1.5px] w-[1.5px]" />
  <span className="estrela left-[62%] top-[36%] h-[2.5px] w-[2.5px]" />
  <span className="estrela left-[74%] top-[48%] h-[2px] w-[2px]" />
  <span className="estrela left-[84%] top-[40%] h-[3px] w-[3px]" />

  <span className="estrela left-[6%] top-[62%] h-[2px] w-[2px]" />
  <span className="estrela left-[20%] top-[70%] h-[2.5px] w-[2.5px]" />
  <span className="estrela left-[33%] top-[58%] h-[2px] w-[2px]" />
  <span className="estrela left-[46%] top-[76%] h-[3px] w-[3px]" />
  <span className="estrela left-[58%] top-[64%] h-[1.5px] w-[1.5px]" />
  <span className="estrela left-[70%] top-[72%] h-[2px] w-[2px]" />
  <span className="estrela left-[82%] top-[60%] h-[2.5px] w-[2.5px]" />
  <span className="estrela left-[92%] top-[78%] h-[2px] w-[2px]" />
</div>

  <div className="relative mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
    <div>
      <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#dcb0e4]">
        Recital 2026
      </p>

      <h2 className="text-4xl font-bold leading-tight md:text-5xl">
        Lúminuss
        <span className="block bg-gradient-to-r from-[#95a8fd] via-[#f7c7ff] to-[#d9d6e5] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(155,75,138,0.5)]">
          36 ANOS
        </span>
      </h2>

      <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
        O recital anual do Ministério Lúminuss, realizado em comemoração ao
        aniversário do grupo. Em 2026, a temática será{" "}
        <span className="font-semibold text-[#af7dff]">Sonhos</span>
      </p>
    </div>

    <div className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_0_35px_rgba(155,75,138,0.2)] backdrop-blur-md">
        <img
          src="/recital-galaxia.jpeg"
          alt="Recital Lúminuss Galáxia"
          className="h-[420px] w-full rounded-[1.4rem] object-cover"
        />
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-[#070736]/70 via-transparent to-transparent" />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">        
        <Link
          href="/recital"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[#61089c] via-[#951999] to-[#61089c] px-7 py-3 font-semibold text-white shadow-[0_0_30px_rgba(155,75,138,0.35)] transition duration-300 hover:scale-105"
        >
          <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-[120%]" />
          <span className="relative z-10">Sobre o recital</span>
        </Link>
      </div>
    </div>
  </div>
</section>

      <section id="integrantes" className="bg-[#dae3ff] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#e4ab00]">
              Integrantes
            </p>
            <h2 className="text-4xl font-bold">Nossa equipe</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:justify-center md:gap-6">
            {categorias.map((categoria) => (
              <Link
                key={categoria.slug}
                href={`/integrantes/${categoria.slug}`}
                className="flex w-full flex-col items-center justify-center rounded-3xl bg-white p-6 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl md:w-65 md:p-8"              >
                <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-[#061B5C]">
                  {categoria.foto ? (
                    <img
                      src={categoria.foto}
                      alt={categoria.nome}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#F4C021]">
                      {categoria.nome.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="mt-3 text-center text-lg font-semibold leading-tight">
                  {categoria.nome}
                </h3>              
                </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="bg-[#cadaff] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#e9b310]">
              Galeria
            </p>
            <h2 className="text-4xl font-bold">Fazendo história...
              
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fotos
              .slice(0, mostrarMaisFotos ? fotos.length : 3)
              .map((foto, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-3xl shadow-lg"
                >
                  <img
                    src={foto}
                    alt={`Foto ${index + 1} do grupo Lúminuss`}
                    className="h-64 w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              ))}
          </div>

          {fotos.length > 3 && (
            <div className="mt-10 text-center">
              <button
                onClick={() => setMostrarMaisFotos(!mostrarMaisFotos)}
                className="rounded-full bg-[#061B5C] px-6 py-3 font-semibold text-white transition hover:scale-105"
              >
                {mostrarMaisFotos ? "Ver menos" : "Ver mais"}
              </button>
            </div>
          )}
        </div>
      </section>

      <section id="doacoes" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Doações
          </p>
          <h2 className="mb-6 text-4xl font-bold">Ajude este ministério</h2>
          <p className="mb-8 text-lg leading-8 text-[#17327e]">
            Sua contribuição nos ajuda a continuar servindo, investindo em
            equipamentos, transporte e desenvolvimento do ministério.
          </p>

          <div className="rounded-3xl bg-[#061B5C] p-8 text-white shadow-xl">
            <p className="mb-3 text-lg">Chave Pix</p>
            <a
              href="mailto:mluminuss.oficial@gmail.com"
              className="mb-4 block text-center text-lg font-bold break-words text-[#F4C021] hover:underline sm:text-xl md:text-2xl"
            >
              mluminuss.oficial@gmail.com
            </a>
            <p className="text-white/80">QR Code</p>
          </div>
        </div>
      </section>

      <footer className="bg-[#061B5C] px-6 py-8 text-center text-white">
        <p className="text-sm text-white/80">© 2026 Lúminuss</p>

        <p className="mt-1 text-sm text-white/30">
          Desenvolvido com <span className="heart-beat text-red-500">❤️</span>{" "}
          por Vitória Kelly
        </p>
      </footer>
    </main>
  );
}