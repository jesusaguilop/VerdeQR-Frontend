
'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';

const registeredInteractions = [
  {
    id: 1,
    species: 'Mangifera indica (Mango)',
    type: 'Polinización',
    description: 'Abejas polinizan las flores del mango.',
    status: 'Activo',
  },
  {
    id: 2,
    species: 'Handroanthus chrysanthus (Guayacán)',
    type: 'Dispersión de semillas',
    description: 'El viento dispersa las semillas aladas del Guayacán.',
    status: 'Activo',
  },
  {
    id: 3,
    species: 'Ceiba pentandra (Ceiba)',
    type: 'Herbivoría',
    description: 'Las hormigas cortadoras de hojas atacan los brotes jóvenes.',
    status: 'Inactivo',
  },
];

export default function EcologicalInteractionsManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Registro de Interacciones Ecológicas</CardTitle>
          <CardDescription>
            Añade o edita una interacción ecológica.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="species">Especie</Label>
            <Select>
              <SelectTrigger id="species">
                <SelectValue placeholder="Selecciona una especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mango">Mangifera indica (Mango)</SelectItem>
                <SelectItem value="guayacan">
                  Handroanthus chrysanthus (Guayacán)
                </SelectItem>
                <SelectItem value="ceiba">Ceiba pentandra (Ceiba)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="interaction-type">Tipo de Interacción</Label>
            <Select>
              <SelectTrigger id="interaction-type">
                <SelectValue placeholder="Selecciona un tipo de interacción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pollination">Polinización</SelectItem>
                <SelectItem value="dispersion">Dispersión de semillas</SelectItem>
                <SelectItem value="herbivory">Herbivoría</SelectItem>
                 <SelectItem value="symbiosis">Simbiosis</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Descripción detallada de la interacción"
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
          <Button>Registrar Interacción</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Interacciones Ecológicas Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Especie</TableHead>
                <TableHead>Tipo de Interacción</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell>{interaction.id}</TableCell>
                  <TableCell>{interaction.species}</TableCell>
                  <TableCell>{interaction.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {interaction.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        interaction.status === 'Activo'
                          ? 'default'
                          : 'outline'
                      }
                      className={
                        interaction.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {interaction.status}
                    </Badge>
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
