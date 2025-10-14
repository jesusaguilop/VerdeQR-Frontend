'use client';

import {
  TooltipProvider,
} from '@/components/ui/tooltip';
import { SidebarNav } from './sidebar-nav';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function AdminSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TooltipProvider>
       <aside
        className={cn(
          "fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex transition-all duration-300 ease-in-out",
          isExpanded && "w-56"
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <SidebarNav isExpanded={isExpanded} />
      </aside>
    </TooltipProvider>
  );
}
