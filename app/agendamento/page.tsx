"use client";

import { useState } from "react";
import Link from "next/link";

export default function Agendamento() {

  const [form, setForm] = useState({
    igreja: "",
    responsavel: "",
    whatsapp: "",
    cidade: "",
    data: "",
    horario: "",
    observacoes: ""
  });

  function handleChange(e: any) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    alert("Solicitação enviada! Em breve entraremos em contato.");

    console.log(form);
  }

  return (
    <main className="min-h-screen bg-[#061B5C] text-white flex flex-col items-center px-6 py-20">

      {/* Título */}
      <h1 className="text-5xl font-bold text-[#F4C021] mb-4">
        Agendamento
      </h1>

      <p className="mb-12 text-lg text-center max-w-xl">
        Preencha as informações abaixo para solicitar a participação do
        grupo <strong>Lúminuss</strong> em sua igreja ou evento.
      </p>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-8 rounded-2xl shadow-lg w-full max-w-xl flex flex-col gap-4"
      >

        <input
          type="text"
          name="igreja"
          placeholder="Nome da igreja"
          onChange={handleChange}
          className="p-3 rounded border"
          required
        />

        <input
          type="text"
          name="responsavel"
          placeholder="Nome do responsável"
          onChange={handleChange}
          className="p-3 rounded border"
          required
        />

        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp para contato"
          onChange={handleChange}
          className="p-3 rounded border"
          required
        />

        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          onChange={handleChange}
          className="p-3 rounded border"
          required
        />

        <input
          type="date"
          name="data"
          onChange={handleChange}
          className="p-3 rounded border"
          required
        />

        <input
          type="time"
          name="horario"
          onChange={handleChange}
          className="p-3 rounded border"
          required
        />

        <textarea
          name="observacoes"
          placeholder="Informações adicionais (evento, congresso, culto especial...)"
          onChange={handleChange}
          className="p-3 rounded border"
          rows={4}
        />

        <button
          type="submit"
          className="bg-[#F4C021] text-[#061B5C] font-bold p-3 rounded-lg hover:scale-105 transition"
        >
          Enviar solicitação
        </button>

      </form>

      {/* Botão voltar */}
      <Link
        href="/"
        className="mt-10 text-[#F4C021] hover:underline"
      >
        ← Voltar para o site
      </Link>

    </main>
  );
}