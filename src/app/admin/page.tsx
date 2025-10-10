import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const managementTasks = [
  'Gestiona los árboles registrados en el sistema',
  'Administra los centros educativos',
  'Configura los tipos de árbol y sus usos',
  'Genera códigos QR para los árboles',
  'Revisa y responde sugerencias de usuarios',
  'Administra los usuarios del sistema',
];

export default function AdminDashboardPage() {
  return (
    <div className="flex items-center justify-center h-full p-4 md:p-8">
      <Card className="w-full max-w-4xl bg-card/90 backdrop-blur-lg border border-border/30 shadow-2xl">
        <CardContent className="p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
            Bienvenido al Panel de Gestión
          </h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg mb-8">
            Desde aquí podrás administrar todos los aspectos de la aplicación
            VerdeQR.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left mx-auto max-w-2xl mb-10">
            {managementTasks.map((task) => (
              <li key={task} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{task}</span>
              </li>
            ))}
          </ul>

          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Volver a la página principal
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
