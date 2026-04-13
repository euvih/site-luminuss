"use client";

import Image from "next/image";
import { useState } from "react";

export default function AgendamentoPage() {
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [detalhes, setDetalhes] = useState("");

  function enviarParaWhatsApp(e: React.FormEvent) {
    e.preventDefault();

    const numero = "5584991319600"; 

    const mensagem = encodeURIComponent(
      `Olá! Gostaria de solicitar um agendamento.\n\n` +
        `Nome: ${nome}\n` +
        `Telefone: ${telefone}\n` +
        `Local do evento: ${local}\n` +
        `Data: ${data}\n` +
        `Horário: ${horario}\n` +
        `Tipo de evento: ${tipoEvento}\n` +
        `Detalhes: ${detalhes}`
    );

    const link = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(link, "_blank");
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <Image
        src="/img3.jpg"
        alt="Fundo agendamento"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/50" />

      <section className="relative z-10 flex min-h-screen pt-20">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2">
          <div className="flex h-full flex-col justify-center bg-black/70 px-8 py-10 lg:px-10">
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white">
                  Agendamento
                </h1>
                <p className="mt-1 text-sm text-white/80">
                  Preencha o formulário para solicitar um agendamento.
                </p>
              </div>

              <form onSubmit={enviarParaWhatsApp} className="grid gap-3">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                />

                <input
                  type="text"
                  placeholder="Local do evento"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    className="rounded-xl bg-white/10 px-4 py-3 outline-none"
                  />

                  <input
                    type="time"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="rounded-xl bg-white/10 px-4 py-3 outline-none"
                  />
                </div>

                <p className="text-xs leading-relaxed text-yellow-200">
                  Observação: considerar a presença de alguém no local com 1h30
                  de antecedência para organização do som, instrumentos e
                  passagem de som.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                  />

                  <select
                    value={tipoEvento}
                    onChange={(e) => setTipoEvento(e.target.value)}
                    className="rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
                  >
                    <option value="" className="text-black">
                      Tipo de evento
                    </option>
                    <option value="Culto" className="text-black">
                      Culto
                    </option>
                    <option value="Congresso" className="text-black">
                      Congresso
                    </option>
                    <option value="Convenção" className="text-black">
                      Convenção
                    </option>
                    <option value="Recital" className="text-black">
                      Recital
                    </option>
                    <option value="Outros" className="text-black">
                      Outros
                    </option>
                  </select>
                </div>

                <textarea
                  rows={3}
                  placeholder="Detalhes do evento"
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                  className="resize-none rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                />

                <button
                  type="submit"
                  className="mt-2 rounded-xl bg-white py-3 font-semibold text-[#061B5C] transition hover:opacity-90"
                >
                  Enviar pelo WhatsApp
                </button>
              </form>
            </div>
          </div>

          <div className="flex h-full flex-col justify-center bg-[#061B5C] px-8 py-10 lg:border-l lg:border-white/10 lg:px-10">
            <div className="mx-auto w-full max-w-xl">
              <h2 className="text-3xl font-bold text-[#F4C021]">
                Informações importantes
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-relaxed text-white/90">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Sobre o agendamento
                  </h3>
                  <p>
                    Após o envio do formulário, entraremos em contato para
                    confirmar a disponibilidade da data e alinhar os detalhes do
                    convite.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Horário
                  </h3>
                  <p>
                    Ao definir o horário da apresentação, considere a
                    necessidade de chegada antecipada da equipe para organização
                    do som, instrumentos e passagem de som.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Locais mais distantes
                  </h3>
                  <p>
                    Para convites em locais mais distantes, é importante
                    considerar suportes como transporte, alimentação e outros
                    detalhes logísticos necessários para a participação da
                    equipe.
                  </p>
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    Informações importantes
                  </h3>
                  <p>
                    Quanto mais detalhes forem informados no formulário, mais
                    fácil será organizar e responder ao seu convite.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}