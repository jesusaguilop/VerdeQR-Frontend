// @/lib/images.ts

/**
 * This file is the single source of truth for all local images in the application.
 * To add a new image:
 * 1. Add the image file to the `public` directory.
 * 2. Add a new entry to the `localImages` object below.
 *
 * The `id` should be a unique identifier for the image.
 * The `path` should be the absolute path to the image file from the `public` directory (e.g., '/image-name.jpg').
 * The `alt` should be a descriptive text for accessibility.
 * The `hint` is used for AI-powered features.
 */
export type LocalImage = {
  id: string;
  path: string;
  alt: string;
  hint: string;
};

export const localImages = {
  // Hero Section
  'hero-background-dark': {
    id: 'hero-background-dark',
    path: '/forest-dark.jpg',
    alt: 'A beautiful path in a forest with tall trees at night.',
    hint: 'forest path',
  },
  'hero-background-light': {
    id: 'hero-background-light',
    path: '/forest-light.jpg',
    alt: 'A sunlit forest path with vibrant green trees.',
    hint: 'sunlit forest',
  },

  // Centers
  'cbc-campus': {
    id: 'cbc-campus',
    path: '/cbc.png',
    alt: 'Campus of Centro Biotecnológico del Caribe',
    hint: 'university campus',
  },
  'cigec-campus': {
    id: 'cigec-campus',
    path: '/CIGEC.jpeg',
    alt: 'Campus of Centro de Innovación de Gestión Empresarial y Cultural',
    hint: 'modern building',
  },

  // Trees
  'tree-ceiba': {
    id: 'tree-ceiba',
    path: '/ceiba.jpg',
    alt: 'A tall Ceiba Pentandra tree.',
    hint: 'tall tree',
  },
  'tree-guayacan': {
    id: 'tree-guayacan',
    path: '/guayacan.jpg',
    alt: 'A flowering Guayacán tree.',
    hint: 'flowering tree',
  },
  'tree-roble': {
    id: 'tree-roble',
    path: '/roble.jpg',
    alt: 'A robust Oak tree.',
    hint: 'oak tree',
  },
  'tree-saman': {
    id: 'tree-saman',
    path: '/saman.jpg',
    alt: 'A Saman tree with a wide canopy.',
    hint: 'saman tree',
  },
} as const satisfies Record<string, LocalImage>;

// Helper function to get an image by its ID.
// This provides type safety and ensures we only try to access images that have been defined.
export function getImageById(id: keyof typeof localImages): LocalImage {
  return localImages[id];
}
