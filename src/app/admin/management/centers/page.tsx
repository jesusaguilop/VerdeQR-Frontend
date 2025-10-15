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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
            <Label htmlFor="center-name">Nombre</Label>
            <Input
              id="center-name"
              placeholder="Ej: Centro Biotecnológico del Caribe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              placeholder="Ej: Kilómetro 7, Vía a La Paz"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Centros Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Aquí irán los datos de los centros */}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
