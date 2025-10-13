'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  Home,
  TreePine,
  Building,
  Users,
  BadgeHelp,
  Settings,
  Package2,
  Sprout,
  Beaker,
  Mountain,
  Sparkles,
  Bug,
  QrCode,
} from 'lucide-react';
import { SheetClose } from '../ui/sheet';

const routes = [
  { href: '/admin/management', label: 'Inicio', icon: Home },
  { href: '/admin/management/trees', label: 'Árboles', icon: TreePine },
  { href: '/admin/management/centers', label: 'Centros', icon: Building },
  { href: '/admin/management/species', label: 'Especies', icon: Sprout },
  { href: '/admin/management/tree-uses', label: 'Usos de Árbol', icon: Beaker },
  {
    href: '/admin/management/forest-types',
    label: 'Tipos de Bosque',
    icon: Mountain,
  },
  {
    href: '/admin/management/fun-facts',
    label: 'Curiosidades',
    icon: Sparkles,
  },
  {
    href: '/admin/management/ecological-interactions',
    label: 'Interacciones',
    icon: Bug,
  },
  {
    href: '/admin/management/qr-code',
    label: 'Código QR',
    icon: QrCode,
  },
  { href: '/admin/management/users', label: 'Usuarios', icon: Users },
  {
    href: '/admin/management/suggestions',
    label: 'Sugerencias',
    icon: BadgeHelp,
  },
];

const settingsRoute = {
  href: '/admin/management/settings',
  label: 'Configuración',
  icon: Settings,
};

type SidebarNavProps = {
  isMobile: boolean;
};

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  if (isMobile) {
    return (
      <nav className="grid gap-6 text-lg font-medium p-4">
        <Link
          href="#"
          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
        >
          <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">VerdeQR</span>
        </Link>
        {routes.map((route) => (
          <SheetClose asChild key={route.href}>
            <Link
              href={route.href}
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                pathname.startsWith(route.href) && 'text-foreground'
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          </SheetClose>
        ))}
        <SheetClose asChild>
           <Link href={settingsRoute.href} className={cn('flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground', pathname.startsWith(settingsRoute.href) && 'text-foreground')}>
              <settingsRoute.icon className="h-5 w-5" />
              {settingsRoute.label}
            </Link>
        </SheetClose>
      </nav>
    );
  }

  return (
    <TooltipProvider>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">VerdeQR</span>
        </Link>
        {routes.map((route) => (
          <Tooltip key={route.href}>
            <TooltipTrigger asChild>
              <Link
                href={route.href}
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                  pathname.startsWith(route.href) &&
                    'bg-accent text-accent-foreground'
                )}
              >
                <route.icon className="h-5 w-5" />
                <span className="sr-only">{route.label}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{route.label}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={settingsRoute.href}
              className={cn('flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8', pathname.startsWith(settingsRoute.href) && 'bg-accent text-accent-foreground')}
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configuración</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configuración</TooltipContent>
        </Tooltip>
      </nav>
    </TooltipProvider>
  );
}
