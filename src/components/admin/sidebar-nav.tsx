
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  TreePine,
  Building,
  Users,
  BadgeHelp,
  Settings,
  Sprout,
  Beaker,
  Mountain,
  Sparkles,
  Bug,
  QrCode,
  Package2,
} from 'lucide-react';
import { SheetClose } from '../ui/sheet';
import { cn } from '@/lib/utils';

const mainRoutes = [
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
  isMobile?: boolean;
};

const NavLink = ({
  route,
  pathname,
  isMobile = false,
}: {
  route: { href: string; label: string; icon: React.ElementType };
  pathname: string;
  isMobile?: boolean;
}) => {
  const LinkComponent = (
    <Link href={route.href} className="flex items-center gap-4 px-2.5">
      <route.icon className="h-5 w-5" />
      <span>{route.label}</span>
    </Link>
  );

  if (isMobile) {
    return (
      <SheetClose asChild key={route.href}>
        {LinkComponent}
      </SheetClose>
    );
  }

  return (
    <SidebarMenuItem key={route.href}>
      <SidebarMenuButton
        asChild
        isActive={pathname.startsWith(route.href)}
        tooltip={{ children: route.label }}
      >
        <Link href={route.href}>
          <route.icon />
          <span>{route.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
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
        {mainRoutes.map((route) => (
           <SheetClose asChild key={route.href}>
            <Link href={route.href} className={cn('flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground', pathname.startsWith(route.href) && 'text-foreground')}>
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
    <div className="flex flex-col h-full">
      <SidebarMenu className="flex-1">
        <Link
          href="/admin/management"
          className="group flex h-9 w-9 mb-4 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">VerdeQR</span>
        </Link>
        {mainRoutes.map((route) => (
          <NavLink key={route.href} route={route} pathname={pathname} />
        ))}
      </SidebarMenu>
      <SidebarMenu className="mt-auto">
        <NavLink route={settingsRoute} pathname={pathname} />
      </SidebarMenu>
    </div>
  );
}
