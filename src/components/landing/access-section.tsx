import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

export default function AccessSection() {
  return (
    <section id="acceso" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline text-primary">Acceso Administrador</CardTitle>
              <CardDescription className="pt-2">
                Acceso exclusivo para administradores del sistema VerdeQR.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="admin@verdeqr.com" className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="********" className="pl-10" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Iniciar Sesión
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                <a href="#" className="underline text-muted-foreground hover:text-foreground">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
