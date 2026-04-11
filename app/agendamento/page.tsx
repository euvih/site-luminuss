"use client";

import { useState } from "react";
import Link from "next/link";

export default function Agendamento() {
  const [form, setForm] = useState({
    igreja: "",
    responsavel: "",
    whatsapp: "",
    local: "",
    data: "",
    hora: "",
    observacoes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  try {
    await fetch(
      "https://script.google.com/macros/s/AKfycbwVh2XcV89W9QxNPaqWDBKaQAoDR0c6swKxFWImBee2jW_nGFUegIebi94SiB-T7w9x/exec",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(form),
      }
    );

    alert("Solicitação enviada com sucesso!");

    setForm({
      igreja: "",
      responsavel: "",
      whatsapp: "",
      local: "",
      data: "",
      hora: "",
      observacoes: "",
    });
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro ao enviar solicitação.");
  }
}

  return (
    <main className="min-h-screen bg-[#061B5C] px-6 py-24 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block text-[#F4C021] hover:underline"
        >
          ← Voltar
        </Link>

        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold">Agendamento</h1>
          <p className="mt-4 text-lg text-white/85">
            Preencha o formulário abaixo para solicitar um convite do Lúminuss.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-3xl bg-white p-8 text-[#061B5C] shadow-xl"
        >
          <input
            type="text"
            name="igreja"
            placeholder="Nome da igreja"
            value={form.igreja}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            name="responsavel"
            placeholder="Responsável"
            value={form.responsavel}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={form.whatsapp}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            name="local"
            placeholder="Local do evento"
            value={form.local}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            required
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              required
            />

            <input
              type="time"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
              required
            />
          </div>

          <textarea
            name="observacoes"
            placeholder="Observações"
            value={form.observacoes}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
            rows={5}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-[#061B5C] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Enviar solicitação
          </button>
        </form>
      </div>
    </main>
  );
}