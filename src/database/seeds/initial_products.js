/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('products').del();

  await knex('products').insert([
    {
      "id": "1",
      "name": "Camiseta Básica",
      "description": "Camiseta de algodão 100% com corte regular.",
      "price": 49.9,
      "category": "Moda",
      "image_url": "https://aramismenswear.vtexassets.com/arquivos/ids/1189720/CS120045_537_1-CAMISETA-BASICA--PA-.jpg"
    },
    {
      "id": "2",
      "name": "Smartphone X10",
      "description": "Smartphone com 128GB de armazenamento e câmera de 48MP.",
      "price": 1999.99,
      "category": "Eletronicos",
      "image_url": "https://i.zst.com.br/thumbs/12/2a/33/-747311604.jpg"
    },
    {
      "id": "3",
      "name": "Chocolate Amargo 70%",
      "description": "Barra de chocolate premium com 70% de cacau.",
      "price": 12.5,
      "category": "Alimentos",
      "image_url": "https://cdn.awsli.com.br/2500x2500/2627/2627225/produto/231949371/img-20230906-wa0042-94gkroel13.jpg"
    },
    {
      "id": "4",
      "name": "Vinho Tinto Reserva",
      "description": "Vinho tinto envelhecido em barris de carvalho por 12 meses.",
      "price": 89.9,
      "category": "Bebidas",
      "image_url": "https://images.tcdn.com.br/img/img_prod/1122751/vinho_tinto_seco_argentino_reserva_de_los_andes_cabernet_sauvignon_183_1_d3c8b77f93638932ce2392ac828098f7.png"
    },
    {
      "id": "5",
      "name": "Sofá 3 Lugares",
      "description": "Sofá confortável com revestimento em tecido de alta qualidade.",
      "price": 1299,
      "category": "CasaDecoracao",
      "image_url": "https://static.mobly.com.br/p/Modern-SofC3A1-3-Lugares-Nevada-I-Suede-Bege-5637-661847-2.jpg"
    },
    {
      "id": "6",
      "name": "Creme Hidratante Facial",
      "description": "Creme hidratante com ácido hialurônico para todos os tipos de pele.",
      "price": 59.9,
      "category": "SaudeBeleza",
      "image_url": "https://epocacosmeticos.vteximg.com.br/arquivos/ids/524280/Hidratante-Facial-Nivea---Creme-Facial-Nutritivo---100g-4--1-.jpg"
    },
    {
      "id": "7",
      "name": "Bicicleta Mountain Bike",
      "description": "Bicicleta com suspensão dupla e 21 marchas.",
      "price": 2499,
      "category": "EsporteLazer",
      "image_url": "https://cdn.awsli.com.br/2500x2500/1259/1259538/produto/254948534/krw-bikes---out-20220098-pqmhi8lvsi.jpg"
    },
    {
      "id": "8",
      "name": "Livro: A Arte da Guerra",
      "description": "Clássico da literatura sobre estratégia e liderança.",
      "price": 29.9,
      "category": "Livros",
      "image_url": "https://m.media-amazon.com/images/I/51Fe45NGwkL.jpg"
    },
    {
      "id": "9",
      "name": "Caderno Universitário",
      "description": "Caderno com 200 folhas pautadas e capa dura.",
      "price": 19.9,
      "category": "Papelaria",
      "image_url": "https://images.tcdn.com.br/img/img_prod/1106500/caderno_universitario_a4_tilibra_happy_90_gramas_1_materia_80_folhas_10131_1_6e94ec9545c05396af8674efb6f5aabc.jpg"
    },
    {
      "id": "10",
      "name": "Boneca de Pano",
      "description": "Boneca artesanal feita com materiais hipoalergênicos.",
      "price": 39.9,
      "category": "Brinquedos",
      "image_url": "https://images.tcdn.com.br/img/img_prod/655423/boneca_de_pano_rosa_rosinha_19580_2_dfb8d8ed7e4e57800f0de388191a355b.jpg"
    },
    {
      "id": "11",
      "name": "Relógio de Pulso Clássico",
      "description": "Relógio analógico com pulseira de couro genuíno.",
      "price": 249.9,
      "category": "Acessorios",
      "image_url": "https://a-static.mlcdn.com.br/800x560/relogio-masculino-pulso-marrom-branco-classico-geneva-quartzo-yazole/pjkstoreltda/12074919258/c4a0e8cb276b04ee5005a10a7d933c84.jpeg"
    },
    {
      "id": "12",
      "name": "Fone de Ouvido Bluetooth",
      "description": "Fone de ouvido sem fio com cancelamento de ruído ativo.",
      "price": 399.9,
      "category": "Eletronicos",
      "image_url": "https://m.media-amazon.com/images/I/514n0rnHIgL._AC_UF1000,1000_QL80_.jpg"
    },
    {
      "id": "13",
      "name": "Mesa de Escritório",
      "description": "Mesa compacta com acabamento em madeira e estrutura metálica.",
      "price": 599,
      "category": "CasaDecoracao",
      "image_url": "https://panoverse-cdn.com.br/lojadallacosta.img/produto/550/mesa-para-escritorio-industrial-f20-off-white-freijo-dalla-costa-3697-large.jpg"
    },
    {
      "id": "14",
      "name": "Tênis Esportivo",
      "description": "Tênis leve e confortável, ideal para corridas e caminhadas.",
      "price": 299.9,
      "category": "EsporteLazer",
      "image_url": "https://waytenis.vteximg.com.br/arquivos/ids/188322-1000-1000/tenis-olympikus-masculina-zex-preto-chumbo-vandacalcados2.jpg"
    },
    {
      "id": "15",
      "name": "Cafeteira Elétrica",
      "description": "Cafeteira com capacidade para 1,5L e função de manter aquecido.",
      "price": 199.9,
      "category": "Eletrodomesticos",
      "image_url": "https://a-static.mlcdn.com.br/1500x1500/cafeteira-eletrica-mondial-dolce-arome-black-c-30-18x-fb-18-cafes-preta/magazineluiza/236672300/b5c889ab214e1b4960fb854799d94e4a.jpg"
    },
    {
      "id": "16",
      "name": "Jaqueta de Couro",
      "description": "Jaqueta estilosa feita com couro sintético de alta qualidade.",
      "price": 499.9,
      "category": "Moda",
      "image_url": "https://s.courosonline.com.br/product/2024/02/couros266-2802170610.jpg"
    },
    {
      "id": "17",
      "name": "Kit de Ferramentas",
      "description": "Conjunto com 50 peças para reparos domésticos.",
      "price": 149.9,
      "category": "CasaDecoracao",
      "image_url": "https://m.media-amazon.com/images/I/61ZmjmMLsRL._AC_UF894,1000_QL80_.jpg"
    },
    {
      "id": "18",
      "name": "Jogo de Panelas Antiaderentes",
      "description": "Conjunto com 5 panelas antiaderentes de alta durabilidade.",
      "price": 349.9,
      "category": "CasaDecoracao",
      "image_url": "https://a-static.mlcdn.com.br/1500x1500/jogo-panelas-antiaderente-ceramica-inducao-8pcs-granito-mimo-style/oliststore/mgl05mzbt3rhkm21/b375a402bf3847aab5273516c4146d47.jpeg"
    },
    {
      "id": "19",
      "name": "Câmera Fotográfica Digital",
      "description": "Câmera compacta com resolução de 20MP e zoom óptico de 10x.",
      "price": 1299.9,
      "category": "Eletronicos",
      "image_url": "https://fotografiafacil.wordpress.com/wp-content/uploads/2010/04/camera-pequena-samsung-es15-centro.jpg"
    },
    {
      "id": "20",
      "name": "Mochila Escolar",
      "description": "Mochila resistente com compartimento para notebook.",
      "price": 99.9,
      "category": "Papelaria",
      "image_url": "https://images.tcdn.com.br/img/img_prod/1119462/mochila_escolar_holografica_unicornio_magic_clio_173476642_1_7487cbec9398828c1268d39f008f6bdb.jpg"
    }
  ]);
};

