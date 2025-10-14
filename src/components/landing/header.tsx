

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Trees,
  X,
  LogIn,
  Home,
  Sparkles,
  Building2,
  TreePine,
  Users,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: 'Inicio', href: '/', icon: Home },
  { name: 'Beneficios', href: '#beneficios', icon: Sparkles },
  { name: 'Centros', href: '#centros', icon: Building2 },
  { name: 'Árboles', href: '#arboles', icon: TreePine },
  { name: 'Comunidad', href: '#comunidad', icon: Users },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = navLinks.map(link => link.href.substring(1)).filter(id => id && !id.startsWith('/'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [isHomePage]);

  const getLinkHref = (href: string) => {
    if (isHomePage) return href;
    return href.startsWith('#') ? `/${href}` : href;
  };

  const navItems = navLinks.map(link => {
    if (link.href === '/') {
      return { ...link, href: getLinkHref(link.href) };
    }
    return link.href.startsWith('#') && !isHomePage
      ? { ...link, href: `/${link.href}` }
      : link;
  });


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="VerdeQR Home">
          <img
            src="/img/VerdeQr-Logo.png"
            alt="VerdeQR Logo"
            className="h-14 w-auto object-contain"
          />
          <span className="text-2xl font-bold font-headline text-[#2E7D32]">
            Verde
            <span className="text-[#5C3A1E]">QR</span>
          </span>

        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative flex items-center gap-2",
                isHomePage && (activeSection === link.href.substring(1) || (link.href === '/' && activeSection === 'inicio')) && "text-primary"
              )}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.name}</span>
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                  isHomePage && (activeSection === link.href.substring(1) || (link.href === '/' && activeSection === 'inicio')) ? "w-4/5" : "w-0"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Acceder
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/login" aria-label="Acceder">
              <LogIn className="h-6 w-6" />
            </Link>
          </Button>
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
               <SheetTitle className="sr-only">Menú Principal</SheetTitle>
               <SheetDescription className="sr-only">Navegación principal del sitio.</SheetDescription>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <Trees className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold font-headline">VerdeQR</span>
                  </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                        <X className="h-6 w-6" />
                        <span className="sr-only">Cerrar menú</span>
                    </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col items-start gap-4 mt-8">
                  {navItems.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors w-full text-left py-2 flex items-center gap-3"
                      >
                         <link.icon className="h-5 w-5" />
                        <span>{link.name}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
