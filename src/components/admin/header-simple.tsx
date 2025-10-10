import Link from 'next/link';
import { MainNavSimple } from '@/components/admin/main-nav-simple';
import { UserNav } from '@/components/admin/user-nav';
import { Trees } from 'lucide-react';

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
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
}
