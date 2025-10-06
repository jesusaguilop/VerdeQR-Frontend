import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function AccessSection() {
  return (
    <section id="acceso" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline text-primary">Acceso al Sistema</CardTitle>
              <CardDescription className="pt-2">
                Ingresa a tu cuenta o crea una nueva para administrar el contenido de VerdeQR.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/login">
                  Iniciar Sesión
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/register">
                  Registrarse
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
