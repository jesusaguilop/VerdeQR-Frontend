'use client';

import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <WifiOff className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-4xl font-bold text-primary mb-2">Sin Conexión a Internet</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        Parece que no estás conectado a internet. Esta página no se pudo cargar porque no estaba guardada en el caché.
      </p>
      <p className="mt-4 text-sm text-muted-foreground">
        Por favor, revisa tu conexión y vuelve a intentarlo.
      </p>
    </div>
  );
}
