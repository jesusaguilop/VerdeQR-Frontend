import Header from '@/components/admin/header';
import { Sidebar } from '@/components/admin/sidebar';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/forest-dark.jpg')" }}
    >
      <div className="min-h-screen bg-background/80 backdrop-blur-sm">
        <Header />
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden pt-16">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
