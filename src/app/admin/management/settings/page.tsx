'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Configuración</CardTitle>
          <CardDescription>
            Ajustes generales del panel de administración.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente: Aquí se mostrarán las opciones de configuración.</p>
        </CardContent>
      </Card>
    </div>
  );
}
