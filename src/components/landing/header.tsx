"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, Trees, X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
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
  }, []);

  const internalLinks = navLinks.filter(link => link.href.startsWith('#'));
  const externalLinks = navLinks.filter(link => !link.href.startsWith('#'));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="VerdeQR Home">
          <Trees className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-foreground">VerdeQR</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {internalLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={cn(
                "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative",
                activeSection === link.href.substring(1) && "text-primary"
              )}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
            {externalLinks.map((link) => (
              <Button asChild key={link.name} variant="ghost">
                <Link href={link.href}>
                  <UserCircle className="mr-2" /> {link.name}
                </Link>
              </Button>
            ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
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
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link 
                        href={link.href} 
                        className={cn(
                            "text-lg font-medium text-muted-foreground hover:text-primary transition-colors w-full text-left py-2 flex items-center gap-3",
                            link.name === 'Acceso' && "bg-primary/5 rounded-md px-3"
                        )}
                        >
                         {link.name === 'Acceso' && <UserCircle />}
                        {link.name}
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
