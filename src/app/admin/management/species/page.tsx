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

export default function SpeciesManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Especie</CardTitle>
          <CardDescription>
            Añade o edita una especie de árbol.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="scientific-name">Nombre Científico</Label>
            <Input id="scientific-name" placeholder="Ej: Mangifera indica" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="common-name">Nombre Común</Label>
            <Input id="common-name" placeholder="Ej: Mango" />
          </div>
           <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Breve descripción de la especie"
            />
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
