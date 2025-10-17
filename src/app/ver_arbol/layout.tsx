
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

export default function TreeDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 bg-background/90">{children}</main>
      <Footer />
    </div>
  );
}
