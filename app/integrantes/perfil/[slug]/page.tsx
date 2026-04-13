import Link from "next/link";
import { categorias } from "@/app/dados/integrantes";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PerfilIntegrantePage({ params }: Props) {
  const { slug } = await params;

  // junta todos os integrantes de todas as categorias
  const integrante = categorias
    .flatMap((categoria) => categoria.integrantes)
    .find((item) => item.slug === slug);

  if (!integrante) {
    return (
      <main className="min-h-screen bg-[#061b5c] px-6 py-24 text-white text-center">
        <h1 className="text-3xl font-bold text-[#F4C021]">
          Integrante não encontrado
        </h1>

        <Link href="/integrantes" className="mt-6 inline-block underline">
          Voltar
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061B5C] px-6 py-20 text-white">

      {/* fundo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-[40%] right-[-150px] h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute -bottom-30 left-[30%] h-[300px] w-[300px] rounded-full bg-blue-300/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-4xl">

        {/* voltar */}
        <Link
          href="/integrantes"
          className="mb-8 inline-block text-[#F4C021] hover:underline"
        >
          ← Voltar
        </Link>

        <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md">

          {/* foto */}
          <div className="mx-auto mb-6 h-40 w-40 overflow-hidden rounded-full bg-[#0b2a87]">
            {integrante.foto ? (
              <img
                src={integrante.foto}
                alt={integrante.nome}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-[#F4C021]">
                {integrante.nome.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* nome */}
          <h1 className="text-center text-4xl font-bold">
            {integrante.nome}
          </h1>

          {/* função */}
          <p className="mt-2 text-center text-white/80 text-lg">
            {integrante.funcao}
          </p>

          {/* sobre */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-[#F4C021]">
              Biografia
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              {integrante.sobre}
            </p>
          </div>

          {/* redes */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-[#F4C021]">
              Redes sociais
            </h2>

            <div className="mt-4 flex justify-center gap-4 flex-wrap">

              {integrante.instagram && integrante.instagram !== "" && (
                <a
                  href={integrante.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-pink-500 px-5 py-2 font-medium hover:scale-105 transition"
                >
                  Instagram
                </a>
              )}

              {integrante.youtube && integrante.youtube !== "" && (
                <a
                  href={integrante.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-red-500 px-5 py-2 font-medium hover:scale-105 transition"
                >
                  YouTube
                </a>
              )}

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}