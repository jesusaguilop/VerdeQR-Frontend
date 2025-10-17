import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/theme-provider';
import FloatingPlants from '@/components/landing/floating-plants';
import QrScannerModal from '@/components/shared/qr-scanner-modal';

export const metadata: Metadata = {
  title: 'VerdeQR - Identifica la Naturaleza',
  description: 'Identifica árboles silvestres al instante con VerdeQR en los Centros de Formación del SENA.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/img/VerdeQr-Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#4CAF50" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/img/icons/icon-192x192.png"></link>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingPlants />
          {children}
          <Toaster />
          <QrScannerModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
