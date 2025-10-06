import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function CommunitySection() {
  return (
    <section id="comunidad" className="py-20 lg:py-32 bg-primary/5">
      <div className="container mx-auto px-4 text-center">
        <Users className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
          Únete a la Comunidad VerdeQR
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          Forma parte de una comunidad apasionada por la naturaleza y la tecnología. Comparte tus descubrimientos, aprende de otros y contribuye a un futuro más verde.
        </p>
        <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-105">
          <Link href="/register">
            Regístrate Ahora
          </Link>
        </Button>
      </div>
    </section>
  );
}
