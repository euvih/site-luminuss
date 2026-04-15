"use client";

import { useEffect, useMemo, useState } from "react";

type Agendamento = {
  id: string;
  codigo: string;
  igreja: string;
  responsavel: string;
  whatsapp: string;
  local: string;
  data: string;
  hora: string;
  observacoes: string;
  status: string;
};

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

function converterDataParaDate(data: string) {
  if (!data) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    const date = new Date(`${data}T00:00:00`);
    return isNaN(date.getTime()) ? null : date;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
    const [dia, mes, ano] = data.split("/");
    const date = new Date(`${ano}-${mes}-${dia}T00:00:00`);
    return isNaN(date.getTime()) ? null : date;
  }

  const tentativa = new Date(data);
  return isNaN(tentativa.getTime()) ? null : tentativa;
}

function calcularDiasRestantes(data: string) {
  const dataEvento = converterDataParaDate(data);
  if (!dataEvento) return null;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const evento = new Date(dataEvento);
  evento.setHours(0, 0, 0, 0);

  const diff = evento.getTime() - hoje.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function textoTempoRestante(data: string) {
  const dias = calcularDiasRestantes(data);

  if (dias === null) return "Data inválida";
  if (dias < 0) return `Atrasado há ${Math.abs(dias)} dia${Math.abs(dias) === 1 ? "" : "s"}`;
  if (dias === 0) return "É hoje";
  if (dias === 1) return "Falta 1 dia";
  return `Faltam ${dias} dias`;
}

function classesUrgencia(data: string) {
  const dias = calcularDiasRestantes(data);

  if (dias === null) {
    return "border-white/10";
  }

  if (dias < 0) {
    return "border-red-500/50 ring-1 ring-red-500/30";
  }

  if (dias <= 3) {
    return "border-red-400/50 ring-1 ring-red-400/30";
  }

  if (dias <= 7) {
    return "border-yellow-400/50 ring-1 ring-yellow-400/30";
  }

  return "border-white/10";
}

export default function AdminPage() {
  const [codigoAdmin, setCodigoAdmin] = useState("");
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [erro, setErro] = useState("");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [abertos, setAbertos] = useState<{ [key: string]: boolean }>({});
  const [busca, setBusca] = useState("");
  const totalTodos = agendamentos.length;

const totalPendentes = agendamentos.filter(
  (item) => item.status?.toLowerCase().trim() === "pendente"
).length;

const totalAceitos = agendamentos.filter(
  (item) => item.status?.toLowerCase().trim() === "aceito"
).length;

const totalRecusados = agendamentos.filter(
  (item) => item.status?.toLowerCase().trim() === "recusado"
).length;
  const CODIGO_CORRETO = "LUMADMIN2026";
  const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbzfBROjxwP4NMc4TaHmEs9OFDwdEqy8rwzbU1DjtlbXsYAUCMAwFEuTiz4jMSr7H6tIBQ/exec";
  const URL_OPENSHEET =
    "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/agendamentos";

  function entrarNoPainel(e: React.FormEvent) {
    e.preventDefault();

    if (codigoAdmin.trim() === CODIGO_CORRETO) {
      setAcessoLiberado(true);
      setErro("");
    } else {
      setErro("Código incorreto.");
    }
  }

  async function carregarPedidos() {
    setLoading(true);

    try {
      const resposta = await fetch(URL_OPENSHEET);
      const data = await resposta.json();

      if (!Array.isArray(data)) {
        console.error("A resposta não veio como lista:", data);
        setAgendamentos([]);
        setLoading(false);
        return;
      }

      const ultimos = data.slice(-200).reverse();
      setAgendamentos(ultimos);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      setAgendamentos([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!acessoLiberado) return;
    carregarPedidos();
  }, [acessoLiberado]);

  async function atualizarStatus(id: string, novoStatus: string) {
    if (novoStatus === "recusado") {
      const confirmado = window.confirm(
        "Tem certeza que deseja recusar este agendamento?"
      );

      if (!confirmado) return;
    }

    setAtualizandoId(id);

    try {
      const resposta = await fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify({
          acao: "atualizarStatus",
          id,
          status: novoStatus,
        }),
      });

      const resultado = await resposta.json();

      if (!resultado.ok) {
        alert(
          `Erro ao atualizar status.\n\n${resultado.error || "Erro desconhecido"}`
        );
        setAtualizandoId(null);
        return;
      }

      setAgendamentos((prev) =>
        prev.map((item) =>
          String(item.id) === String(id)
            ? { ...item, status: novoStatus }
            : item
        )
      );

      setAtualizandoId(null);
    } catch (erro) {
      console.error("Erro ao atualizar status:", erro);
      alert("Erro ao atualizar status.");
      setAtualizandoId(null);
    }
  }

  function toggleObservacao(id: string) {
    setAbertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const agendamentosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return agendamentos
      .filter((item) => {
        if (filtroStatus !== "todos") {
          if (item.status?.toLowerCase().trim() !== filtroStatus) return false;
        }

        if (!termo) return true;

        const textoCompleto = [
          item.igreja,
          item.responsavel,
          item.codigo,
          item.local,
          item.whatsapp,
          item.data,
        ]
          .join(" ")
          .toLowerCase();

        return textoCompleto.includes(termo);
      })
      .sort((a, b) => {
        const dataA = converterDataParaDate(a.data);
        const dataB = converterDataParaDate(b.data);

        if (!dataA && !dataB) return 0;
        if (!dataA) return 1;
        if (!dataB) return -1;

        return dataA.getTime() - dataB.getTime();
      });
  }, [agendamentos, filtroStatus, busca]);

  if (!acessoLiberado) {
    return (
      <main className="min-h-screen bg-[#061B5C] px-6 py-24 text-white">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur">
          <div className="mb-6">
            <p className="text-sm text-white/60">Acesso restrito</p>
          </div>

          <form onSubmit={entrarNoPainel} className="mt-8 grid gap-4">
            <input
              type="password"
              value={codigoAdmin}
              onChange={(e) => setCodigoAdmin(e.target.value)}
              placeholder="Código do administrador"
              className="rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/50"
            />

            <button
              type="submit"
              className="rounded-xl bg-white py-3 font-semibold text-[#061B5C]"
            >
              Entrar
            </button>
          </form>

          {erro && (
            <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
              {erro}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Painel admin
          </p>
          <h1 className="text-4xl font-bold">Todos os agendamentos</h1>
          <p className="mt-4 text-white/80">
            Visualização completa dos pedidos enviados pelo site.
          </p>
        </div>

        <div className="mb-5">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por igreja, responsável, código, local, WhatsApp..."
            className="w-full rounded-2xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/50"
          />
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
  {/* TODOS */}
  <button
    onClick={() => setFiltroStatus("todos")}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      filtroStatus === "todos"
        ? "bg-white text-[#061B5C]"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    Todos
    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white text-[#061B5C] px-2 text-xs font-bold">
      {totalTodos}
    </span>
  </button>

  {/* PENDENTES */}
  <button
    onClick={() => setFiltroStatus("pendente")}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      filtroStatus === "pendente"
        ? "bg-yellow-400 text-[#061B5C]"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    Pendentes
    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-yellow-400 text-[#061B5C] px-2 text-xs font-bold">
      {totalPendentes}
    </span>
  </button>

  {/* ACEITOS */}
  <button
    onClick={() => setFiltroStatus("aceito")}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      filtroStatus === "aceito"
        ? "bg-green-500 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    Aceitos
    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-green-500 text-white px-2 text-xs font-bold">
      {totalAceitos}
    </span>
  </button>

  {/* RECUSADOS */}
  <button
    onClick={() => setFiltroStatus("recusado")}
    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      filtroStatus === "recusado"
        ? "bg-red-500 text-white"
        : "bg-white/10 text-white hover:bg-white/20"
    }`}
  >
    Recusados
    <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 text-white px-2 text-xs font-bold">
      {totalRecusados}
    </span>
  </button>
</div>

        {loading ? (
          <p className="text-center text-white/80">Carregando pedidos...</p>
        ) : agendamentosFiltrados.length === 0 ? (
          <p className="text-center text-white/80">
            Nenhum pedido encontrado.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {agendamentosFiltrados.map((item) => {
              const tempoRestante = textoTempoRestante(item.data);
              const bordaUrgencia = classesUrgencia(item.data);
              const texto = item.observacoes?.trim() || "Sem observações.";
              const limite = 60;
              const expandido = abertos[item.id];
              const precisaBotao = texto.length > limite;

              return (
                <div
                  key={item.id}
                  className={`rounded-3xl border bg-white/10 p-3 shadow-lg backdrop-blur ${bordaUrgencia}`}
                >
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/60">
                      {tempoRestante}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#F4C021]">
                        {item.igreja || "Sem igreja"}
                      </h2>
                      <p className="mt-1 text-white/80">
                        Responsável: {item.responsavel || "Não informado"}
                      </p>
                      <p className="mt-1 text-white/70">
                        Código: {item.codigo || "-"}
                      </p>
                    </div>

                    <StatusBadge status={item.status} />
                  </div>

                  <div className="mt-1 grid grid-cols-2 gap-1">
                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-white/60">WhatsApp</p>
                      <p className="mt-0.5 text-sm font-medium">
                        {item.whatsapp || "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-white/60">Local</p>
                      <p className="mt-0.5 text-sm font-medium">
                        {item.local || "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-white/60">Data</p>
                      <p className="mt-0.5 text-sm font-medium">
                        {item.data || "-"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-black/20 p-3">
                      <p className="text-xs text-white/60">Hora</p>
                      <p className="mt-0.5 text-sm font-medium">
                        {item.hora || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-xl bg-black/20 p-2.5">
                    <p className="text-xs text-white/60">Observações</p>

                    <p className="mt-1 whitespace-pre-line leading-5 text-white/90">
                      {expandido || !precisaBotao
                        ? texto
                        : `${texto.slice(0, limite)}...`}
                    </p>

                    {precisaBotao && (
                      <button
                        type="button"
                        onClick={() => toggleObservacao(item.id)}
                        className="mt-1 text-xs font-semibold text-[#F4C021] hover:underline"
                      >
                        {expandido ? "Ver menos" : "Ver mais"}
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.status !== "aceito" && (
                      <button
                        onClick={() => atualizarStatus(String(item.id), "aceito")}
                        disabled={atualizandoId === String(item.id)}
                        className="rounded-xl bg-green-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                      >
                        Aceitar
                      </button>
                    )}

                    {item.status !== "recusado" && (
                      <button
                        onClick={() => atualizarStatus(String(item.id), "recusado")}
                        disabled={atualizandoId === String(item.id)}
                        className="rounded-xl bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                      >
                        Recusar
                      </button>
                    )}

                    {item.status !== "pendente" && (
                      <button
                        onClick={() => atualizarStatus(String(item.id), "pendente")}
                        disabled={atualizandoId === String(item.id)}
                        className="rounded-xl bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-[#061B5C] transition hover:opacity-90 disabled:opacity-50"
                      >
                        Voltar para pendente
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}