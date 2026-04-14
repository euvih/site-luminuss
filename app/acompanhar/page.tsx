"use client";

import { useState } from "react";

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

export default function AcompanharPage() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState<Agendamento | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function buscarPedido(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setResultado(null);
    setLoading(true);

    try {
      const resposta = await fetch(
        "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/agendamentos"
      );

      const data = await resposta.json();

      if (!Array.isArray(data)) {
        setErro("Não foi possível carregar os pedidos.");
        setLoading(false);
        return;
      }

      const encontrado = data.find(
        (item) =>
          item.codigo?.toLowerCase().trim() === codigo.toLowerCase().trim()
      );

      if (!encontrado) {
        setErro("Nenhum pedido encontrado com esse código.");
        setLoading(false);
        return;
      }

      setResultado(encontrado);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao buscar pedido.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Acompanhamento
          </p>
          <h1 className="text-4xl font-bold">Consultar pedido</h1>
          <p className="mt-4 text-white/80">
            Digite seu código de acompanhamento para ver o status do convite.
          </p>
        </div>

        <form
          onSubmit={buscarPedido}
          className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur"
        >
          <label className="mb-2 block text-sm font-medium">
            Código de acompanhamento
          </label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ex: LUM-482731"
            className="w-full rounded-xl bg-white/10 px-4 py-3 outline-none placeholder:text-white/50"
            required
          />

          <button
            type="submit"
            className="mt-4 rounded-xl bg-white px-6 py-3 font-semibold text-[#061B5C]"
          >
            Consultar
          </button>
        </form>

        {loading && (
          <p className="mt-6 text-center text-white/80">Buscando pedido...</p>
        )}

        {erro && (
          <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
            {erro}
          </div>
        )}

        {resultado && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#F4C021]">
                  {resultado.igreja || "Sem igreja"}
                </h2>
                <p className="mt-1 text-white/80">
                  Responsável: {resultado.responsavel || "Não informado"}
                </p>
                <p className="mt-1 text-white/70">
                  Código: {resultado.codigo}
                </p>
              </div>

              <StatusBadge status={resultado.status} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-white/60">Local</p>
                <p className="mt-1 font-medium">{resultado.local || "-"}</p>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-white/60">Data</p>
                <p className="mt-1 font-medium">{resultado.data || "-"}</p>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-white/60">Hora</p>
                <p className="mt-1 font-medium">{resultado.hora || "-"}</p>
              </div>

              <div className="rounded-2xl bg-black/20 p-4">
                <p className="text-sm text-white/60">WhatsApp</p>
                <p className="mt-1 font-medium">{resultado.whatsapp || "-"}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-black/20 p-4">
              <p className="text-sm text-white/60">Observações</p>
              <p className="mt-1 whitespace-pre-line leading-7 text-white/90">
                {resultado.observacoes || "Sem observações."}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}