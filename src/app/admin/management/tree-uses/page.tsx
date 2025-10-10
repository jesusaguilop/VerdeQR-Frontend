'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TreeUsesManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Uso del Árbol</CardTitle>
          <CardDescription>
            Añade o edita un tipo de uso para los árboles.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="use-name">Nombre del Uso</Label>
            <Input id="use-name" placeholder="Ej: Medicinal" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción detallada del uso"
            />
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
