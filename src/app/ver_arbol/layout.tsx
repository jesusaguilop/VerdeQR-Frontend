
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import { ManagementProvider } from "@/components/admin/management-provider";

export default function TreeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ManagementProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow pt-20 bg-background/90">{children}</main>
          <Footer />
        </div>
    </ManagementProvider>
  );
}
