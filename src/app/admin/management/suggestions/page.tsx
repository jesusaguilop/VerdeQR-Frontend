'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SuggestionsManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Sugerencias de Usuarios</CardTitle>
          <CardDescription>
            Revisa y gestiona las sugerencias enviadas por los usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Próximamente: Aquí se mostrará la lista de sugerencias.</p>
        </CardContent>
      </Card>
    </div>
  );
}
