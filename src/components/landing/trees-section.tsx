import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const trees = [
  {
    commonName: 'Ceiba',
    scientificName: 'Ceiba pentandra',
    description: 'Árbol de gran tamaño, sagrado en muchas culturas prehispánicas.',
    image: {
      path: '/ceiba.jpg',
      alt: 'A tall Ceiba Pentandra tree.',
      hint: 'tall tree',
    },
  },
  {
    commonName: 'Guayacán Amarillo',
    scientificName: 'Handroanthus chrysanthus',
    description: 'Conocido por su espectacular floración amarilla que cubre el árbol.',
    image: {
      path: '/guayacan.jpg',
      alt: 'A flowering Guayacán tree.',
      hint: 'flowering tree',
    },
  },
  {
    commonName: 'Roble',
    scientificName: 'Quercus humboldtii',
    description: 'Especie nativa de los Andes, clave para la conservación de bosques.',
    image: {
      path: '/roble.jpg',
      alt: 'A robust Oak tree.',
      hint: 'oak tree',
    },
  },
  {
    commonName: 'Samán',
    scientificName: 'Samanea saman',
    description: 'Famoso por su amplia copa que proporciona una extensa sombra.',
    image: {
      path: '/saman.jpg',
      alt: 'A Saman tree with a wide canopy.',
      hint: 'saman tree',
    },
  },
];


export default function TreesSection() {
  return (
    <section id="arboles" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Árboles Registrados
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Descubre la diversidad de especies que puedes encontrar en los campus del SENA.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trees.map((tree) => (
            <Card key={tree.commonName} className="flex flex-col group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {tree.image && (
                <div className="aspect-w-4 aspect-h-5 overflow-hidden">
                  <Image
                    src={tree.image.path}
                    alt={tree.image.alt}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={tree.image.hint}
                  />
                </div>
              )}
              <CardHeader className="flex-grow">
                <CardTitle className="font-headline text-xl">{tree.commonName}</CardTitle>
                <CardDescription className="italic">{tree.scientificName}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{tree.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                  Ver más
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
