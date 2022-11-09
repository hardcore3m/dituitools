const paradigms = [{
  id: "procedural",
  nome: "Procedural",
  tipo: "Imperativo",
  description: "Neste paradigma,os programas são executados através de chamadas sucessivas a procedimentos separados."
}, {
  id: "blocks",
  nome: "Estruturas de blocos",
  tipo: "Imperativo",
  description: "A característica marcante deste paradigma são os escopos aninhados."
}, {
  id: "oop",
  nome: "Orientado a objetos",
  tipo: "Imperativo",
  description: "Este paradigma descreve linguagens que suportam a interação entre objetos."
}, {
  id: "distributed",
  nome: "Computação Distribuida",
  tipo: "Imperativo",
  description: "Este paradigma suporta que mais de uma rotina possa executar independentemente."
}, {
  id: "functional",
  nome: "Funcional",
  tipo: "Declarativo",
  description: "Linguagens deste paradigma não incluem qualquer provisão para atribuição ou dados mutáveis.Na programação funcional, o mapeamento entre os valores de entrada e saída são alcançados mais diretamente.Um programa é uma função(ou grupo de funções), tipicamente constituída de outras funções mais simples."
}, {
  id: "logic",
  nome: "Programação Lógica",
  tipo: "Declarativo",
  description: "Este paradigma se baseia na noção de que um programa implementa uma relação ao invés de um mapeamento."
}]

const bookmarkTypes = [{
    "id": "00",
    "name": "Sem Categoria"
  },
  {
    "id": "01",
    "name": "Artigo | Postagem | Notícia"
  },
  {
    "id": "02",
    "name": "Canal | Perfil | Podcast"
  },
  {
    "id": "03",
    "name": "Ferramentas para publicidade"
  },
  {
    "id": "04",
    "name": "Conversor"
  },
  {
    "id": "05",
    "name": "Curso | Canal | Ferramenta de aprendizado"
  },
  {
    "id": "06",
    "name": "Documentação | Cheat Sheet"
  },
  {
    "id": "07",
    "name": "Ferramenta para desenvolvimento | Prototipagem"
  },
  {
    "id": "08",
    "name": "Gerenciadores"
  },
  {
    "id": "09",
    "name": "Inspiração | Lista | Exemplo"
  },
  {
    "id": "10",
    "name": "API"
  },
  {
    "id": "11",
    "name": "Rede Social"
  },
  {
    "id": "12",
    "name": "Tutorial"
  },
  {
    "id": "13",
    "name": "Video"
  },
  {
    "id": "14",
    "name": "Edição de imagens | Gráficos | Logotipos"
  },
  {
    "id": "15",
    "name": "Colaboração e produtividade"
  },
  {
    "id": "16",
    "name": "Stock"
  },
  {
    "id": "17",
    "name": "Infográficos"
  },
  {
    "id": "18",
    "name": "Tipografia"
  },
  {
    "id": "19",
    "name": "Internet"
  }
]

const categories = {
  languages: {
    paradigms: paradigms
  },
  bookmarks: {
    types: bookmarkTypes
  }
}

exports.list = (req, res) => {

  res.status(200).json(categories)
}