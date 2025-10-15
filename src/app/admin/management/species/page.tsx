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

const registeredSpecies = [
  {
    id: 1,
    scientificName: 'Mangifera indica',
    commonName: 'Mango',
    description: 'Árbol frutal de la familia Anacardiaceae, muy popular en zonas tropicales.',
  },
  {
    id: 2,
    scientificName: 'Handroanthus chrysanthus',
    commonName: 'Guayacán Amarillo',
    description: 'Árbol ornamental famoso por su espectacular floración amarilla.',
  },
  {
    id: 3,
    scientificName: 'Ceiba pentandra',
    commonName: 'Ceiba',
    description: 'Árbol de gran tamaño, considerado sagrado en diversas culturas americanas.',
  },
];

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
      <Card>
        <CardHeader>
          <CardTitle>Especies Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre Científico</TableHead>
                <TableHead>Nombre Común</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredSpecies.map((species) => (
                <TableRow key={species.id}>
                  <TableCell>{species.id}</TableCell>
                  <TableCell className="font-medium">{species.scientificName}</TableCell>
                  <TableCell>{species.commonName}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{species.description}</TableCell>
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
