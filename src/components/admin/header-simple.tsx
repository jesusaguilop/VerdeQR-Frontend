'use client';

import Link from 'next/link';
import { MainNavSimple } from '@/components/admin/main-nav-simple';
import { UserNav } from '@/components/admin/user-nav';
import { Menu, Trees } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '../ui/button';

export default function HeaderSimple() {
  return (
    <div className="border-b bg-background">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 container mx-auto">
        <Link href="/admin" className="flex items-center gap-2 mr-6">
          <img
            src="/img/VerdeQr-Logo.png"
            alt="VerdeQR Logo"
            className="h-10 w-auto object-contain"
          />
          <span className="font-bold hidden sm:inline-block">VerdeQR Admin</span>
        </Link>
        <MainNavSimple className="hidden md:flex" />

        <div className="ml-auto flex items-center space-x-2">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">Menú Principal</SheetTitle>
                <SheetDescription className="sr-only">Navegación principal del panel de administración.</SheetDescription>
                <nav className="grid gap-6 text-lg font-medium p-4">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Trees className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">VerdeQR</span>
                  </Link>
                  <SheetClose asChild>
                    <Link
                      href="/admin/management"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      Gestión
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <UserNav />
        </div>
      </div>
    </div>
  );
}
