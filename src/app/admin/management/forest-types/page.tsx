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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

const registeredForestTypes = [
  {
    id: 1,
    name: 'Bosque seco tropical',
    description:
      'Ecosistema con estaciones secas pronunciadas y vegetación adaptada a la falta de agua.',
  },
  {
    id: 2,
    name: 'Bosque húmedo tropical',
    description:
      'Alta biodiversidad, lluvias constantes y temperaturas cálidas durante todo el año.',
  },
  {
    id: 3,
    name: 'Bosque de galería',
    description:
      'Bosques que crecen a lo largo de los ríos en zonas áridas o semiáridas.',
  },
];

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
      <Card>
        <CardHeader>
          <CardTitle>Tipos de Bosque Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredForestTypes.map((forest) => (
                <TableRow key={forest.id}>
                  <TableCell>{forest.id}</TableCell>
                  <TableCell className="font-medium">{forest.name}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{forest.description}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
