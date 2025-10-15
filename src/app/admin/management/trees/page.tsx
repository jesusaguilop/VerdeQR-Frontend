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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';

const registeredTrees = [
  {
    id: 9,
    species: 'Tabebuia sp',
    commonName: 'Cañaguate',
    description: 'Género neotropical de árboles muy valorados...',
    characteristics: 'Árbol mediano a grande que alcanza entre 10 y...',
    ecoServices: 'Contribuye a la belleza paisajística y...',
    forestType: 'Bosque seco tropical',
    center: 'Centro biotecnológico del caribe',
    status: 'Activo',
  },
  {
    id: 8,
    species: 'Jacquinia armillaris',
    commonName: 'Yatu',
    description: 'Especie nativa del Caribe y América Central....',
    characteristics: 'Arbusto o árbol pequeño de entre 3 y 10 metros...',
    ecoServices: 'Ayuda en la protección de suelos costeros...',
    forestType: 'Bosque seco tropical',
    center: 'Centro biotecnológico del caribe',
    status: 'Activo',
  },
  {
    id: 7,
    species: 'Machaerium biovulatum',
    commonName: 'Rabo de iguana',
    description: 'Especie nativa de los bosques secos tropicales...',
    characteristics: 'Árbol mediano que alcanza entre 10 y 20 metros...',
    ecoServices: 'Su sistema radicular profundo contribuye al...',
    forestType: 'Bosque seco tropical',
    center: 'Centro biotecnológico del caribe',
    status: 'Activo',
  },
];

export default function TreesManagementPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Árbol</CardTitle>
          <CardDescription>
            Añade un nuevo árbol al sistema.
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
            <Label htmlFor="characteristics">Características</Label>
            <Textarea
              id="characteristics"
              placeholder="Describa las características físicas del árbol"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ecosystem-services">Servicios Ecosistémicos</Label>
            <Textarea
              id="ecosystem-services"
              placeholder="Describa los servicios ecosistémicos que proporciona este árbol"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="forest-type">Tipo de Bosque</Label>
            <Select>
              <SelectTrigger id="forest-type">
                <SelectValue placeholder="Selecciona un tipo de bosque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bst">Bosque seco tropical</SelectItem>
                <SelectItem value="bh">Bosque húmedo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="center">Centro</Label>
            <Select>
              <SelectTrigger id="center">
                <SelectValue placeholder="Selecciona un centro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbc">
                  Centro biotecnológico del caribe
                </SelectItem>
                <SelectItem valuecigec="cigec">
                  Centro de Innovación y Gestión Empresarial (CIGEC)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tree-image">Imagen del Árbol</Label>
            <Input id="tree-image" type="file" />
            <p className="text-sm text-muted-foreground">
              Formatos permitidos: JPG, PNG, GIF.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Breve descripción del árbol"
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
          <CardTitle>Árboles Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Especie</TableHead>
                <TableHead>Nombre Vulgar</TableHead>
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead className="hidden md:table-cell">Características</TableHead>
                <TableHead className="hidden lg:table-cell">Servicios Ecosistémicos</TableHead>
                <TableHead className="hidden md:table-cell">Tipo...</TableHead>
                <TableHead className="hidden lg:table-cell">Centro</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredTrees.map((tree) => (
                <TableRow key={tree.id}>
                  <TableCell>{tree.id}</TableCell>
                  <TableCell>{tree.species}</TableCell>
                  <TableCell>{tree.commonName}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                    {tree.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                    {tree.characteristics}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[150px] truncate">
                    {tree.ecoServices}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{tree.forestType}</TableCell>
                  <TableCell className="hidden lg:table-cell">{tree.center}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tree.status === 'Activo' ? 'default' : 'destructive'
                      }
                      className={
                        tree.status === 'Activo'
                          ? 'bg-green-500/20 text-green-700 border-green-500/50'
                          : ''
                      }
                    >
                      {tree.status}
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
