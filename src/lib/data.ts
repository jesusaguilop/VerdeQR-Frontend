import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Beneficios', href: '#beneficios' },
  { name: 'Centros', href: '#centros' },
  { name: 'Árboles', href: '#arboles' },
  { name: 'Comunidad', href: '#comunidad' },
  { name: 'Acceder', href: '/login' },
];

export const centers = [
  {
    name: 'Centro Biotecnológico del Caribe (CBC)',
    location: 'Valledupar, Cesar',
    image: getImage('cbc-campus'),
  },
  {
    name: 'Centro de Innovación y Gestión Empresarial (CIGE)',
    location: 'Duitama, Boyacá',
    image: getImage('cigec-campus'),
  },
];

export const trees = [
  {
    commonName: 'Ceiba',
    scientificName: 'Ceiba pentandra',
    description: 'Árbol de gran tamaño, sagrado en muchas culturas prehispánicas.',
    image: getImage('tree-1'),
  },
  {
    commonName: 'Guayacán Amarillo',
    scientificName: 'Handroanthus chrysanthus',
    description: 'Conocido por su espectacular floración amarilla que cubre el árbol.',
    image: getImage('tree-2'),
  },
  {
    commonName: 'Roble',
    scientificName: 'Quercus humboldtii',
    description: 'Especie nativa de los Andes, clave para la conservación de bosques.',
    image: getImage('tree-3'),
  },
  {
    commonName: 'Samán',
    scientificName: 'Samanea saman',
    description: 'Famoso por su amplia copa que proporciona una extensa sombra.',
    image: getImage('tree-4'),
  },
];
