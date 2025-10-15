'use client';
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
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const registeredSuggestions = [
  {
    id: 1,
    name: 'Ana García',
    email: 'ana.garcia@email.com',
    suggestion: 'Deberían añadir más información sobre los usos medicinales de las plantas.',
    date: '2023-10-26',
    status: 'Pendiente',
  },
  {
    id: 2,
    name: 'Carlos Pérez',
    email: 'carlos.perez@email.com',
    suggestion: 'Me gustaría poder subir mis propias fotos de los árboles.',
    date: '2023-10-25',
    status: 'Revisado',
  },
  {
    id: 3,
    name: 'Luisa Fernández',
    email: 'luisa.fernandez@email.com',
    suggestion: 'Falta información del árbol "Dividivi".',
    date: '2023-10-24',
    status: 'Implementado',
  },
];

export default function SuggestionsManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Registrar Sugerencia</CardTitle>
          <CardDescription>
            Añade una nueva sugerencia al sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" placeholder="Nombre del usuario" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="correo@ejemplo.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="suggestion">Sugerencia</Label>
            <Textarea
              id="suggestion"
              placeholder="Descripción de la sugerencia"
            />
          </div>
          <Button>Registrar Sugerencia</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Sugerencias</CardTitle>
          <CardDescription>
            Revisa y gestiona las sugerencias enviadas por los usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sugerencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredSuggestions.map((suggestion) => (
                <TableRow key={suggestion.id}>
                  <TableCell>{suggestion.id}</TableCell>
                  <TableCell>{suggestion.name}</TableCell>
                  <TableCell>{suggestion.email}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{suggestion.suggestion}</TableCell>
                  <TableCell>{suggestion.date}</TableCell>
                  <TableCell>
                    <Select defaultValue={suggestion.status.toLowerCase()}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">
                          <Badge className="bg-yellow-100 text-yellow-800">Pendiente</Badge>
                        </SelectItem>
                        <SelectItem value="revisado">
                          <Badge className="bg-blue-100 text-blue-800">Revisado</Badge>
                        </SelectItem>
                        <SelectItem value="implementado">
                          <Badge className="bg-green-100 text-green-800">Implementado</Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
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
                        <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
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
