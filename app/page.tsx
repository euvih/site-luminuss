"use client";

import { useState } from "react";
import Link from "next/link";
import { categorias } from "./dados/integrantes";

type Pedido = {
  igreja: string;
  responsavel: string;
  whatsapp: string;
  local: string;
  data: string;
  hora: string;
  observacoes: string;
  status: string;
};

export default function Home() {
  const [form, setForm] = useState({
    igreja: "",
    responsavel: "",
    whatsapp: "",
    local: "",
    data: "",
    hora: "",
    observacoes: "",
  });
  
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const [mostrarMaisFotos, setMostrarMaisFotos] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const novoPedido: Pedido = {
      ...form,
      status: "Pendente",
    };

    setPedidos([...pedidos, novoPedido]);

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
  }

  function aprovar(index: number) {
    const lista = [...pedidos];
    lista[index].status = "Aprovado";
    setPedidos(lista);
  }

  function recusar(index: number) {
    const lista = pedidos.filter((_, i) => i !== index);
    setPedidos(lista);
  }

  const fotos = [
    "/ftantiga1.jpeg",
    "/ftantiga2.jpeg",
    "/ftantiga3.jpeg",
    "/foto4.jpeg",
    "/foto5.jpeg",
    "/foto6.jpeg",
  ];

  const agenda: { data: string; local: string }[] = [];

  return (
    <main className="bg-white text-[#061B5C]">
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-[#061B5C]/95 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-white">
          <Link href="#inicio" className="flex items-center gap-3">
            <img
              src="/logo.jpeg"
              alt="Logo Lúminuss"
              className="h-12 w-12 rounded-full object-cover cursor-pointer"
            />
            <span className="text-xl font-bold tracking-wide transition duration-300 hover:text-[#F4C021] hover:drop-shadow-[0_0_8px_#F4C021]">
                  Lúminuss
            </span>
          </Link>

          <div className="hidden gap-6 md:flex" >
            <a href="#inicio" className="transition hover:text-[#F4C021] ">
              Início
            </a>
            <a href="#sobre" className="transition hover:text-[#F4C021]">
              Sobre
            </a>
            <a href="#integrantes" className="transition hover:text-[#F4C021]">
              Integrantes
            </a>
            <a href="#galeria" className="transition hover:text-[#F4C021]">
              Galeria
            </a>
            <a href="#doacoes" className="transition hover:text-[#F4C021]">
              Doações
            </a>
          </div>
        </nav> 
      </header>

      <section
  id="inicio"
  className="min-h-screen bg-[#061B5C] pt-21 text-white"
>
  <div className="grid min-h-[calc(100vh-89px)] grid-cols-1 md:grid-cols-2">
    <div className="flex items-center px-6 md:px-16">
      <div>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
          Ministério musical
        </p>

        <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl text-[#f0f6ff] drop-shadow-[0_0_8px_#3b82f6] transition duration-300 hover:text-[#28bbf5] hover:drop-shadow-[0_0_30px_#60a5fa]">
          Lúminuss
        </h1>

        <p className="mb-8 max-w-xl text-lg text-white/90">
          Levando louvor, adoração e mensagens de esperança às igrejas por
          meio da música.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/agendamento"
            className="rounded-full bg-[#e9ebfc] px-6 py-3 font-semibold text-[#061B5C] transition hover:scale-105"
          >
            Solicitar agendamento
          </Link>

          <a
            href="#sobre"
            className="rounded-full border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#061B5C]"
          >
            Conhecer o grupo
          </a>
        </div>
      </div>
    </div>

    <div className="relative w-full overflow-hidden md:h-full">
      <img
        src="/img1.jpeg"
        alt="Grupo Lúminuss"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#061B5C] via-[#3b82f6]/30 to-transparent md:w-56" />
    </div>
  </div>
</section>
<section className="bg-[#f7f9ff] px-6 py-20">
  <div className="mx-auto max-w-4xl text-center">

    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
      Agenda
    </p>

    <h2 className="mb-10 text-4xl font-bold text-[#061B5C]">
      Agenda do mês
    </h2>

    {agenda.length === 0 ? (
      <p className="text-lg text-[#17327e]/80">
        Agenda do mês ainda não definida.
      </p>
    ) : (
      <div className="space-y-4">
        {agenda.map((evento, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-4 shadow-sm"
          >
            <p className="font-semibold text-[#061B5C]">{evento.data}</p>
            <p className="text-[#17327e]">{evento.local}</p>
          </div>
        ))}
      </div>
    )}

  </div>
</section>
      <section id="sobre" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Sobre o grupo
          </p>
          <h2 className="mb-6 text-4xl font-bold">Quem somos</h2>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-[#17327e]">
            O Lúminuss é um grupo musical cristão dedicado a servir a Deus por
            meio da música, participando de cultos, congressos, eventos
            especiais e programações em igrejas. Nosso propósito é transmitir a
            mensagem de Cristo, inspirar vidas e contribuir para momentos de
            adoração sincera.
          </p>
        </div>
      </section>
  
       <section id="integrantes" className="bg-[#f7f9ff] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Integrantes
          </p>
          <h2 className="text-4xl font-bold">Nossa equipe</h2>
      </div>

    <div className="flex flex-wrap justify-center gap-6">
  {categorias.map((categoria) => (
    <Link
  key={categoria.slug}
  href={`/integrantes/${categoria.slug}`}
  className="w-[260px] rounded-3xl bg-white p-8 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#061B5C] text-2xl font-bold text-[#F4C021]">
            {categoria.nome.charAt(0)}
          </div>

          <h3 className="text-2xl font-semibold">{categoria.nome}</h3>
        </Link>
      ))}
    </div>
  </div>
</section>

      <section id="galeria" className="bg-white px-6 py-24">
  <div className="mx-auto max-w-6xl">
      
    <div className="mb-12 text-center">
      
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
        Galeria
      </p>
      <h2 className="text-4xl font-bold">Fazendo história...</h2>
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
            <p className="mb-4 text-2xl font-bold text-[#F4C021]">
              mluminuss.oficial@gmail.com
            </p>
            <p className="text-white/80">
              QR Code
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-[#061B5C] px-6 py-8 text-center text-white">
        <p className="text-sm text-white/80">© 2026 Lúminuss</p>

        <p className="mt-1 text-sm text-white/70">
          Site feito com{" "}
          <span className="heart-beat text-red-500">❤</span>
          {" "}por Vitória Kelly
        </p>
      </footer>

      <a
        href="https://wa.me/5584998512666"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 rounded-full bg-green-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-105"
      >
        WhatsApp
      </a>
    </main>
  );
}