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
  data_envio?: string;
};

type Ordenacao = "data_evento" | "envio_recente" | "pendentes_primeiro";

function formatarDataHora(data: string) {
  if (!data) return "";

  if (data.includes("/")) {
    const [dataParte, horaParte] = data.split(" ");
    const [dia, mes, ano] = dataParte.split("/");

    const iso = `${ano}-${mes}-${dia}T${horaParte || "00:00:00"}`;
    const d = new Date(iso);

    if (isNaN(d.getTime())) return "Data inválida";

    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const d = new Date(data);
  if (isNaN(d.getTime())) return "Data inválida";

  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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

function converterDataEnvioParaDate(data?: string) {
  if (!data) return null;

  if (data.includes("/")) {
    const [dataParte, horaParte = "00:00:00"] = data.split(" ");
    const [dia, mes, ano] = dataParte.split("/");
    const d = new Date(`${ano}-${mes}-${dia}T${horaParte}`);
    return isNaN(d.getTime()) ? null : d;
  }

  const d = new Date(data);
  return isNaN(d.getTime()) ? null : d;
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
  if (dias < 0) return `Há ${Math.abs(dias)} dia${Math.abs(dias) === 1 ? "" : "s"}`;
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
    return "border-white/10 opacity-50 grayscale";
  }

  if (dias <= 3) {
    return "border-red-400/50 ring-1 ring-red-400/30";
  }

  if (dias <= 7) {
    return "border-yellow-400/50 ring-1 ring-yellow-400/30";
  }

  return "border-white/10";
}

function eventoJaPassou(data: string) {
  const dataEvento = converterDataParaDate(data);
  if (!dataEvento) return false;

  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const evento = new Date(dataEvento);
  evento.setHours(0, 0, 0, 0);

  return evento.getTime() < hoje.getTime();
}

function textoVazio(filtroStatus: string, busca: string) {
  if (busca.trim()) {
    return "Nenhum pedido encontrado para essa busca.";
  }

  if (filtroStatus === "pendente") {
    return "Nenhum agendamento pendente encontrado.";
  }

  if (filtroStatus === "aceito") {
    return "Nenhum agendamento aceito encontrado.";
  }

  if (filtroStatus === "recusado") {
    return "Nenhum agendamento recusado encontrado.";
  }

  return "Nenhum pedido encontrado.";
}

function CardAgendamento({
  item,
  abertos,
  toggleObservacao,
  atualizarStatus,
  atualizandoId,
  apagarEvento,
}: {
  item: Agendamento;
  abertos: { [key: string]: boolean };
  toggleObservacao: (id: string) => void;
  atualizarStatus: (id: string, novoStatus: string) => void;
  atualizandoId: string | null;
  apagarEvento: (id: string) => void;
}) {
  const tempoRestante = textoTempoRestante(item.data);
  const bordaUrgencia = classesUrgencia(item.data);
  const texto = item.observacoes?.trim() || "Sem observações.";
  const limite = 60;
  const expandido = abertos[item.id];
  const precisaBotao = texto.length > limite;
  const bloqueado = eventoJaPassou(item.data);
  const salvandoEste = atualizandoId === String(item.id);

  return (
    <div
      className={`rounded-3xl border bg-white/10 p-3 shadow-lg backdrop-blur ${bordaUrgencia} ${
        bloqueado ? "opacity-50 grayscale" : ""
      }`}
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
          <p className="mt-1 text-white/70">Código: {item.codigo || "-"}</p>
          {item.data_envio && (
            <p className="mt-1 text-xs text-white/40">
              Enviado em: {formatarDataHora(item.data_envio)}h
            </p>
          )}
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

        <p className="mt-1 whitespace-pre-line leading-5 text-white/90">
          {expandido || !precisaBotao ? texto : `${texto.slice(0, limite)}...`}
        </p>

        {precisaBotao && (
          <button
            type="button"
            onClick={() => toggleObservacao(item.id)}
            disabled={bloqueado}
            className="mt-1 text-xs font-semibold text-[#F4C021] hover:underline disabled:cursor-not-allowed disabled:opacity-40"
          >
            {expandido ? "Ver menos" : "Ver mais"}
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.status !== "aceito" && (
          <button
            onClick={() => atualizarStatus(String(item.id), "aceito")}
            disabled={salvandoEste || bloqueado}
            className="rounded-xl bg-green-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {salvandoEste ? "Salvando..." : "Aceitar"}
          </button>
        )}

        {item.status !== "recusado" && (
          <button
            onClick={() => atualizarStatus(String(item.id), "recusado")}
            disabled={salvandoEste || bloqueado}
            className="rounded-xl bg-red-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {salvandoEste ? "Salvando..." : "Recusar"}
          </button>
        )}

        {item.status !== "pendente" && (
          <button
            onClick={() => atualizarStatus(String(item.id), "pendente")}
            disabled={salvandoEste || bloqueado}
            className="rounded-xl bg-yellow-500 px-3 py-1.5 text-sm font-semibold text-[#061B5C] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {salvandoEste ? "Salvando..." : "Voltar para pendente"}
          </button>
        )}

        <button
          onClick={() => apagarEvento(String(item.id))}
          disabled={bloqueado || salvandoEste}
          className="rounded-xl bg-white/10 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Apagar
        </button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [mostrarFormularioManual, setMostrarFormularioManual] = useState(false);
  const [salvandoManual, setSalvandoManual] = useState(false);
  const [formManual, setFormManual] = useState({
    igreja: "",
    responsavel: "",
    whatsapp: "",
    local: "",
    data: "",
    hora: "",
    observacoes: "",
    status: "aceito",
  });

  const [codigoAdmin, setCodigoAdmin] = useState("");
  const [acessoLiberado, setAcessoLiberado] = useState(false);
  const [erro, setErro] = useState("");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [atualizandoId, setAtualizandoId] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [abertos, setAbertos] = useState<{ [key: string]: boolean }>({});
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("data_evento");

  const CODIGO_CORRETO = "LUMADMIN2026";
  const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbzfBROjxwP4NMc4TaHmEs9OFDwdEqy8rwzbU1DjtlbXsYAUCMAwFEuTiz4jMSr7H6tIBQ/exec";
  const URL_OPENSHEET =
    "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/agendamentos";

  useEffect(() => {
    const filtroSalvo = localStorage.getItem("adminFiltroStatus");
    const buscaSalva = localStorage.getItem("adminBusca");
    const ordenacaoSalva = localStorage.getItem("adminOrdenacao");

    if (filtroSalvo) setFiltroStatus(filtroSalvo);
    if (buscaSalva) setBusca(buscaSalva);
    if (
      ordenacaoSalva === "data_evento" ||
      ordenacaoSalva === "envio_recente" ||
      ordenacaoSalva === "pendentes_primeiro"
    ) {
      setOrdenacao(ordenacaoSalva);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("adminFiltroStatus", filtroStatus);
  }, [filtroStatus]);

  useEffect(() => {
    localStorage.setItem("adminBusca", busca);
  }, [busca]);

  useEffect(() => {
    localStorage.setItem("adminOrdenacao", ordenacao);
  }, [ordenacao]);

  function gerarCodigoManual() {
    const numero = Math.floor(100000 + Math.random() * 900000);
    return `LUM-${numero}`;
  }

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
        return;
      }

      const ultimos = data.slice(-200).reverse();
      setAgendamentos(ultimos);
    } catch (err) {
      console.error("Erro ao carregar pedidos:", err);
      setAgendamentos([]);
    } finally {
      setLoading(false);
    }
  }

  async function adicionarEventoManual(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formManual.igreja ||
      !formManual.local ||
      !formManual.data ||
      !formManual.hora
    ) {
      alert("Preencha pelo menos igreja, local, data e hora.");
      return;
    }

    setSalvandoManual(true);

    try {
      const resposta = await fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify({
          acao: "criarManual",
          codigo: gerarCodigoManual(),
          igreja: formManual.igreja,
          responsavel: formManual.responsavel || formManual.igreja,
          whatsapp: formManual.whatsapp,
          local: formManual.local,
          data: formManual.data,
          hora: formManual.hora,
          observacoes: formManual.observacoes,
          status: formManual.status,
        }),
      });

      const resultado = await resposta.json();

      if (!resultado.ok) {
        alert(resultado.error || "Não foi possível adicionar o evento.");
        return;
      }

      setFormManual({
        igreja: "",
        responsavel: "",
        whatsapp: "",
        local: "",
        data: "",
        hora: "",
        observacoes: "",
        status: "aceito",
      });

      setMostrarFormularioManual(false);
      await carregarPedidos();
    } catch (erro) {
      console.error("Erro ao adicionar evento manual:", erro);
      alert("Erro ao adicionar evento manual.");
    } finally {
      setSalvandoManual(false);
    }
  }

  async function apagarEvento(id: string) {
    const confirmar = window.confirm("Tem certeza que deseja apagar este evento?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify({
          acao: "apagarEvento",
          id,
        }),
      });

      const resultado = await resposta.json();

      if (!resultado.ok) {
        alert(resultado.error || "Erro ao apagar evento.");
        return;
      }

      setAgendamentos((prev) =>
        prev.filter((item) => String(item.id) !== String(id))
      );
    } catch (erro) {
      console.error("Erro ao apagar:", erro);
      alert("Erro ao apagar evento.");
    }
  }

  useEffect(() => {
    if (!acessoLiberado) return;
    carregarPedidos();
  }, [acessoLiberado]);

  async function atualizarStatus(id: string, novoStatus: string) {
    if (novoStatus === "aceito") {
      const confirmado = window.confirm(
        "Tem certeza que deseja aceitar este agendamento?"
      );
      if (!confirmado) return;
    }

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
        return;
      }

      setAgendamentos((prev) =>
        prev.map((item) =>
          String(item.id) === String(id)
            ? { ...item, status: novoStatus }
            : item
        )
      );
    } catch (erro) {
      console.error("Erro ao atualizar status:", erro);
      alert("Erro ao atualizar status.");
    } finally {
      setAtualizandoId(null);
    }
  }

  function toggleObservacao(id: string) {
    setAbertos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  const {
    eventosDesteMes,
    proximosEventos,
    eventosPassados,
    eventosVisiveis,
  } = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    const correspondeAoFiltro = (item: Agendamento) => {
      if (filtroStatus === "todos") return true;
      return item.status?.toLowerCase().trim() === filtroStatus;
    };

    const comparar = (a: Agendamento, b: Agendamento) => {
      if (ordenacao === "pendentes_primeiro") {
        const pesoStatus = (status: string) => {
          const valor = status?.toLowerCase().trim();
          if (valor === "pendente") return 0;
          if (valor === "aceito") return 1;
          if (valor === "recusado") return 2;
          return 3;
        };

        const diffStatus = pesoStatus(a.status) - pesoStatus(b.status);
        if (diffStatus !== 0) return diffStatus;

        const dataA = converterDataParaDate(a.data);
        const dataB = converterDataParaDate(b.data);
        if (!dataA && !dataB) return 0;
        if (!dataA) return 1;
        if (!dataB) return -1;
        return dataA.getTime() - dataB.getTime();
      }

      if (ordenacao === "envio_recente") {
        const envioA = converterDataEnvioParaDate(a.data_envio);
        const envioB = converterDataEnvioParaDate(b.data_envio);
        if (!envioA && !envioB) return 0;
        if (!envioA) return 1;
        if (!envioB) return -1;
        return envioB.getTime() - envioA.getTime();
      }

      const dataA = converterDataParaDate(a.data);
      const dataB = converterDataParaDate(b.data);
      if (!dataA && !dataB) return 0;
      if (!dataA) return 1;
      if (!dataB) return -1;
      return dataA.getTime() - dataB.getTime();
    };

    const filtrados = agendamentos
      .filter((item) => {
        if (!correspondeAoFiltro(item)) return false;
        if (!termo) return true;

        const textoCompleto = [
          item.igreja,
          item.responsavel,
          item.codigo,
          item.local,
          item.whatsapp,
          item.data,
          item.observacoes,
        ]
          .join(" ")
          .toLowerCase();

        return textoCompleto.includes(termo);
      })
      .sort(comparar);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    const eventosDesteMes = filtrados.filter((item) => {
      const dataEvento = converterDataParaDate(item.data);
      if (!dataEvento) return false;

      const evento = new Date(dataEvento);
      evento.setHours(0, 0, 0, 0);

      return (
        evento.getMonth() === mesAtual &&
        evento.getFullYear() === anoAtual &&
        evento.getTime() >= hoje.getTime()
      );
    });

    const proximosEventos = filtrados.filter((item) => {
      const dataEvento = converterDataParaDate(item.data);
      if (!dataEvento) return false;

      const evento = new Date(dataEvento);
      evento.setHours(0, 0, 0, 0);

      return (
        evento.getTime() > hoje.getTime() &&
        !(evento.getMonth() === mesAtual && evento.getFullYear() === anoAtual)
      );
    });

    const eventosPassados = filtrados.filter((item) => {
      const dataEvento = converterDataParaDate(item.data);
      if (!dataEvento) return false;

      const evento = new Date(dataEvento);
      evento.setHours(0, 0, 0, 0);

      return (
        evento.getMonth() === mesAtual &&
        evento.getFullYear() === anoAtual &&
        evento.getTime() < hoje.getTime()
      );
    });

    const eventosVisiveis = [
      ...eventosDesteMes,
      ...proximosEventos,
      ...eventosPassados,
    ];

    return {
      eventosDesteMes,
      proximosEventos,
      eventosPassados,
      eventosVisiveis,
    };
  }, [agendamentos, filtroStatus, busca, ordenacao]);

  const totalTodos = eventosVisiveis.length;
  const totalPendentes = eventosVisiveis.filter(
    (item) => item.status?.toLowerCase().trim() === "pendente"
  ).length;
  const totalAceitos = eventosVisiveis.filter(
    (item) => item.status?.toLowerCase().trim() === "aceito"
  ).length;
  const totalRecusados = eventosVisiveis.filter(
    (item) => item.status?.toLowerCase().trim() === "recusado"
  ).length;

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
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setMostrarFormularioManual((prev) => !prev)}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/15 hover:text-white"
          >
            {mostrarFormularioManual ? "Fechar" : "+ Adicionar manualmente"}
          </button>

          <button
            type="button"
            onClick={carregarPedidos}
            disabled={loading}
            className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Atualizando..." : "Atualizar lista"}
          </button>
        </div>

        {mostrarFormularioManual && (
          <div className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
            <form onSubmit={adicionarEventoManual} className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  placeholder="Igreja"
                  value={formManual.igreja}
                  onChange={(e) =>
                    setFormManual({ ...formManual, igreja: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3"
                />

                <input
                  placeholder="Responsável"
                  value={formManual.responsavel}
                  onChange={(e) =>
                    setFormManual({ ...formManual, responsavel: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <input
                  placeholder="WhatsApp"
                  value={formManual.whatsapp}
                  onChange={(e) =>
                    setFormManual({ ...formManual, whatsapp: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3"
                />

                <input
                  placeholder="Local"
                  value={formManual.local}
                  onChange={(e) =>
                    setFormManual({ ...formManual, local: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <input
                  type="date"
                  value={formManual.data}
                  onChange={(e) =>
                    setFormManual({ ...formManual, data: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3"
                />

                <input
                  type="time"
                  value={formManual.hora}
                  onChange={(e) =>
                    setFormManual({ ...formManual, hora: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3"
                />

                <select
                  value={formManual.status}
                  onChange={(e) =>
                    setFormManual({ ...formManual, status: e.target.value })
                  }
                  className="rounded-xl bg-white/10 px-4 py-3 text-black"
                >
                  <option value="aceito">Aceito</option>
                  <option value="pendente">Pendente</option>
                  <option value="recusado">Recusado</option>
                </select>
              </div>

              <textarea
                rows={3}
                placeholder="Observações"
                value={formManual.observacoes}
                onChange={(e) =>
                  setFormManual({
                    ...formManual,
                    observacoes: e.target.value,
                  })
                }
                className="rounded-xl bg-white/10 px-4 py-3"
              />

              <button
                type="submit"
                disabled={salvandoManual}
                className="mt-2 rounded-xl bg-[#F4C021] px-5 py-3 font-semibold text-[#061B5C]"
              >
                {salvandoManual ? "Salvando..." : "Salvar evento"}
              </button>
            </form>
          </div>
        )}

        <div className="mb-5 grid gap-3 md:grid-cols-[1fr_260px]">
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por igreja, responsável, código, local, WhatsApp, observações..."
            className="w-full rounded-2xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/50"
          />

          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
            className="rounded-2xl bg-white/10 px-4 py-3 text-white outline-none"
          >
            <option value="data_evento" className="text-black">
              Ordenar por data do evento
            </option>
            <option value="envio_recente" className="text-black">
              Ordenar por envio mais recente
            </option>
            <option value="pendentes_primeiro" className="text-black">
              Ordenar por pendentes primeiro
            </option>
          </select>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFiltroStatus("todos")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "todos"
                ? "bg-white text-[#061B5C]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Todos
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-[#061B5C]">
              {totalTodos}
            </span>
          </button>

          <button
            onClick={() => setFiltroStatus("pendente")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "pendente"
                ? "bg-yellow-400 text-[#061B5C]"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Pendentes
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-yellow-400 px-2 text-xs font-bold text-[#061B5C]">
              {totalPendentes}
            </span>
          </button>

          <button
            onClick={() => setFiltroStatus("aceito")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "aceito"
                ? "bg-green-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Aceitos
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-green-500 px-2 text-xs font-bold text-white">
              {totalAceitos}
            </span>
          </button>

          <button
            onClick={() => setFiltroStatus("recusado")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              filtroStatus === "recusado"
                ? "bg-red-500 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            Recusados
            <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
              {totalRecusados}
            </span>
          </button>
        </div>

        {loading ? (
          <p className="text-center text-white/80">Carregando pedidos...</p>
        ) : eventosVisiveis.length === 0 ? (
          <p className="text-center text-white/80">
            {textoVazio(filtroStatus, busca)}
          </p>
        ) : (
          <div className="space-y-10">
            {eventosDesteMes.length > 0 && (
              <div>
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold text-white/90">
                    Este mês
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Eventos restantes deste mês.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {eventosDesteMes.map((item) => (
                    <CardAgendamento
                      key={item.id}
                      item={item}
                      abertos={abertos}
                      toggleObservacao={toggleObservacao}
                      atualizarStatus={atualizarStatus}
                      atualizandoId={atualizandoId}
                      apagarEvento={apagarEvento}
                    />
                  ))}
                </div>
              </div>
            )}

            {proximosEventos.length > 0 && (
              <div>
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold text-white/90">
                    Próximos eventos
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Eventos futuros dos próximos meses.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {proximosEventos.map((item) => (
                    <CardAgendamento
                      key={item.id}
                      item={item}
                      abertos={abertos}
                      toggleObservacao={toggleObservacao}
                      atualizarStatus={atualizarStatus}
                      atualizandoId={atualizandoId}
                      apagarEvento={apagarEvento}
                    />
                  ))}
                </div>
              </div>
            )}

            {eventosPassados.length > 0 && (
              <div>
                <div className="mb-4 text-center">
                  <h2 className="text-2xl font-bold text-white/90">
                    Eventos passados do mês
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Eventos que já aconteceram neste mês.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {eventosPassados.map((item) => (
                    <CardAgendamento
                      key={item.id}
                      item={item}
                      abertos={abertos}
                      toggleObservacao={toggleObservacao}
                      atualizarStatus={atualizarStatus}
                      atualizandoId={atualizandoId}
                      apagarEvento={apagarEvento}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}