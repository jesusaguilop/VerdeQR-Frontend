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
import { MoreHorizontal } from 'lucide-react';

const registeredFunFacts = [
  {
    id: 1,
    species: 'Ceiba pentandra (Ceiba)',
    fact: 'La Ceiba era considerada un árbol sagrado por los mayas, quienes creían que conectaba el cielo, la tierra y el inframundo.',
  },
  {
    id: 2,
    species: 'Handroanthus chrysanthus (Guayacán)',
    fact: 'El Guayacán puede tardar hasta 10 años en florecer por primera vez, pero cuando lo hace, el espectáculo es inolvidable.',
  },
  {
    id: 3,
    species: 'Mangifera indica (Mango)',
    fact: 'El mango es originario de la India y se cultiva desde hace más de 4,000 años. Es conocido como el "rey de las frutas".',
  },
];

export default function FunFactsManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Curiosidad</CardTitle>
          <CardDescription>
            Añade o edita una curiosidad sobre un árbol o especie.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="species">Especie Relacionada</Label>
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
            <Label htmlFor="fun-fact">Dato Curioso</Label>
            <Textarea
              id="fun-fact"
              placeholder="Escribe aquí el dato curioso..."
            />
          </div>
          <Button>Guardar</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Curiosidades Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Especie</TableHead>
                <TableHead>Dato Curioso</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredFunFacts.map((fact) => (
                <TableRow key={fact.id}>
                  <TableCell>{fact.id}</TableCell>
                  <TableCell>{fact.species}</TableCell>
                  <TableCell className="max-w-[400px]">{fact.fact}</TableCell>
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
