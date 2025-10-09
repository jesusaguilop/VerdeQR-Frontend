'use client';

import Link from "next/link";
import { Trees, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { SenaLogo } from "@/components/icons/sena-logo";

const quickLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Árboles', href: '#arboles' },
  { name: 'Centros', href: '#centros' },
  { name: 'Sugerencias', href: '#' },
];

const contactLinks = [
    { name: 'Soporte técnico', href: 'mailto:soporte.verdeqr@sena.edu.co' },
    { name: 'Preguntas frecuentes', href: '#' },
    { name: 'Reportar problema', href: '#' },
];

const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Youtube, href: '#', name: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="flex items-center justify-center h-24 w-24 rounded-full bg-background p-4 border border-border shadow-sm">
                <Trees className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-headline">VerdeQR</h3>
            <p className="text-sm text-muted-foreground">
              Plataforma de conservación y conocimiento de la flora colombiana.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg text-primary mb-4">Enlaces rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg text-primary mb-4">Contacto</h3>
             <ul className="space-y-3">
              {contactLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
             <h3 className="font-bold text-lg text-primary mb-4">Síguenos</h3>
             <div className="flex justify-center md:justify-start space-x-4">
                {socialLinks.map(social => (
                    <Link key={social.name} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                        <social.icon className="h-6 w-6" />
                        <span className="sr-only">{social.name}</span>
                    </Link>
                ))}
             </div>
             <div className="mt-8 flex flex-col items-center md:items-start">
                <h3 className="font-bold text-lg text-primary mb-4">Apoyado por</h3>
                <SenaLogo className="h-16 w-16 text-primary" />
            </div>
          </div>
          
        </div>
        <div className="mt-12 border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} VerdeQR. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
