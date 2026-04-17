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

        <div className="mt-1 flex items-center gap-5 md:ml-2 md:mt-0 md:gap-3">
  <a
    href="https://instagram.com/mluminuss/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-lg text-white/80 transition hover:text-pink-400"
  >
    <FaInstagram size={30}/> 
  </a>

  <a
    href="https://www.youtube.com/@ministerioluminuss"
    target="_blank"
    rel="noopener noreferrer"
    className="text-lg text-white/80 transition hover:text-red-500"
  >
    <FaYoutube size={30}/>
  </a>
</div>
      </div>
    </section>
  );
}