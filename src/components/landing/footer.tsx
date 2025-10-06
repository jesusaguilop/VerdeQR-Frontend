import { SenaLogo } from "@/components/icons/sena-logo";
import { Trees } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <Trees className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold font-headline text-foreground">VerdeQR</span>
            </div>
            <p className="text-muted-foreground">Un proyecto para la identificación de la flora en los centros SENA.</p>
          </div>
          <div className="text-muted-foreground">
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <p>Email: <a href="mailto:verdeqr@sena.edu.co" className="hover:text-primary">verdeqr@sena.edu.co</a></p>
            <p>Centro Biotecnológico del Caribe</p>
          </div>
          <div className="flex flex-col items-center md:items-end">
             <h3 className="font-semibold text-foreground mb-4">Apoyado por</h3>
             <SenaLogo className="h-16 w-16 text-primary" />
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 VerdeQR – Centro Biotecnológico del Caribe (SENA)</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Política de Privacidad</a>
            <a href="#" className="hover:text-primary">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
