'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { QrCode } from 'lucide-react';
import QrScanner from './qr-scanner';

export default function HeroSection() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const heroBgDark = PlaceHolderImages.find((p) => p.id === 'hero-background-dark');
  const heroBgLight = PlaceHolderImages.find((p) => p.id === 'hero-background-light');

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const showDark = mounted && currentTheme === 'dark';

  return (
    <section id="inicio" className="relative h-screen min-h-[700px] flex items-center justify-center pt-20">
      {heroBgDark && (
        <Image
          src={heroBgDark.imageUrl}
          alt={heroBgDark.description}
          fill
          className={cn(
            'object-cover transition-opacity duration-500',
            showDark ? 'opacity-100' : 'opacity-0'
          )}
          priority
          quality={80}
          data-ai-hint={heroBgDark.imageHint}
        />
      )}
      
      {heroBgLight && (
         <Image
          src={heroBgLight.imageUrl}
          alt={heroBgLight.description}
          fill
          className={cn(
            'object-cover transition-opacity duration-500',
             !showDark ? 'opacity-100' : 'opacity-0'
          )}
          priority
          quality={80}
          data-ai-hint={heroBgLight.imageHint}
        />
      )}

      {!mounted && heroBgLight && (
         <Image
          src={heroBgLight.imageUrl}
          alt={heroBgLight.description}
          fill
          className="object-cover"
          priority
          quality={80}
          data-ai-hint={heroBgLight.imageHint}
        />
      )}


      <div className="absolute inset-0 bg-background/80 dark:bg-background/80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-extrabold font-headline text-primary tracking-tight">
                Descubre la naturaleza, <br /> escanea un árbol
              </h1>
              <p className="mt-6 text-lg text-foreground max-w-2xl mx-auto lg:mx-0">
                Con VerdeQR, puedes escanear códigos para obtener información detallada sobre los árboles que encuentres en tu camino, explorar consejos y aprender sobre la vida que te rodea.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <Link href="#arboles">Explorar Árboles</Link>
                </Button>
                 <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-background/50 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  <Link href="#beneficios">
                    <QrCode className="mr-2 h-5 w-5" />
                    Conocer más
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center mt-8 lg:mt-0">
              <QrScanner />
            </div>
          </div>
      </div>
    </section>
  );
}
