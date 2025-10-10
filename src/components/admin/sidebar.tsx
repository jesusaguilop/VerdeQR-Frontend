'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, TreePine, Building, BadgeHelp } from 'lucide-react';

const routes = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/management',
    label: 'Gestión',
    icon: Users,
  },
  {
    href: '#',
    label: 'Árboles',
    icon: TreePine,
  },
  {
    href: '#',
    label: 'Centros',
    icon: Building,
  },
  {
    href: '#',
    label: 'Sugerencias',
    icon: BadgeHelp,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 pt-8">
            {routes.map((route) => (
              <Link
                key={route.label}
                href={route.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  pathname === route.href && 'bg-muted text-primary'
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
