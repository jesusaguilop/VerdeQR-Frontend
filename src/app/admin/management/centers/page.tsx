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

export default function CentersManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Centro</CardTitle>
          <CardDescription>
            Añade o edita un centro de formación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="center-name">Nombre del Centro</Label>
            <Input id="center-name" placeholder="Ej: Centro Biotecnológico del Caribe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Input id="location" placeholder="Ej: Valledupar, Cesar" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Breve descripción del centro"
            />
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
