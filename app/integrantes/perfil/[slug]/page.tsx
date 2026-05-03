import Link from "next/link";
import { categorias } from "@/app/dados/integrantes";
import { FaArrowLeft, FaInstagram, FaYoutube } from "react-icons/fa";

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
    <main className="relative min-h-screen overflow-hidden bg-[#f4f1ea] text-[#061B5C]">
      <Link
        href={linkVoltar}
        className="fixed left-4 top-20 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#061B5C]/15 bg-white/60 text-[#061B5C] shadow-lg backdrop-blur-md transition hover:scale-110 hover:bg-[#F4C021] md:left-6 md:top-24 md:h-12 md:w-12"
      >
        <FaArrowLeft className="text-sm md:text-lg" />
      </Link>

      <section className="relative min-h-[62vh] overflow-hidden bg-[#f4f1ea]">
        {integrante.foto ? (
          <img
            src={integrante.foto}
            alt={integrante.nome}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f4f1ea] text-8xl font-bold text-[#061B5C]/15">
            {integrante.nome.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-[#061B5C]/85" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 pt-32">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[#F4C021]">
              Ministério Lúminuss
            </p>

            <h1 className="text-5xl font-bold leading-tight text-white drop-shadow-lg md:text-7xl">
              {integrante.nome}
            </h1>

            <p className="mt-3 max-w-xl text-lg font-medium text-white/85">
              {integrante.funcao}
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-[#061B5C] px-6 pb-20 pt-14 text-white">
       <img
  src="/logo-transparente.png"
  alt="Logo Lúminuss"
  className="pointer-events-none absolute right-[-90px] top-5 z-0 w-[900px] opacity-10 blur-[1px]"
/>
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#F4C021]/10 blur-3xl" />
    <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-blue-300/10 blur-3xl" />
  </div>

  <div className="relative mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.75fr_1.25fr]">
    
    {/* LADO ESQUERDO */}
    <aside className="space-y-10">
      <div>
        <p className="mb-2 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
          Função
        </p>
        <p className="text-xl font-semibold">
          {integrante.funcao}
        </p>
      </div>

      {(integrante.instagram || integrante.youtube) && (
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            SIGA
          </h2>

          <div className="space-y-3">
            {integrante.instagram && integrante.instagram !== "" && (
              <a
                href={integrante.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 underline transition hover:text-[#F4C021]"
              >
                <FaInstagram className="text-xl" />
                Instagram
              </a>
            )}

            {integrante.youtube && integrante.youtube !== "" && (
              <a
                href={integrante.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 underline transition hover:text-[#F4C021]"
              >
                <FaYoutube className="text-xl" />
                YouTube
              </a>
            )}
          </div>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-2xl font-semibold">
          SOLOS
        </h2>

        <ul className="list-disc space-y-2 pl-5 text-white/80">
          <li>Adicionar solo aqui</li>
          <li>Adicionar música aqui</li>
        </ul>
      </div>
    </aside>

    {/* BIOGRAFIA */}
    <div>
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#F4C021]">
        Biografia
      </p>

      <p className="mt-6 leading-8 text-white/85">
        {integrante.sobre ||
          "Em breve, este espaço receberá a biografia deste integrante, contando sua caminhada, experiências marcantes e o que o Ministério Lúminuss representa em sua vida."}
      </p>

    </div>
  </div>
</section>
    </main>
  );
}