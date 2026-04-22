"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaArrowLeft } from "react-icons/fa";
import "react-day-picker/dist/style.css";

export default function DisponibilidadePage() {
  const [datasSelecionadas, setDatasSelecionadas] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbzfBROjxwP4NMc4TaHmEs9OFDwdEqy8rwzbU1DjtlbXsYAUCMAwFEuTiz4jMSr7H6tIBQ/exec";
  const URL_OPENSHEET =
    "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/disponibilidade";

  function mesmaData(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function alternarData(date: Date | undefined) {
    if (!date) return;

    setMensagem("");
    setErro("");

    setDatasSelecionadas((prev) => {
      const existe = prev.some((d) => mesmaData(d, date));

      if (existe) {
        return prev.filter((d) => !mesmaData(d, date));
      }

      return [...prev, date].sort((a, b) => a.getTime() - b.getTime());
    });
  }

  async function carregarDisponibilidade() {
    setLoading(true);
    setErro("");
    setMensagem("");

    try {
      const resposta = await fetch(URL_OPENSHEET);
      const data = await resposta.json();

      if (!Array.isArray(data)) {
        setErro("Não foi possível carregar as datas disponíveis.");
        setLoading(false);
        return;
      }

      const convertidas = data
        .map((item) => {
          const valor = item.data?.trim();
          if (!valor) return null;

          const [ano, mes, dia] = valor.split("-").map(Number);
          if (!ano || !mes || !dia) return null;

          const date = new Date(ano, mes - 1, dia);
          return isNaN(date.getTime()) ? null : date;
        })
        .filter(Boolean) as Date[];

      setDatasSelecionadas(convertidas);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao carregar disponibilidade.");
      setLoading(false);
    }
  }

  async function salvarDisponibilidade() {
    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      const datasFormatadas = datasSelecionadas.map((date) =>
        format(date, "yyyy-MM-dd")
      );

      const resposta = await fetch(URL_SCRIPT, {
        method: "POST",
        body: JSON.stringify({
          acao: "salvarDisponibilidade",
          datas: datasFormatadas,
        }),
      });

      const resultado = await resposta.json();

      if (!resultado.ok) {
        setErro(resultado.error || "Não foi possível salvar as datas.");
        setSalvando(false);
        return;
      }

      setMensagem("Datas disponíveis salvas com sucesso.");
      setSalvando(false);
    } catch (err) {
      console.error(err);
      setErro("Erro ao salvar disponibilidade.");
      setSalvando(false);
    }
  }

  useEffect(() => {
    carregarDisponibilidade();
  }, []);

  const datasFormatadas = useMemo(() => {
    return datasSelecionadas.map((date) => format(date, "dd/MM/yyyy"));
  }, [datasSelecionadas]);

  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-12 text-white">
      <Link
        href="/admin"
        className="fixed left-4 top-24 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-28 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
            Painel admin
          </p>
          <h1 className="text-4xl font-bold">Datas disponíveis</h1>
          <p className="mt-3 text-white/70">
            Clique nos dias em que o Lúminuss estará disponível para agendamento.
          </p>
        </div>

        {erro && (
          <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
            {erro}
          </div>
        )}

        {mensagem && (
          <div className="mx-auto mb-6 max-w-3xl rounded-2xl border border-green-400/30 bg-green-500/10 p-4 text-green-100">
            {mensagem}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            {loading ? (
              <p className="text-center text-white/70">Carregando calendário...</p>
            ) : (
              <div className="flex justify-center">
                <DayPicker
                  mode="multiple"
                  locale={ptBR}
                  selected={datasSelecionadas}
                  onSelect={(dates) => {
                    if (!dates) return;
                    setDatasSelecionadas(dates);
                    setMensagem("");
                    setErro("");
                  }}
                  month={new Date()}
                  className="admin-calendario"
                />
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-[#F4C021]">
              Datas marcadas
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Estas serão as únicas datas clicáveis no formulário de agendamento.
            </p>

            <div className="mt-5 max-h-[350px] space-y-2 overflow-y-auto pr-1">
              {datasFormatadas.length === 0 ? (
                <p className="text-sm text-white/60">
                  Nenhuma data selecionada ainda.
                </p>
              ) : (
                datasFormatadas.map((data, index) => (
                  <div
                    key={`${data}-${index}`}
                    className="rounded-xl bg-black/20 px-4 py-3 text-sm"
                  >
                    {data}
                  </div>
                ))
              )}
            </div>

            <button
              type="button"
              onClick={salvarDisponibilidade}
              disabled={salvando || loading}
              className="mt-6 w-full rounded-xl bg-[#F4C021] px-5 py-3 font-semibold text-[#061B5C] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar disponibilidade"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}