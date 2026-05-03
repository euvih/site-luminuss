export type Integrante = {
  slug: string;
  nome: string;
  funcao: string;
  foto?: string;
  sobre: string;
  instagram?: string;
  youtube?: string;
};

export type Categoria = {
  slug: string;
  nome: string;
  descricao: string;
  foto?: string;
  integrantes: Integrante[];
};

export const categorias: Categoria[] = [
  {
    slug: "direcao",
    nome: "Direção",
    descricao: "Equipe responsável pela direção e organização do ministério",
    integrantes: [
      {
        slug: "reginaldo-direcao",
        nome: "Reginaldo",
        funcao: "Diretor geral",
        foto: "/reginaldo.jpeg",
        sobre:
          "Reginaldo faz parte da direção do ministério, coordenando a organização e a visão do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "socorro",
        nome: "Socorro",
        funcao: "Secretária",
        foto: "/socorro.jpeg",
        sobre:
          "Socorro atua na secretaria, contribuindo na organização e administração das atividades do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "rejane-direcao",
        nome: "Rejane",
        funcao: "Secretaria / Vocal",
        foto: "/rejane.jpeg",
        sobre:
          "Rejane também contribui na direção e secretaria, além de participar do vocal do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
    ],
  },
  {
    slug: "vocais",
    nome: "Vocal",
    descricao: "Vozes do grupo",
    integrantes: [
      {
        slug: "rejane",
        nome: "Rejane",
        funcao: "Contralto",
        foto: "/rejane.jpeg",
        sobre:
          "Rejane faz parte do vocal do grupo e contribui com dedicação, sensibilidade musical e amor ao ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "guilherme",
        nome: "Guilherme",
        funcao: "Tenor",
        foto: "/Guilherme.jpeg",
        sobre:
          "Filho do diretor Reginaldo, Guilherme participa do grupo desde novo, hoje com 19 anos estuda odontologia e ama fazer Jiu-Jitsu.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "ana-paula",
        nome: "Ana Paula",
        funcao: "Soprano",
        foto: "/anapaula.jpeg",
        sobre:
          "Ana Paula participa do vocal como soprano, trazendo leveza e brilho às músicas do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "rhadassa",
        nome: "Rhadassa",
        funcao: "Contralto",
        foto: "/rhadassa2.jpeg",
        sobre:
          "Rhadassa faz parte do vocal como contralto, ajudando a compor a identidade musical do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "gilmara",
        nome: "Gilmara",
        funcao: "Mezzo-soprano",
        foto: "/gilmara.jpeg",
        sobre:
          "Gilmara participa como mezzo-soprano, enriquecendo a sonoridade com equilíbrio e expressividade.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "henoque",
        nome: "Henoque",
        funcao: "Barítono",
        foto: "/henoque.jpeg",
        sobre:
          "Henoque integra o grupo como barítono, trazendo profundidade e firmeza às apresentações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "matheus",
        nome: "Matheus",
        funcao: "Tenor",
        foto: "/matheus.jpeg",
        sobre:
          "Matheus participa como tenor, colaborando com energia e dedicação no ministério musical.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "ruhama",
        nome: "Ruhama",
        funcao: "Soprano",
        foto: "/ruhama.jpeg",
        sobre:
          "Ruhama é soprano no grupo e contribui com sua voz e presença nas apresentações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "julia",
        nome: "Júlia",
        funcao: "Contralto",
        foto: "/julia.jpeg",
        sobre:
          "Júlia integra o vocal como contralto, fortalecendo a harmonia e a beleza do conjunto.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "amanda",
        nome: "Amanda",
        funcao: "Soprano",
        foto: "/amanda.jpeg",
        sobre:
          "Amanda participa como soprano, trazendo delicadeza, presença e compromisso ao ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "djanilson",
        nome: "Djanilson",
        funcao: "Tenor / capelão",
        foto: "/djanilson.jpeg",
        sobre:
          "Djanilson integra o vocal como tenor, contribuindo para a harmonia e força das apresentações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "sergio",
        nome: "Sergio",
        funcao: "Tenor",
        foto: "/sergio.jpeg",
        sobre:
          "Sergio participa como tenor, contribuindo com dedicação e presença musical nas ministrações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "edi",
        nome: "Edi",
        funcao: "Tenor",
        foto: "/edi.jpeg",
        sobre:
          "Edi compõe o vocal como tenor, ajudando a fortalecer o conjunto sonoro do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "eudes",
        nome: "Eudes",
        funcao: "Tenor / Sonoplasta / Orador",
        foto: "/eudes.jpeg",
        sobre:
          "Eudes participa da sonoplastia e também do vocal, contribuindo em diferentes áreas do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
    ],
  },
  {
    slug: "instrumental",
    nome: "Instrumental",
    descricao: "Equipe instrumental",
    foto: "/banda.jpeg",
    integrantes: [
      {
        slug: "reginaldo",
        nome: "Reginaldo",
        funcao: "Diretor geral / Violinista",
        foto: "/reginaldo.jpeg",
        sobre:
          "Reginaldo atua na direção do ministério e também como violinista, contribuindo com liderança e musicalidade.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
       {
        slug: "faelton",
        nome: "Faelton",
        funcao: "Guitarrista / diretor-instrumental",
        foto: "/faelton.jpeg",
        sobre:
          "Faelton atua como guitarrista, contribuindo com criatividade e identidade musical ao grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "kalleb",
        nome: "Kalleb",
        funcao: "Tecladista",
        foto: "/kalleb.jpeg",
        sobre:
          "Kalleb integra a equipe instrumental como tecladista, colaborando com a base harmônica do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "bebeto",
        nome: "Bebeto",
        funcao: "Baterista",
        foto: "/bebeto.jpeg",
        sobre:
          "Bebeto participa como baterista, trazendo ritmo, energia e sustentação às apresentações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "andre",
        nome: "André",
        funcao: "Baixista",
        foto: "/andre.jpeg",
        sobre:
          "André integra o instrumental como baixista, fortalecendo a base sonora e o equilíbrio musical.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
    ],
  },
  {
    slug: "sonoplastia",
    nome: "Sonoplastia",
    descricao:
      "Equipe responsável pelo som, mixagem e qualidade sonora das apresentações",
    integrantes: [
      {
        slug: "hugo",
        nome: "Hugo",
        funcao: "Sonoplasta",
        foto: "/hugo.jpeg",
        sobre:
          "Hugo atua na sonoplastia, cuidando da qualidade sonora e da experiência musical nas apresentações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "eudes",
        nome: "Eudes",
        funcao: "Sonoplasta / Vocal / Orador",
        foto: "/eudes.jpeg",
        sobre:
          "Eudes participa da sonoplastia e também do vocal, contribuindo em diferentes áreas do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "paulo-sonoplastia",
        nome: "Paulo",
        funcao: "Sonoplasta",
        foto: "/paulo.jpeg",
        sobre:
          "Paulo integra a equipe de sonoplastia, ajudando no controle e qualidade do som.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
    ],
  },
  {
    slug: "midia",
    nome: "Mídia",
    descricao: "Equipe de mídia",
    integrantes: [
      {
        slug: "davi-eliel",
        nome: "Davi Eliel",
        funcao: "Mídia",
        foto: "/davi.jpeg",
        sobre:
          "Davi Eliel faz parte da equipe de mídia, ajudando na comunicação e presença digital do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "vitoria",
        nome: "Vitória",
        funcao: "Mídia",
        foto: "/vitoria.jpeg",
        sobre:
          "Vitória atua na equipe de mídia, colaborando com divulgação, identidade visual e produção de conteúdo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "daniel",
        nome: "Daniel",
        funcao: "Mídia",
        foto: "/daniel.jpeg",
        sobre:
          "Daniel integra a equipe de mídia, contribuindo para o registro e divulgação do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
    ],
  },
  {
    slug: "apoio",
    nome: "Apoio",
    descricao: "Equipe de apoio",
    integrantes: [
      {
        slug: "elisangela",
        nome: "Elisângela",
        funcao: "Apoio",
        foto: "/elisangela.jpeg",
        sobre:
          "Elisângela faz parte da equipe de apoio, servindo com dedicação na organização do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "erineide",
        nome: "Erineide",
        funcao: "Apoio",
        foto: "/erineide.jpeg",
        sobre:
          "Erineide contribui na equipe de apoio, ajudando no cuidado e funcionamento das atividades.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "patricia",
        nome: "Patricia",
        funcao: "Jurídico",
        foto: "/patricia.jpeg",
        sobre:
          "Patricia integra a equipe de apoio, auxiliando no suporte necessário para as apresentações.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "paulo-apoio",
        nome: "Paulo",
        funcao: "Apoio/Sonoplastia",
        foto: "/paulo.jpeg",
        sobre:
          "Paulo contribui na equipe de apoio e som, ajudando no suporte técnico e organizacional do grupo.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "Regineide",
        nome: "Regineide",
        funcao: "Apoio",
        foto: "/regineide.jpeg",
        sobre:
          "Regineide faz parte da equipe de apoio, colaborando com cuidado, organização e serviço.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
      {
        slug: "vivianne",
        nome: "Vivianne",
        funcao: "Apoio",
        foto: "/vivianne.jpeg",
        sobre: "Vivianne integra a equipe de apoio, servindo com dedicação nas necessidades do ministério.",
        instagram: "https://instagram.com/",
        youtube: "",
      },
    ],
  },
];