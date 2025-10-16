
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
    species: 'Handroanthus chrysanthus (Guayacán)',
    type: 'Dispersión de semillas',
    description: 'El viento dispersa las semillas aladas del Guayacán.',
    status: 'Activo',
  },
  {
    id: 3,
    species: 'Ceiba pentandra (Ceiba)',
    type: 'Herbivoría',
    description: 'Las hormigas cortadoras de hojas atacan los brotes jóvenes.',
    status: 'Inactivo',
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
    species: 'Ceiba pentandra (Ceiba)',
    fact: 'La Ceiba era considerada un árbol sagrado por los mayas, quienes creían que conectaba el cielo, la tierra y el inframundo.',
  },
  {
    id: 2,
    species: 'Handroanthus chrysanthus (Guayacán)',
    fact: 'El Guayacán puede tardar hasta 10 años en florecer por primera vez, pero cuando lo hace, el espectáculo es inolvidable.',
  },
  {
    id: 3,
    species: 'Mangifera indica (Mango)',
    fact: 'El mango es originario de la India y se cultiva desde hace más de 4,000 años. Es conocido como el "rey de las frutas".',
  },
];

export type Specie = {
    id: number;
    scientificName: string;
    commonName: string;
    description: string;
}

export const initialSpecies: Specie[] = [
  {
    id: 1,
    scientificName: 'Mangifera indica',
    commonName: 'Mango',
    description: 'Árbol frutal de la familia Anacardiaceae, muy popular en zonas tropicales.',
  },
  {
    id: 2,
    scientificName: 'Handroanthus chrysanthus',
    commonName: 'Guayacán Amarillo',
    description: 'Árbol ornamental famoso por su espectacular floración amarilla.',
  },
  {
    id: 3,
    scientificName: 'Ceiba pentandra',
    commonName: 'Ceiba',
    description: 'Árbol de gran tamaño, considerado sagrado en diversas culturas americanas.',
  },
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
  {
    id: 3,
    name: 'Luisa Fernández',
    email: 'luisa.fernandez@email.com',
    suggestion: 'Falta información del árbol "Dividivi".',
    date: '2023-10-24',
    status: 'Implementado',
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
    { id: 1, species: 'Mangifera indica (Mango)', useName: 'Consumo en fresco', category: 'Comestible', status: 'Activo' },
    { id: 2, species: 'Handroanthus chrysanthus (Guayacán)', useName: 'Construcción de vigas', category: 'Maderable', status: 'Activo' },
    { id: 3, species: 'Ceiba pentandra (Ceiba)', useName: 'Uso en ceremonias', category: 'Cultural/Ceremonial', status: 'Inactivo' },
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
}

export const initialTrees: Tree[] = [
  {
    id: 9,
    species: 'Tabebuia sp',
    commonName: 'Cañaguate',
    description: 'Género neotropical de árboles muy valorados...',
    characteristics: 'Árbol mediano a grande que alcanza entre 10 y...',
    ecoServices: 'Contribuye a la belleza paisajística y...',
    forestType: 'Bosque seco tropical',
    center: 'Centro biotecnológico del caribe',
    status: 'Activo',
  },
  {
    id: 8,
    species: 'Jacquinia armillaris',
    commonName: 'Yatu',
    description: 'Especie nativa del Caribe y América Central....',
    characteristics: 'Arbusto o árbol pequeño de entre 3 y 10 metros...',
    ecoServices: 'Ayuda en la protección de suelos costeros...',
    forestType: 'Bosque seco tropical',
    center: 'Centro biotecnológico del caribe',
    status: 'Activo',
  },
  {
    id: 7,
    species: 'Machaerium biovulatum',
    commonName: 'Rabo de iguana',
    description: 'Especie nativa de los bosques secos tropicales...',
    characteristics: 'Árbol mediano que alcanza entre 10 y 20 metros...',
    ecoServices: 'Su sistema radicular profundo contribuye al...',
    forestType: 'Bosque seco tropical',
    center: 'Centro biotecnológico del caribe',
    status: 'Activo',
  },
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
