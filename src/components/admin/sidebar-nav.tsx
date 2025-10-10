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
} from 'lucide-react';
import { SheetClose } from '../ui/sheet';

const routes = [
  { href: '/admin/management', label: 'Inicio', icon: Home },
  { href: '/admin/management/trees', label: 'Árboles', icon: TreePine },
  { href: '/admin/management/centers', label: 'Centros', icon: Building },
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

const NavLink = ({
  route,
  pathname,
  isMobile,
}: {
  route: typeof routes[0];
  pathname: string;
  isMobile: boolean;
}) => {
  const linkContent = (
    <Link
      href={route.href}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
        pathname.startsWith(route.href) && 'bg-accent text-accent-foreground'
      )}
    >
      <route.icon className="h-5 w-5" />
      <span className="sr-only">{route.label}</span>
    </Link>
  );

  const mobileLink = <SheetClose asChild>{linkContent}</SheetClose>;

  const desktopLink = (
    <Tooltip>
      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
      <TooltipContent side="right">{route.label}</TooltipContent>
    </Tooltip>
  );

  return isMobile ? mobileLink : desktopLink;
};

export function SidebarNav({ isMobile = false }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full">
        {!isMobile && (
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">VerdeQR</span>
            </Link>
            {routes.map((route) => (
              <NavLink
                key={route.href}
                route={route}
                pathname={pathname}
                isMobile={false}
              />
            ))}
          </nav>
        )}
        <nav
          className={cn(
            'mt-auto flex flex-col items-center gap-4 px-2 sm:py-5',
            { 'mt-0': isMobile }
          )}
        >
          <NavLink route={settingsRoute} pathname={pathname} isMobile={isMobile} />
        </nav>
      </div>
    </TooltipProvider>
  );
}
