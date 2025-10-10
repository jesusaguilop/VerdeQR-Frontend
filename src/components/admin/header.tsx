import Link from 'next/link';
import { MainNav } from '@/components/admin/main-nav';
import { Search } from '@/components/admin/search';
import { UserNav } from '@/components/admin/user-nav';
import { Trees } from 'lucide-react';

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-20 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4">
        <Link href="/admin" className="flex items-center gap-2 mr-6">
            <img
                src="/img/VerdeQr-Logo.png"
                alt="VerdeQR Logo"
                className="h-10 w-auto object-contain"
            />
        </Link>
        <MainNav className="hidden md:flex" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}
