import "./globals.css";
import Header from "./Header";

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
export const metadata = {
  title: "Ministério Lúminuss",
  description: "Um ministério musical que leva adoração, mensagem e esperança por meio da música.",
  
  openGraph: {
    title: "Ministério Lúminuss",
    description: "Conheça o Lúminuss e nossa missão através da música.",
    url: "https://seusite.com",
    siteName: "Lúminuss",
    images: [
      {
        url: "https://seusite.com/logo.jpeg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};