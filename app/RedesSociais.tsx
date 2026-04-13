import { FaInstagram, FaYoutube } from "react-icons/fa";

export default function RedesSociais() {
  return (
    <section className="bg-[#061B5C] px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#F4C021]">
          Redes sociais
        </p>

        <h2 className="text-3xl font-bold">Siga o Lúminuss</h2>

        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Acompanhe nosso ministério, vídeos, louvores e novidades pelas redes
          sociais.
        </p>

        <div className="mt-8 flex items-center justify-center gap-6">
          <a
          href="https://www.instagram.com/mluminuss/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-white/80 transition hover:text-pink-400"
        >
          <FaInstagram />
        </a>

          <a
            href="https://youtube.com/SEU_CANAL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube do Lúminuss"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition duration-300 hover:scale-110 hover:bg-red-500"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </section>
  );
}