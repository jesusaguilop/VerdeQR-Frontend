'use client';

import Header from '@/components/admin/header';
import { AdminSidebar } from '@/components/admin/sidebar';
import { ManagementProvider } from '@/components/admin/management-provider';

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ManagementProvider>
      <AdminSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 transition-[padding] sm:pl-14 group-[.is-expanded]/provider:sm:pl-56">
        <Header />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </ManagementProvider>
  );
}
