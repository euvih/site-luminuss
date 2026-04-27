import "./globals.css";
import Header from "./Header";

export const metadata = {
  metadataBase: new URL("https://site-luminuss.vercel.app"),
  
  title: "Ministério Lúminuss",
  description:
  "Um ministério musical que leva adoração, mensagem e esperança através da música em cultos, congressos e eventos especiais.",

  openGraph: {
    title: "Ministério Lúminuss - Adoração que transforma",
    description: "Conheça o Lúminuss e nossa missão através da música.",
    url: "https://site-luminuss.vercel.app/",
    siteName: "Lúminuss",
    images: [
      {
        url: "https://site-luminuss.vercel.app/capa-wpp.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
  card: "summary_large_image",
  title: "Ministério Lúminuss",
  description: "Adoração que transforma.",
  images: ["https://site-luminuss.vercel.app/capa-wpp.jpg"],
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
