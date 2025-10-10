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

export default function ForestTypesManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Tipo de Bosque</CardTitle>
          <CardDescription>
            Añade o edita un tipo de bosque.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="forest-name">Nombre del Tipo de Bosque</Label>
            <Input id="forest-name" placeholder="Ej: Bosque seco tropical" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Breve descripción del tipo de bosque"
            />
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
