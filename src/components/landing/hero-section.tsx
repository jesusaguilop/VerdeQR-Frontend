import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import QrScanner from "./qr-scanner";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HeroSection() {
  const heroBg = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center pt-20">
      {heroBg && (
        <Image
          src={heroBg.imageUrl}
          alt={heroBg.description}
          fill
          className="object-cover"
          priority
          quality={80}
          data-ai-hint={heroBg.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-start">
            <QrScanner />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold font-headline text-primary tracking-tight">
              ¡Identificar árboles silvestres!
            </h1>
            <p className="mt-4 text-lg text-foreground max-w-xl mx-auto md:mx-0">
              Identifica árboles silvestres al instante. Explora consejos e información sobre la vida de los árboles que te rodean.
            </p>
            <p className="mt-2 text-md text-muted-foreground max-w-xl mx-auto md:mx-0">
              Con VerdeQR, puedes escanear códigos QR para obtener información detallada sobre los árboles que encuentres en tu camino.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-105">
              <Link href="#arboles">Explorar Árboles</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
