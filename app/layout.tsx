import "./globals.css";
import Header from "./Header";

export const metadata = {
  title: "Ministério Lúminuss",
  description:
    "Um ministério musical que leva adoração, mensagem e esperança por meio da música.",

  openGraph: {
    title: "Ministério Lúminuss",
    description: "Conheça o Lúminuss e nossa missão através da música.",
    url: "https://site-luminuss.vercel.app/",
    siteName: "Lúminuss",
    images: [
      {
        url: "https://site-luminuss.vercel.app/logo.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}