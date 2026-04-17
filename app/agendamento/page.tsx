"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

function StatusBadge({ status }: { status: string }) {
  const valor = status?.toLowerCase().trim();

  let classes =
    "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30";
  let texto = "Pendente";

  if (valor === "aceito") {
    classes = "bg-green-500/20 text-green-300 border border-green-400/30";
    texto = "Aceito";
  }

  if (valor === "recusado") {
    classes = "bg-red-500/20 text-red-300 border border-red-400/30";
    texto = "Recusado";
  }
  
  return (
    <span className={`rounded-full px-3 py-1 text-sm font-semibold ${classes}`}>
      {texto}
    </span>
  );
}

export default function AgendamentoPage() {
  const [nome, setNome] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-nome") || "";
  });

  const [local, setLocal] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-local") || "";
  });

  const [data, setData] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-data") || "";
  });

  const [horario, setHorario] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-horario") || "";
  });

  const [telefone, setTelefone] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-telefone") || "";
  });

  const [tipoEvento, setTipoEvento] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-tipoEvento") || "";
  });

  const [detalhes, setDetalhes] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("agendamento-detalhes") || "";
  });

  const [codigoGerado, setCodigoGerado] = useState("");
  const [mostrarCodigo, setMostrarCodigo] = useState(false);

  const [mostrarAcompanhamento, setMostrarAcompanhamento] = useState(false);
  const [codigoConsulta, setCodigoConsulta] = useState("");
  const [pedidoEncontrado, setPedidoEncontrado] = useState<any | null>(null);
  const [erroConsulta, setErroConsulta] = useState("");
  const [loadingConsulta, setLoadingConsulta] = useState(false);

  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState("");

  function gerarCodigoAcompanhamento() {
    const numero = Math.floor(100000 + Math.random() * 900000);
    return `LUM-${numero}`;
  }

  function formatarTelefone(valor: string) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) return numeros;

    if (numeros.length <= 7) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  function limparFormulario() {
    setNome("");
    setLocal("");
    setData("");
    setHorario("");
    setTelefone("");
    setTipoEvento("");
    setDetalhes("");

    localStorage.removeItem("agendamento-nome");
    localStorage.removeItem("agendamento-local");
    localStorage.removeItem("agendamento-data");
    localStorage.removeItem("agendamento-horario");
    localStorage.removeItem("agendamento-telefone");
    localStorage.removeItem("agendamento-tipoEvento");
    localStorage.removeItem("agendamento-detalhes");
  }

  async function enviarAgendamento(e: React.FormEvent) {
    e.preventDefault();

    if (enviando) return;

    setErroEnvio("");
    setMostrarCodigo(false);

    if (!nome || !local || !data || !horario || !telefone || !tipoEvento) {
      setErroEnvio("Preencha todos os campos obrigatórios.");
      return;
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");
    if (telefoneNumeros.length < 10) {
      setErroEnvio("Digite um telefone válido.");
      return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataSelecionada = new Date(data + "T00:00:00");

    if (dataSelecionada < hoje) {
      setErroEnvio("Escolha uma data futura.");
      return;
    }

    setEnviando(true);

    const codigo = gerarCodigoAcompanhamento();

    const dados = {
      codigo,
      igreja: nome,
      responsavel: nome,
      whatsapp: telefone,
      local: local,
      data: data,
      hora: horario,
      observacoes: `Tipo de evento: ${tipoEvento}\nDetalhes: ${detalhes}`,
      status: "pendente",
    };

    try {
      const resposta = await fetch(
        "https://script.google.com/macros/s/AKfycbzfBROjxwP4NMc4TaHmEs9OFDwdEqy8rwzbU1DjtlbXsYAUCMAwFEuTiz4jMSr7H6tIBQ/exec",
        {
          method: "POST",
          body: JSON.stringify(dados),
        }
      );

      const resultado = await resposta.json();

      if (!resultado.ok) {
        setErroEnvio(
          resultado.error || "Não foi possível salvar o agendamento na planilha."
        );
        setEnviando(false);
        return;
      }

      const numero = "5584991319600";

      const mensagem = encodeURIComponent(
        `Olá! Gostaria de solicitar um agendamento.\n\n` +
          `Código de acompanhamento: ${codigo}\n` +
          `Nome: ${nome}\n` +
          `Telefone: ${telefone}\n` +
          `Local do evento: ${local}\n` +
          `Data: ${data}\n` +
          `Horário: ${horario}\n` +
          `Tipo de evento: ${tipoEvento}\n` +
          `Detalhes: ${detalhes}`
      );

      setCodigoGerado(codigo);
      setMostrarCodigo(true);

      window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
      limparFormulario();
      setEnviando(false);
    } catch (erro) {
      console.error("Erro ao enviar agendamento:", erro);
      setErroEnvio("Erro ao enviar agendamento.");
      setEnviando(false);
    }
  }

  async function consultarPedido() {
    setErroConsulta("");
    setPedidoEncontrado(null);
    setLoadingConsulta(true);

    try {
      const resposta = await fetch(
        "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/agendamentos"
      );

      const data = await resposta.json();

      if (!Array.isArray(data)) {
        setErroConsulta("Não foi possível carregar os pedidos.");
        setLoadingConsulta(false);
        return;
      }

      const encontrado = data.find(
        (item) =>
          item.codigo?.toLowerCase().trim() ===
          codigoConsulta.toLowerCase().trim()
      );

      if (!encontrado) {
        setErroConsulta("Nenhum pedido encontrado com esse código.");
        setLoadingConsulta(false);
        return;
      }

      setPedidoEncontrado(encontrado);
      setLoadingConsulta(false);
    } catch (err) {
      console.error(err);
      setErroConsulta("Erro ao buscar pedido.");
      setLoadingConsulta(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("agendamento-nome", nome);
    localStorage.setItem("agendamento-local", local);
    localStorage.setItem("agendamento-data", data);
    localStorage.setItem("agendamento-horario", horario);
    localStorage.setItem("agendamento-telefone", telefone);
    localStorage.setItem("agendamento-tipoEvento", tipoEvento);
    localStorage.setItem("agendamento-detalhes", detalhes);
  }, [nome, local, data, horario, telefone, tipoEvento, detalhes]);

  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-8 text-white flex justify-center">
       <Link
      href="/"
      className="fixed left-4 top-24 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lg transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-28 md:h-12 md:w-12"
    >
      <FaArrowLeft className="text-sm md:text-lg" />
    </Link>

      <div className="w-full max-w-[1400px] scale-[0.92] origin-top">
        <main className="relative min-h-screen overflow-hidden text-white">
          <section className="relative z-10 flex min-h-screen pt-20">
            <div className="grid w-full grid-cols-1 lg:grid-cols-2">
              <div className="order =-1 flex h-full flex-col justify-center bg-[#061B5C] px-8 py-10 lg:border-r lg:border-white/10 lg:px-10">
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
                        confirmar o convite e alinhar os detalhes do
                        convite, ou então poderá ACOMPANHAR o status do pedido utilizando o CÓDIGO de acompanhamento gerado no botão "Acompanhar pedido"
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
                    </div>

                    <div className="mt-6 flex justify-center">
                      <button
                        type="button"
                        onClick={() =>
                          setMostrarAcompanhamento((prev) => !prev)
                        }
                        className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white hover:text-[#061B5C]"
                      >
                        Acompanhar pedido
                      </button>
                    </div>

                    {mostrarAcompanhamento && (
                      <div className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                        <p className="mb-3 text-sm text-white/80">
                          Digite seu código de acompanhamento
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <input
                            type="text"
                            value={codigoConsulta}
                            onChange={(e) => setCodigoConsulta(e.target.value)}
                            placeholder="Ex: LUM-482731"
                            className="flex-1 rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/50"
                          />

                          <button
                            type="button"
                            onClick={consultarPedido}
                            className="rounded-xl bg-white px-5 py-3 font-semibold text-[#061B5C]"
                          >
                            Consultar
                          </button>
                        </div>

                        {loadingConsulta && (
                          <p className="mt-4 text-sm text-white/70">
                            Buscando pedido...
                          </p>
                        )}

                        {erroConsulta && (
                          <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
                            {erroConsulta}
                          </div>
                        )}

                        {pedidoEncontrado && (
                          <div className="mt-5 rounded-2xl bg-black/20 p-4">
                            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-[#F4C021]">
                                  {pedidoEncontrado.igreja || "Sem igreja"}
                                </h3>
                                <p className="mt-1 text-white/80">
                                  Responsável:{" "}
                                  {pedidoEncontrado.responsavel ||
                                    "Não informado"}
                                </p>
                                <p className="mt-1 text-white/70">
                                  Código: {pedidoEncontrado.codigo}
                                </p>
                              </div>

                              <StatusBadge status={pedidoEncontrado.status} />
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-2">
                              <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-sm text-white/60">Local</p>
                                <p className="mt-1 font-medium">
                                  {pedidoEncontrado.local || "-"}
                                </p>
                              </div>

                              <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-sm text-white/60">Data</p>
                                <p className="mt-1 font-medium">
                                  {pedidoEncontrado.data || "-"}
                                </p>
                              </div>

                              <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-sm text-white/60">Hora</p>
                                <p className="mt-1 font-medium">
                                  {pedidoEncontrado.hora || "-"}
                                </p>
                              </div>

                              <div className="rounded-2xl bg-black/20 p-4">
                                <p className="text-sm text-white/60">WhatsApp</p>
                                <p className="mt-1 font-medium">
                                  {pedidoEncontrado.whatsapp || "-"}
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 rounded-2xl bg-black/20 p-4">
                              <p className="text-sm text-white/60">
                                Observações
                              </p>
                              <p className="mt-1 whitespace-pre-line leading-7 text-white/90">
                                {pedidoEncontrado.observacoes ||
                                  "Sem observações."}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative flex h-full flex-col justify-center overflow-hidden px-8 py-10 lg:px-10">
                <Image
                  src="/img3.jpeg"
                  alt="Fundo agendamento"
                  fill
                  className="object-cover opacity-30"
                  priority
                />

                <div className="absolute inset-0 bg-black/70" />

                <div className="order-2 relative z-10 mx-auto w-full max-w-xl">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bold text-white">
                      Agendamento
                    </h1>
                    <p className="mt-1 text-sm text-white/80">
                      Preencha o formulário para solicitar um agendamento.
                    </p>
                  </div>

                  {mostrarCodigo && (
                    <div className="mb-6 rounded-2xl border border-green-400/30 bg-green-500/10 p-4 text-green-100">
                      <p className="text-sm">Agendamento enviado com sucesso.</p>
                      <p className="mt-2 text-lg font-bold">
                        Código de acompanhamento: {codigoGerado}
                      </p>
                      <p className="mt-2 text-sm text-green-100/80">
                        Guarde esse código para acompanhar o status do seu pedido no site.
                      </p>
                    </div>
                  )}

                  {erroEnvio && (
                    <div className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
                      {erroEnvio}
                    </div>
                  )}

                  <form onSubmit={enviarAgendamento} className="grid gap-3">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                      required
                    />

                    <input
                      type="text"
                      placeholder="Local do evento"
                      value={local}
                      onChange={(e) => setLocal(e.target.value)}
                      className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                      required
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className="rounded-xl bg-white/10 px-4 py-3 outline-none"
                        required
                      />

                      <input
                        type="time"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        className="rounded-xl bg-white/10 px-4 py-3 outline-none"
                        required
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
                        onChange={(e) => setTelefone(formatarTelefone(e.target.value))}
                        className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                        required
                      />

                      <select
                        value={tipoEvento}
                        onChange={(e) => setTipoEvento(e.target.value)}
                        className="rounded-xl bg-white/10 px-4 py-3 text-white outline-none"
                        required
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
                      onChange={(e) => setDetalhes(e.target.value.slice(0, 600))}
                      className="resize-none rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/60"
                    />

                    <p className="text-right text-xs text-white/60">
                      {detalhes.length}/600
                    </p>

                    <button
                      type="submit"
                      disabled={enviando}
                      className="mt-2 rounded-xl bg-white py-3 font-semibold text-[#061B5C] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {enviando ? "Enviando..." : "Enviar agendamento"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </main>
  );
}