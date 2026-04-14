"use client";

import { useEffect, useState } from "react";

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

export default function AdminPage() {
  const [codigoAdmin, setCodigoAdmin] = useState("");
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [erro, setErro] = useState("");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [abertos, setAbertos] = useState<{ [key: string]: boolean }>({});
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
      
      const ultimos = data.slice(-50).reverse();
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

  const agendamentosFiltrados = agendamentos.filter((item) => {
    if (filtroStatus === "todos") return true;
    return item.status?.toLowerCase().trim() === filtroStatus;
  });
  

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

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFiltroStatus("todos")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "todos"
                ? "bg-white text-[#061B5C]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => setFiltroStatus("pendente")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "pendente"
                ? "bg-yellow-400 text-[#061B5C]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Pendentes
          </button>

          <button
            onClick={() => setFiltroStatus("aceito")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "aceito"
                ? "bg-green-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Aceitos
          </button>

          <button
            onClick={() => setFiltroStatus("recusado")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "recusado"
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Recusados
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
            {agendamentosFiltrados.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur"
              >
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
                    <p className="mt-0.5 text-sm font-medium">{item.whatsapp || "-"}</p>
                  </div>

                  <div className="rounded-xl bg-black/20 p-3">
                    <p className="text-xs text-white/60">Local</p>
                    <p className="mt-0.5 text-sm font-medium">{item.local || "-"}</p>
                  </div>

                  <div className="rounded-xl bg-black/20 p-3">
                    <p className="text-xs text-white/60">Data</p>
                    <p className="mt-0.5 text-sm font-medium">{item.data || "-"}</p>
                  </div>

                  <div className="rounded-xl bg-black/20 p-3">
                    <p className="text-xs text-white/60">Hora</p>
                    <p className="mt-0.5 text-sm font-medium">{item.hora || "-"}</p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl bg-black/20 p-2.5">
                <p className="text-xs text-white/60">Observações</p>

                {(() => {
                    const texto = item.observacoes?.trim() || "Sem observações.";
                    const limite = 60;
                    const expandido = abertos[item.id];
                    const precisaBotao = texto.length > limite;

                    return (
                    <>
                        <p className="mt-1 whitespace-pre-line leading-5 text-white/90">
                        {expandido || !precisaBotao ? texto : `${texto.slice(0, limite)}...`}
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
                    </>
                    );
                })()}
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}