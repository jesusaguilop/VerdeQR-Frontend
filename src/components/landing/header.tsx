"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Trees, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { navLinks } from "@/lib/data";
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";

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
          <Trees className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-foreground">VerdeQR</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {navItems.filter(l => l.name !== 'Acceder').map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative",
                isHomePage && (activeSection === link.href.substring(1) || (link.href === '/' && activeSection === 'inicio')) && "text-primary"
              )}
            >
              {link.name}
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
             <Link href="/login">Acceder</Link>
          </Button>
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
                  {navItems.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors w-full text-left py-2"
                        >
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
