import Link from "next/link";
import { categorias } from "@/app/dados/integrantes";

type Props = {
  params: Promise<{
    categoria: string;
  }>;
};

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;

  const categoriaEncontrada = categorias.find(
    (item) => item.slug === categoria
  );

  if (!categoriaEncontrada) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#061b5c] px-6 py-24 text-white">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="pointer-events-none absolute top-[40%] right-[-150px] h-[350px] w-[350px] rounded-full bg-yellow-300/20 blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-[-120px] left-[30%] h-[300px] w-[300px] rounded-full bg-blue-300/20 blur-3xl"></div>

        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-[#F4C021]">
            Categoria não encontrada
          </h1>

          <Link href="/" className="text-white underline">
            Voltar para o início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#061B5C] px-6 py-24 text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-[40%] right-[-150px] h-[350px] w-[350px] rounded-full bg-purple-300/20 blur-3xl"></div>
        <div className="absolute -bottom-30 left-[30%] h-[300px] w-[300px] rounded-full bg-blue-300/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/#integrantes"
          className="mb-8 inline-block text-[#F4C021] hover:underline"
        >
          ← Voltar
        </Link>

        {categoriaEncontrada.integrantes.length === 0 ? (
          <div className="rounded-3xl bg-white/10 p-10 text-center">
            <p className="text-lg text-white/85">
              Ainda não há integrantes cadastrados nesta categoria.
            </p>
          </div>
        ) : (
          <div
            className={`mx-auto flex flex-wrap justify-center gap-x-10 gap-y-14 ${
              categoriaEncontrada.slug === "vocais"
                ? "max-w-350"
                : "max-w-300"
            }`}
          >
            {categoriaEncontrada.integrantes.map((integrante, index) => (
              <Link
                key={index}
                href={`/integrantes/perfil/${integrante.slug}`}
                className={`block text-center transition duration-300 hover:-translate-y-1 ${
                  categoriaEncontrada.slug === "vocais"
                    ? "w-45"
                    : "w-65"
                }`}
              >
                <div className="mx-auto mb-2 h-36 w-36 overflow-hidden rounded-full bg-[#0b2a87]">
                  {integrante.foto ? (
                    <img
                      src={integrante.foto}
                      alt={integrante.nome}
                      className="h-full w-full object-cover transition duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#F4C021]">
                      {integrante.nome.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-semibold text-white">
                  {integrante.nome}
                </h2>

                <p className="mt-1 text-white/80">
                  {integrante.funcao}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}