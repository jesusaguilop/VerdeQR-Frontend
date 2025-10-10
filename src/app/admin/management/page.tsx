'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { WelcomeModal } from '@/components/admin/welcome-modal';

export default function ManagementPage() {
  return (
    <>
      <WelcomeModal />
      <div className="space-y-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Panel de Gestión</CardTitle>
            <CardDescription>
              Selecciona una opción del menú de la izquierda para empezar a
              administrar el contenido de VerdeQR.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Desde aquí podrás gestionar árboles, centros, especies y mucho más.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
