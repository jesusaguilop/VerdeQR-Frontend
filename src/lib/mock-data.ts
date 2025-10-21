
export type Center = {
  id: number;
  name: string;
  address: string;
  status: 'Activo' | 'Inactivo';
};

export const initialCenters: Center[] = [
  {
    id: 1,
    name: 'Centro Biotecnológico del Caribe',
    address: 'Kilómetro 7, Vía a La Paz',
    status: 'Activo',
  },
  {
    id: 2,
    name: 'Centro de Innovación y Gestión Empresarial (CIGEC)',
    address: 'Calle 14 # 12-05',
    status: 'Activo',
  },
  {
    id: 3,
    name: 'Centro Agroempresarial',
    address: 'Aguachica, Cesar',
    status: 'Inactivo',
  },
];

export type EcologicalInteraction = {
    id: number;
    species: string;
    type: string;
    description: string;
    status: 'Activo' | 'Inactivo';
}

export const initialEcologicalInteractions: EcologicalInteraction[] = [
  {
    id: 1,
    species: 'Mangifera indica (Mango)',
    type: 'Polinización',
    description: 'Abejas polinizan las flores del mango.',
    status: 'Activo',
  },
  {
    id: 2,
    species: 'Guazuma ulmifolia (Guásimo)',
    type: 'Dispersión de semillas',
    description: 'El ganado y la fauna silvestre consumen sus frutos y dispersan las semillas.',
    status: 'Activo',
  },
  {
    id: 3,
    species: 'Ceiba pentandra',
    type: 'Refugio',
    description: 'Ofrece refugio a una gran variedad de animales, desde insectos hasta mamíferos y aves, en su tronco y copa.',
    status: 'Activo',
  },
];


export type ForestType = {
    id: number;
    name: string;
    description: string;
}

export const initialForestTypes: ForestType[] = [
  {
    id: 1,
    name: 'Bosque seco tropical',
    description:
      'Ecosistema con estaciones secas pronunciadas y vegetación adaptada a la falta de agua.',
  },
  {
    id: 2,
    name: 'Bosque húmedo tropical',
    description:
      'Alta biodiversidad, lluvias constantes y temperaturas cálidas durante todo el año.',
  },
  {
    id: 3,
    name: 'Bosque de galería',
    description:
      'Bosques que crecen a lo largo de los ríos en zonas áridas o semiáridas.',
  },
];


export type FunFact = {
    id: number;
    species: string;
    fact: string;
}

export const initialFunFacts: FunFact[] = [
  {
    id: 1,
    species: 'Ceiba pentandra',
    fact: 'La fibra algodonosa que rodea las semillas de la Ceiba, conocida como "kapok", es impermeable y se usaba para rellenar salvavidas y colchones.',
  },
  {
    id: 2,
    species: 'Maclura tinctoria',
    fact: 'La madera de la Mora amarilla se usaba tradicionalmente para extraer un tinte amarillo intenso para teñir textiles.',
  },
  {
    id: 3,
    species: 'Mangifera indica',
    fact: 'El mango es originario de la India y se cultiva desde hace más de 4,000 años. Es conocido como el "rey de las frutas".',
  },
];

export type Specie = {
    id: number;
    scientificName: string;
    commonName: string;
    description: string;
    status: 'Activo' | 'Inactivo';
}

export const initialSpecies: Specie[] = [
  {
    id: 1,
    scientificName: 'Mangifera indica',
    commonName: 'Mango',
    description: 'Árbol frutal de la familia Anacardiaceae, muy popular en zonas tropicales por su delicioso fruto.',
    status: 'Activo',
  },
  {
    id: 2,
    scientificName: 'Handroanthus chrysanthus',
    commonName: 'Guayacán Amarillo',
    description: 'Árbol famoso por su impresionante floración amarilla que ocurre en la estación seca, cubriendo toda la copa.',
    status: 'Activo',
  },
  {
    id: 3,
    scientificName: 'Ceiba pentandra',
    commonName: 'Ceiba',
    description: 'Árbol majestuoso y de gran tamaño, considerado sagrado en muchas culturas prehispánicas por su imponente figura.',
    status: 'Activo',
  },
  {
    id: 4,
    scientificName: 'Tabebuia sp',
    commonName: 'Cañaguate',
    description: 'Género de árboles neotropicales valorados por su espectacular floración y madera durable.',
    status: 'Activo',
  },
  {
    id: 5,
    scientificName: 'Cordia dentata',
    commonName: 'Palo noble',
    description: 'Árbol de rápido crecimiento, utilizado en restauración ecológica y como fuente de alimento para la fauna.',
    status: 'Activo',
  },
  {
    id: 6,
    scientificName: 'Senegalia polyphylla',
    commonName: 'Espino blanco',
    description: 'Árbol espinoso de la familia de las leguminosas, importante por su capacidad de fijar nitrógeno en el suelo.',
    status: 'Activo',
  },
  {
    id: 7,
    scientificName: 'Machaerium biovulatum',
    commonName: 'Rabo de iguana',
    description: 'Especie nativa de los bosques secos tropicales, con una floración vistosa y valor ecológico.',
    status: 'Activo',
  },
  {
    id: 8,
    scientificName: 'Jacquinia armillaris',
    commonName: 'Yatú',
    description: 'Arbusto o árbol pequeño resistente a la salinidad, ideal para reforestación de zonas costeras.',
    status: 'Activo',
  },
  {
    id: 9,
    scientificName: 'Guazuma ulmifolia',
    commonName: 'Guásimo',
    description: 'Árbol de tamaño mediano, apreciado por su valor forrajero y medicinal en sistemas agroforestales.',
    status: 'Activo',
  },
  {
    id: 10,
    scientificName: 'Maclura tinctoria',
    commonName: 'Mora amarilla - Tajuva',
    description: 'Conocido por su madera de la que se extrae un tinte amarillo, utilizado en ebanistería.',
    status: 'Activo',
  }
];

export type Suggestion = {
    id: number;
    name: string;
    email: string;
    suggestion: string;
    date: string;
    status: 'Pendiente' | 'Revisado' | 'Implementado';
}

export const initialSuggestions: Suggestion[] = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    suggestion: 'Deberían añadir más información sobre los usos medicinales de las plantas.',
    date: '2023-10-26',
    status: 'Pendiente',
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    suggestion: 'Me gustaría poder subir mis propias fotos de los árboles.',
    date: '2023-10-25',
    status: 'Revisado',
  },
];


export type TreeUse = {
    id: number;
    species: string;
    useName: string;
    category: string;
    status: 'Activo' | 'Inactivo';
    details?: any;
}
export const initialTreeUses: TreeUse[] = [
    { id: 1, species: 'Mangifera indica', useName: 'Consumo en fresco', category: 'Comestible', status: 'Activo' },
    { id: 2, species: 'Guazuma ulmifolia', useName: 'Forraje para ganado', category: 'Agroforestal', status: 'Activo' },
    { id: 3, species: 'Maclura tinctoria', useName: 'Ebanistería y tinte', category: 'Maderable', status: 'Activo' },
    { id: 4, species: 'Ceiba pentandra', useName: 'Ornamental y sombrío', category: 'Ornamental', status: 'Activo' },
];

export type Tree = {
    id: number;
    species: string;
    commonName: string;
    description: string;
    characteristics: string;
    ecoServices: string;
    forestType: string;
    center: string;
    status: 'Activo' | 'Inactivo';
    imageUrl: string;
}

export const initialTrees: Tree[] = [
  {
    id: 1,
    species: 'Mangifera indica',
    commonName: 'Mango',
    description: 'Árbol frutal de origen asiático, ampliamente cultivado en regiones tropicales y subtropicales por su fruto carnoso y dulce.',
    characteristics: 'Árbol perenne de gran tamaño, puede alcanzar 30m de altura. Copa densa y redondeada. Hojas lanceoladas de color verde oscuro. Flores pequeñas en panículas. Fruto tipo drupa, de color variable (verde, amarillo, rojo).',
    ecoServices: 'Fuente de alimento para fauna, producción de oxígeno, captura de carbono, y provee sombra, reduciendo la temperatura local.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/mango.jpg',
  },
  {
    id: 2,
    species: 'Handroanthus chrysanthus',
    commonName: 'Guayacán Amarillo',
    description: 'Conocido por su espectacular floración amarilla que cubre todo el árbol, anunciando la llegada de la estación seca. Es un árbol de madera muy apreciada.',
    characteristics: 'Árbol de hasta 15 metros. Hojas compuestas y palmadas. La floración ocurre una vez al año y dura pocos días, creando una alfombra de flores amarillas. Su madera es una de las más duras y pesadas.',
    ecoServices: 'Alto valor ornamental. Atrae a polinizadores como abejas y colibríes. Su madera es extremadamente resistente a la intemperie y a los insectos.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/guayaca-amarillo.jpeg',
  },
  {
    id: 3,
    species: 'Ceiba pentandra',
    commonName: 'Ceiba',
    description: 'Árbol de gran tamaño, sagrado en muchas culturas prehispánicas. Su tronco puede estar cubierto de grandes espinas cónicas.',
    characteristics: 'Puede superar los 60 metros de altura, con un tronco recto y robusto. Su copa es ancha y redondeada. Las semillas están rodeadas por una fibra algodonosa llamada kapok.',
    ecoServices: 'Es un importante refugio para la vida silvestre. La fibra de kapok se utiliza como material de relleno por ser impermeable y flotante. Es un árbol emblemático en paisajes rurales.',
    forestType: 'Bosque húmedo tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/ceiba.jpg',
  },
  {
    id: 4,
    species: 'Tabebuia sp',
    commonName: 'Cañaguate',
    description: 'Género neotropical de árboles muy valorados por su espectacular floración y madera durable. Es un símbolo de la flora de la región Caribe colombiana.',
    characteristics: 'Árbol mediano a grande, con tronco recto y corteza fisurada. Hojas compuestas y palmadas. Flores grandes en forma de trompeta, de color amarillo intenso, que aparecen en la estación seca.',
    ecoServices: 'Gran valor ornamental para parques y ciudades. Atrae a polinizadores. Su madera es usada en construcción y ebanistería por su durabilidad.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/roble.jpg', // Assuming this is Cañaguate for now
  },
  {
    id: 5,
    species: 'Cordia dentata',
    commonName: 'Palo noble',
    description: 'Árbol de rápido crecimiento y flores blancas, común en áreas perturbadas y pastizales, jugando un papel importante en la sucesión ecológica.',
    characteristics: 'Árbol de hasta 15m. Hojas simples, ásperas al tacto. Flores blancas en inflorescencias. Fruto es una drupa globosa, blanca y translúcida al madurar, con pulpa mucilaginosa y dulce, comestible.',
    ecoServices: 'Pionero en la recuperación de áreas degradadas, sus frutos son alimento para aves y otros animales, y se utiliza como cerco vivo.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/species/palo-noble.jpg',
  },
  {
    id: 6,
    species: 'Senegalia polyphylla',
    commonName: 'Espino blanco',
    description: 'Leguminosa arbórea con espinas, adaptada a zonas áridas y semiáridas, valiosa por su capacidad para fijar nitrógeno atmosférico.',
    characteristics: 'Árbol de hasta 12m con ramas espinosas. Hojas bipinnadas, de apariencia plumosa. Flores blancas o cremosas en espigas cilíndricas, muy fragantes. El fruto es una legumbre aplanada.',
    ecoServices: 'Mejora la fertilidad del suelo al fijar nitrógeno. Sus flores son melíferas, atrayendo abejas. Sirve como leña y para postes de cercas.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/species/espino-blanco.jpg',
  },
  {
    id: 7,
    species: 'Machaerium biovulatum',
    commonName: 'Rabo de iguana',
    description: 'Especie nativa de los bosques secos tropicales de América, perteneciente a la familia de las leguminosas. Es un árbol espinoso con una floración vistosa y un gran valor ecológico por su capacidad de fijar nitrógeno en el suelo.',
    characteristics: 'Árbol mediano que alcanza entre 10 y 20 metros de altura, con un tronco delgado y espinoso. Sus hojas son compuestas y alternas, y sus flores son de color púrpura o lila, agrupadas en racimos. El fruto es una legumbre aplanada y alada, que facilita su dispersión por el viento.',
    ecoServices: 'Su sistema radicular profundo contribuye al mejoramiento de la estructura del suelo y a la fijación de nitrógeno. Sus flores atraen a una gran variedad de insectos polinizadores.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/Samán.jpg', // Placeholder
  },
  {
    id: 8,
    species: 'Jacquinia armillaris',
    commonName: 'Yatú',
    description: 'Especie nativa del Caribe y América Central, perteneciente a la familia de las primuláceas. Es muy resistente a la salinidad y a las condiciones costeras, lo que la hace ideal para la reforestación de zonas litorales.',
    characteristics: 'Arbusto o árbol pequeño de entre 3 y 10 metros de altura, con hojas simples, coriáceas y brillantes. Flores pequeñas, blancas y fragantes. El fruto es una baya globosa de color naranja o rojo al madurar.',
    ecoServices: 'Ayuda en la protección de suelos costeros, sirve como refugio y alimento para aves y otros animales, y tiene un alto valor ornamental por su follaje perenne y sus frutos coloridos.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/species/yatu.jpg',
  },
  {
    id: 9,
    species: 'Guazuma ulmifolia',
    commonName: 'Guásimo',
    description: 'Árbol nativo de América tropical, reconocido por sus múltiples usos en sistemas agroforestales, medicina tradicional y como alimento para el ganado.',
    characteristics: 'Altura de hasta 20m. Copa ancha y extendida. Corteza grisácea. Hojas simples, alternas, con borde aserrado. Flores amarillentas. Fruto es una cápsula leñosa, globosa y negra al madurar, cubierta de protuberancias.',
    ecoServices: 'Mejora y protege el suelo, sus frutos y hojas son forraje para la fauna y el ganado, atrae polinizadores y se usa en reforestación.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/species/guasimo.jpg',
  },
  {
    id: 10,
    species: 'Maclura tinctoria',
    commonName: 'Mora amarilla - Tajuva',
    description: 'Árbol espinoso conocido por su madera de color amarillo de la cual se extrae un tinte natural. Es una especie dioica, con individuos masculinos y femeninos.',
    characteristics: 'Árbol de tamaño mediano, hasta 20m, con espinas en el tronco y ramas. Hojas simples, alternas y de borde liso. Inflorescencias globosas. El fruto es un sincarpo carnoso y de aspecto similar a una naranja arrugada, de color verde-amarillento.',
    ecoServices: 'La madera es resistente a la pudrición, usada en postes. El tinte "fustete" se usa en artesanías. Sus frutos alimentan a la fauna silvestre.',
    forestType: 'Bosque seco tropical',
    center: 'Centro Biotecnológico del Caribe',
    status: 'Activo',
    imageUrl: '/img/species/mora-amarilla.jpg',
  }
];


export type User = {
    name: string;
    email: string;
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive';
}

export const initialUsers: User[] = [
  {
    name: 'Sergio Beleño',
    email: 'sergiosabh05@gmail.com',
    role: 'Admin',
    status: 'Active',
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'User',
    status: 'Active',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'User',
    status: 'Inactive',
  },
];

export type GeneratedQr = {
    id: number;
    treeId: number;
    qrCodeDataUrl: string;
}

export const initialGeneratedQrs: GeneratedQr[] = [];
