'use client';

import { AdminSidebar } from '@/components/admin/sidebar';
import Header from '@/components/admin/header';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <>
      <AdminSidebar onStateChange={setIsSidebarExpanded} />
      <div
        className={cn(
          'flex flex-col sm:gap-4 sm:py-4 transition-[padding]',
          isSidebarExpanded ? 'sm:pl-56' : 'sm:pl-14'
        )}
      >
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </>
  );
}
