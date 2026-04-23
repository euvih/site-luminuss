"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FaArrowLeft } from "react-icons/fa";
import "react-day-picker/dist/style.css";

export default function DisponibilidadePage() {
  const [datasSalvas, setDatasSalvas] = useState<Date[]>([]);
  const [datasSelecionadas, setDatasSelecionadas] = useState<Date[]>([]);  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbzfBROjxwP4NMc4TaHmEs9OFDwdEqy8rwzbU1DjtlbXsYAUCMAwFEuTiz4jMSr7H6tIBQ/exec";
  const URL_OPENSHEET =
    "https://opensheet.elk.sh/1_EsxHvUXbh8VQnmCLOCoIbvoC1VGtyl3YMr9TiSsgD4/disponibilidade";

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

      convertidas.sort((a, b) => a.getTime() - b.getTime());

    setDatasSalvas(convertidas);
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
      const datasFormatadas = [...datasSelecionadas]
        .sort((a, b) => a.getTime() - b.getTime())
        .map((date) => format(date, "yyyy-MM-dd"));

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
      
      setDatasSalvas([...datasSelecionadas].sort((a, b) => a.getTime() - b.getTime()));
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
    return [...datasSelecionadas]
      .sort((a, b) => a.getTime() - b.getTime())
      .map((date) => format(date, "dd/MM/yyyy"));
  }, [datasSelecionadas]);
const temAlteracao =
  datasSelecionadas.length !== datasSalvas.length ||
  datasSelecionadas.some((dataSel) =>
    !datasSalvas.some(
      (dataSalva) =>
        dataSalva.getFullYear() === dataSel.getFullYear() &&
        dataSalva.getMonth() === dataSel.getMonth() &&
        dataSalva.getDate() === dataSel.getDate()
    )
  );
  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-12 text-white">
      <Link
        href="/admin"
        className="fixed left-4 top-24 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-28 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <div className="mx-auto max-w-5xl">
        <div className="mb-9 text-center">
          <p className="mb-11 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
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
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-6 backdrop-blur">
            {loading ? (
              <p className="text-center text-white/70">Carregando calendário...</p>
            ) : (
              <div className="flex justify-center">
                <div className="disponibilidade-calendario rounded-2xl bg-[#071f69] p-3">
                  <DayPicker
  mode="multiple"
  locale={ptBR}
  selected={datasSelecionadas}
  onSelect={(dates) => {
    setDatasSelecionadas(
      [...(dates || [])].sort(
        (a, b) => a.getTime() - b.getTime()
      )
    );
    setMensagem("");
    setErro("");
  }}
  defaultMonth={new Date()}
  fromMonth={new Date()}
  modifiers={{
    salvo: datasSalvas,
    selecionadoNaoSalvo: datasSelecionadas.filter(
      (dataSel) =>
        !datasSalvas.some(
          (dataSalva) =>
            dataSalva.getFullYear() === dataSel.getFullYear() &&
            dataSalva.getMonth() === dataSel.getMonth() &&
            dataSalva.getDate() === dataSel.getDate()
        )
    ),
  }}
  modifiersClassNames={{
    salvo: "dia-salvo",
    selecionadoNaoSalvo: "dia-nao-salvo",
  }}
  className="w-full"
/>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur h-[540px] flex flex-col">
  <h2 className="text-xl font-semibold text-[#F4C021]">
    Datas marcadas
  </h2>

  <p className="mt-2 text-sm text-white/70">
    Estas serão as únicas datas clicáveis no formulário de agendamento.
  </p>

  <div className="mt-5 flex-1 overflow-y-auto pr-1 grid grid-cols-2 gap-2 content-start">
    {datasFormatadas.length === 0 ? (
      <p className="col-span-2 text-sm text-white/60">
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
    disabled={!temAlteracao || salvando || loading}
    className={`
      mt-5 w-full rounded-xl px-5 py-3 font-semibold transition-all duration-300
      ${
        temAlteracao
          ? "bg-[#F4C021] text-[#061B5C] hover:opacity-90"
          : "bg-transparent text-white/40 border border-white/10 cursor-not-allowed"
      }
    `}
  >
    {salvando ? "Salvando..." : "Salvar disponibilidade"}
  </button>
</div>
        </div>
      </div>
    </main>
  );
}