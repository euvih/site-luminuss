"use client";

import { useEffect, useState } from "react";

type Agendamento = {
  id: string;
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

export default function AgendaPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/agendamentos"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("A resposta não veio como lista:", data);
          setAgendamentos([]);
          setLoading(false);
          return;
        }

        setAgendamentos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar agendamentos:", err);
        setAgendamentos([]);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Agenda e pedidos
          </p>
          <h1 className="text-4xl font-bold">Agendamentos</h1>
          <p className="mt-4 text-white/80">
            Acompanhe os pedidos enviados e o status de cada agendamento.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-white/80">Carregando agendamentos...</p>
        ) : agendamentos.length === 0 ? (
          <p className="text-center text-white/80">
            Nenhum agendamento encontrado.
          </p>
        ) : (
          <div className="grid gap-6">
            {agendamentos.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-lg backdrop-blur"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#F4C021]">
                      {item.igreja || "Sem igreja"}
                    </h2>
                    <p className="mt-1 text-white/80">
                      Responsável: {item.responsavel || "Não informado"}
                    </p>
                  </div>

                  <StatusBadge status={item.status} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-black/20 p-4">
                    <p className="text-sm text-white/60">WhatsApp</p>
                    <p className="mt-1 font-medium">{item.whatsapp || "-"}</p>
                  </div>

                  <div className="rounded-2xl bg-black/20 p-4">
                    <p className="text-sm text-white/60">Local</p>
                    <p className="mt-1 font-medium">{item.local || "-"}</p>
                  </div>

                  <div className="rounded-2xl bg-black/20 p-4">
                    <p className="text-sm text-white/60">Data</p>
                    <p className="mt-1 font-medium">{item.data || "-"}</p>
                  </div>

                  <div className="rounded-2xl bg-black/20 p-4">
                    <p className="text-sm text-white/60">Hora</p>
                    <p className="mt-1 font-medium">{item.hora || "-"}</p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-black/20 p-4">
                  <p className="text-sm text-white/60">Observações</p>
                  <p className="mt-1 whitespace-pre-line leading-7 text-white/90">
                    {item.observacoes || "Sem observações."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}