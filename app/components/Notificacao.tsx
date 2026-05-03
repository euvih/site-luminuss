"use client";

type NotificacaoProps = {
  mostrar: boolean;
  mensagem: string;
  tipo?: "info" | "sucesso" | "erro" | "aviso";
  onFechar: () => void;
};

export default function Notificacao({
  mostrar,
  mensagem,
  tipo = "info",
  onFechar,
}: NotificacaoProps) {
  if (!mostrar) return null;

  const estilos = {
    info: "bg-[#061B5C] border-[#F4C021]/40 text-white",
    sucesso: "bg-green-700 border-green-300/40 text-white",
    erro: "bg-red-700 border-red-300/40 text-white",
    aviso: "bg-[#3a2c66] border-[#F4C021]/40 text-white",
  };

  const icones = {
    info: "🎶",
    sucesso: "✅",
    erro: "❌",
    aviso: "✨",
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-[999] w-[90%] max-w-md -translate-x-1/2">
      <div className={`flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-2xl backdrop-blur-md ${estilos[tipo]}`}>
        <span className="text-xl">{icones[tipo]}</span>

        <p className="flex-1 text-sm font-medium leading-5">
          {mensagem}
        </p>

        <button
          type="button"
          onClick={onFechar}
          className="text-lg font-bold text-[#F4C021]"
        >
          ×
        </button>
      </div>
    </div>
  );
}