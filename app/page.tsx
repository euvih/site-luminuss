"use client";

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    igreja: "",
    responsavel: "",
    whatsapp: "",
    data: "",
    hora: "",
  });

  const [pedidos, setPedidos] = useState<any[]>([]);

  function handleChange(e: any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    const novoPedido = {
      ...form,
      status: "pendente",
    };

    setPedidos([...pedidos, novoPedido]);

    alert("Solicitação enviada!");

    setForm({
      igreja: "",
      responsavel: "",
      whatsapp: "",
      data: "",
      hora: "",
    });
  }

  function aprovar(index: number) {
    const lista = [...pedidos];
    lista[index].status = "aprovado";
    setPedidos(lista);
  }

  function recusar(index: number) {
    const lista = pedidos.filter((_, i) => i !== index);
    setPedidos(lista);
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Luminous 🎶</h1>
      <p>Agendamento de apresentações</p>

      <h2>Solicitar apresentação</h2>

      <form onSubmit={handleSubmit}>
        <input name="igreja" placeholder="Nome da Igreja" onChange={handleChange} value={form.igreja} /><br /><br />
        <input name="responsavel" placeholder="Responsável" onChange={handleChange} value={form.responsavel} /><br /><br />
        <input name="whatsapp" placeholder="WhatsApp" onChange={handleChange} value={form.whatsapp} /><br /><br />
        <input type="date" name="data" onChange={handleChange} value={form.data} /><br /><br />
        <input type="time" name="hora" onChange={handleChange} value={form.hora} /><br /><br />

        <button type="submit">Enviar</button>
      </form>

      <h2>Pedidos (ADM)</h2>

      {pedidos.map((p, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <p><strong>{p.igreja}</strong></p>
          <p>{p.data} - {p.hora}</p>
          <p>Status: {p.status}</p>

          {p.status === "pendente" && (
            <>
              <button onClick={() => aprovar(index)}>Aprovar</button>
              <button onClick={() => recusar(index)}>Recusar</button>
            </>
          )}
        </div>
      ))}
    </main>
  );
}