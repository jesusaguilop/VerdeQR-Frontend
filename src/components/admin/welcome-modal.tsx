'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const managementTasks = [
  'Gestiona los árboles registrados en el sistema',
  'Administra los centros educativos',
  'Configura los tipos de árbol y sus usos',
  'Genera códigos QR para los árboles',
  'Revisa y responde sugerencias de usuarios',
  'Administra los usuarios del sistema',
];

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open the modal automatically on component mount
    setIsOpen(true);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Bienvenido al Panel de Gestión
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            Desde aquí podrás administrar todos los aspectos de la aplicación
            VerdeQR.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ul className="space-y-3">
            {managementTasks.map((task) => (
              <li key={task} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{task}</span>
              </li>
            ))}
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)}>Entendido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
