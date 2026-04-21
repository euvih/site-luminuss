import Link from "next/link";
import { categorias } from "@/app/dados/integrantes";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: {
    categoria?: string;
  };
};

export default async function PerfilIntegrantePage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const categoria = searchParams?.categoria;

  const integrante = categorias
    .flatMap((categoria) => categoria.integrantes)
    .find((item) => item.slug === slug);

  if (!integrante) {
    return (
      <main className="min-h-screen bg-[#061b5c] px-6 py-24 text-center text-white">
        <h1 className="text-3xl font-bold text-[#F4C021]">
          Integrante não encontrado
        </h1>

        <Link href="/" className="mt-6 inline-block underline">
          Voltar
        </Link>
      </main>
    );
  }

  const linkVoltar = categoria ? `/integrantes/${categoria}` : "/#integrantes";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061B5C] px-6 pb-20 pt-28 text-white md:pt-32">
      <Link
        href={linkVoltar}
        className="fixed left-4 top-20 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#F4C021]/80 hover:text-[#061B5C] md:left-6 md:top-24 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-[40%] right-[-150px] h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute -bottom-30 left-[30%] h-[300px] w-[300px] rounded-full bg-blue-300/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto mt-6 max-w-4xl md:mt-8">
        <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-md">
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

          <h1 className="text-center text-4xl font-bold">
            {integrante.nome}
          </h1>

          <p className="mt-2 text-center text-lg text-white/80">
            {integrante.funcao}
          </p>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-[#F4C021]">
              Biografia
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              {integrante.sobre}
            </p>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-[#F4C021]">
              Redes sociais
            </h2>

            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {integrante.instagram && integrante.instagram !== "" && (
                <a
                  href={integrante.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-pink-500 px-5 py-2 font-medium transition hover:scale-105"
                >
                  Instagram
                </a>
              )}

              {integrante.youtube && integrante.youtube !== "" && (
                <a
                  href={integrante.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-red-500 px-5 py-2 font-medium transition hover:scale-105"
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