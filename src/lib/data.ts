import type { LocalImage } from './images';
import { getImageById } from './images';

export const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Beneficios', href: '#beneficios' },
  { name: 'Centros', href: '#centros' },
  { name: 'Árboles', href: '#arboles' },
  { name: 'Comunidad', href: '#comunidad' },
  { name: 'Acceder', href: '/login' },
];

export const centers: { name: string, location: string, image: LocalImage }[] = [
  {
    name: 'Centro Biotecnológico del Caribe (CBC)',
    location: 'Valledupar, Cesar',
    image: getImageById('cbc-campus'),
  },
  {
    name: 'Centro de Innovación y Gestión Empresarial (CIGEC)',
    location: 'Valledupar, Cesar',
    image: getImageById('cigec-campus'),
  },
];

export const trees: { commonName: string, scientificName: string, description: string, image: LocalImage }[] = [
  {
    commonName: 'Ceiba',
    scientificName: 'Ceiba pentandra',
    description: 'Árbol de gran tamaño, sagrado en muchas culturas prehispánicas.',
    image: getImageById('tree-ceiba'),
  },
  {
    commonName: 'Guayacán Amarillo',
    scientificName: 'Handroanthus chrysanthus',
    description: 'Conocido por su espectacular floración amarilla que cubre el árbol.',
    image: getImageById('tree-guayacan'),
  },
  {
    commonName: 'Roble',
    scientificName: 'Quercus humboldtii',
    description: 'Especie nativa de los Andes, clave para la conservación de bosques.',
    image: getImageById('tree-roble'),
  },
  {
    commonName: 'Samán',
    scientificName: 'Samanea saman',
    description: 'Famoso por su amplia copa que proporciona una extensa sombra.',
    image: getImageById('tree-saman'),
  },
];
