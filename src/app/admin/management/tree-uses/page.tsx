'use client';
import { useState } from 'react';
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


type UseCategory =
  | ''
  | 'Maderable'
  | 'Comestible'
  | 'Medicinal'
  | 'Ornamental'
  | 'Artesanal'
  | 'Agroforestal'
  | 'Restauración Ecológica'
  | 'Cultural/Ceremonial'
  | 'Melífero'
  | 'Protección Ambiental'
  | 'Tintóreo'
  | 'Oleaginoso'
  | 'Biocombustible';

const categories: UseCategory[] = [
  'Maderable',
  'Comestible',
  'Medicinal',
  'Ornamental',
  'Artesanal',
  'Agroforestal',
  'Restauración Ecológica',
  'Cultural/Ceremonial',
  'Melífero',
  'Protección Ambiental',
  'Tintóreo',
  'Oleaginoso',
  'Biocombustible',
];

const partOptions = ['Fruto', 'Semilla', 'Hoja', 'Flor', 'Raiz', 'Corteza', 'Otras'];
const treePartOptions = ['Arbol completo', 'Fruto', 'Semilla', 'Hoja', 'Flor', 'Raiz', 'Corteza', 'Otras'];

const MaderableFields = () => (
  <>
    <div className="space-y-2">
      <Label htmlFor="dureza">Dureza</Label>
      <Select name="dureza">
        <SelectTrigger id="dureza">
          <SelectValue placeholder="Seleccione la dureza" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="blanda">Blanda</SelectItem>
          <SelectItem value="media">Media</SelectItem>
          <SelectItem value="dura">Dura</SelectItem>
          <SelectItem value="muy-dura">Muy Dura</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="resistencia">Resistencia</Label>
      <Select name="resistencia">
        <SelectTrigger id="resistencia">
          <SelectValue placeholder="Seleccione la resistencia" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="baja">Baja</SelectItem>
          <SelectItem value="media">Media</SelectItem>
          <SelectItem value="alta">Alta</SelectItem>
          <SelectItem value="muy-alta">Muy alta</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="uso-final">Uso final</Label>
      <Input id="uso-final" name="uso-final" />
    </div>
  </>
);

const ComestibleFields = () => (
  <>
    <div className="space-y-2">
      <Label htmlFor="parte-comestible">Parte comestible</Label>
      <Select name="parte-comestible">
        <SelectTrigger id="parte-comestible">
          <SelectValue placeholder="Seleccione la parte comestible" />
        </SelectTrigger>
        <SelectContent>
          {partOptions.map(part => <SelectItem key={part} value={part.toLowerCase()}>{part}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="forma-consumo">Forma de consumo</Label>
      <Input id="forma-consumo" name="forma-consumo" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="valor-nutricional">Valor nutricional</Label>
      <Textarea id="valor-nutricional" name="valor-nutricional" />
    </div>
  </>
);

const MedicinalFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="parte-utilizada-medicinal">Parte utilizada</Label>
        <Select name="parte-utilizada-medicinal">
          <SelectTrigger id="parte-utilizada-medicinal">
            <SelectValue placeholder="Seleccione la parte utilizada" />
          </SelectTrigger>
          <SelectContent>
            {partOptions.map(part => <SelectItem key={part} value={part.toLowerCase()}>{part}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="preparacion">Preparación</Label>
        <Textarea id="preparacion" name="preparacion" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="enfermedades-tratadas">Enfermedades tratadas</Label>
        <Textarea id="enfermedades-tratadas" name="enfermedades-tratadas" />
      </div>
    </>
  );

const OrnamentalFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="caracteristicas-esteticas">Características estéticas</Label>
            <Textarea id="caracteristicas-esteticas" name="caracteristicas-esteticas" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="ubicacion-recomendada">Ubicación recomendada</Label>
            <Input id="ubicacion-recomendada" name="ubicacion-recomendada" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tipo-jardineria">Tipo de jardinería</Label>
            <Input id="tipo-jardineria" name="tipo-jardineria" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="coloracion-estacional">Coloración Estacional</Label>
            <Input id="coloracion-estacional" name="coloracion-estacional" />
        </div>
    </>
);

const ArtesanalFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="parte-utilizada-artesanal">Parte utilizada</Label>
            <Select name="parte-utilizada-artesanal">
                <SelectTrigger id="parte-utilizada-artesanal">
                    <SelectValue placeholder="Seleccione la parte utilizada" />
                </SelectTrigger>
                <SelectContent>
                  {partOptions.map(part => <SelectItem key={part} value={part.toLowerCase()}>{part}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="tipo-artesania">Tipo de Artesanía</Label>
            <Input id="tipo-artesania" name="tipo-artesania" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tecnica-elaboracion">Técnica de elaboración</Label>
            <Textarea id="tecnica-elaboracion" name="tecnica-elaboracion" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="comunidades-artesanales">Comunidades Artesanales</Label>
            <Input id="comunidades-artesanales" name="comunidades-artesanales" />
        </div>
    </>
);

const AgroforestalFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="sistema-agroforestal">Sistema agroforestal</Label>
            <Input id="sistema-agroforestal" name="sistema-agroforestal" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="beneficios-asociados">Beneficios Asociados</Label>
            <Textarea id="beneficios-asociados" name="beneficios-asociados" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="cultivos-compatibles">Cultivos compatibles</Label>
            <Input id="cultivos-compatibles" name="cultivos-compatibles" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="funcion-principal">Función principal</Label>
            <Textarea id="funcion-principal" name="funcion-principal" />
        </div>
    </>
);

const RestauracionEcologicaFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="ecosistema-objetivo">Ecosistema objetivo</Label>
            <Input id="ecosistema-objetivo" name="ecosistema-objetivo" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="funcion-ecologica">Función ecológica</Label>
            <Textarea id="funcion-ecologica" name="funcion-ecologica" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="especies-asociadas">Especies asociadas</Label>
            <Input id="especies-asociadas" name="especies-asociadas" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tasa-crecimiento">Tasa de crecimiento</Label>
            <Select name="tasa-crecimiento">
                <SelectTrigger id="tasa-crecimiento">
                    <SelectValue placeholder="Seleccione la tasa de crecimiento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="lenta">Lenta</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="rapida">Rápida</SelectItem>
                    <SelectItem value="muy-rapida">Muy rápida</SelectItem>
                </SelectContent>
            </Select>
        </div>
    </>
);

const CulturalCeremonialFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="grupo-etnico">Grupo Étnico</Label>
            <Input id="grupo-etnico" name="grupo-etnico" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tipo-ceremonia">Tipo de ceremonia</Label>
            <Input id="tipo-ceremonia" name="tipo-ceremonia" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="significado-cultural">Significado cultural</Label>
            <Textarea id="significado-cultural" name="significado-cultural" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="parte-utilizada-cultural">Parte utilizada</Label>
            <Select name="parte-utilizada-cultural">
                <SelectTrigger id="parte-utilizada-cultural">
                    <SelectValue placeholder="Seleccione la parte utilizada" />
                </SelectTrigger>
                <SelectContent>
                  {treePartOptions.map(part => <SelectItem key={part} value={part.toLowerCase().replace(' ', '-')}>{part}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    </>
);

const MeliferoFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="tipo-miel">Tipo de miel</Label>
            <Input id="tipo-miel" name="tipo-miel" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="epoca-floracion">Época de floración</Label>
            <Input id="epoca-floracion" name="epoca-floracion" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="calidad-polen">Calidad del polen</Label>
            <Select name="calidad-polen">
                <SelectTrigger id="calidad-polen">
                    <SelectValue placeholder="Seleccione la calidad del polen" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="muy-alta">Muy alta</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="atraccion-polinizadores">Atracción de polinizadores</Label>
            <Textarea id="atraccion-polinizadores" name="atraccion-polinizadores" />
        </div>
    </>
);

const ProteccionAmbientalFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="tipo-proteccion">Tipo de protección</Label>
            <Input id="tipo-proteccion" name="tipo-proteccion" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="beneficios-ambientales">Beneficios ambientales</Label>
            <Textarea id="beneficios-ambientales" name="beneficios-ambientales" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="zonas-aplicacion">Zonas de aplicación</Label>
            <Input id="zonas-aplicacion" name="zonas-aplicacion" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="capacidad-captura-carbono">Capacidad de captura de carbono</Label>
            <Input id="capacidad-captura-carbono" name="capacidad-captura-carbono" />
        </div>
    </>
);

const TintoreoFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="parte-utilizada-tintoreo">Parte utilizada</Label>
            <Select name="parte-utilizada-tintoreo">
                <SelectTrigger id="parte-utilizada-tintoreo">
                    <SelectValue placeholder="Seleccione la parte utilizada" />
                </SelectTrigger>
                <SelectContent>
                     {partOptions.map(part => <SelectItem key={part} value={part.toLowerCase()}>{part}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="color-obtenido">Color obtenido</Label>
            <Input id="color-obtenido" name="color-obtenido" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="metodo-extraccion">Método de extracción</Label>
            <Textarea id="metodo-extraccion" name="metodo-extraccion" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="usos-tintes">Usos de los tintes</Label>
            <Textarea id="usos-tintes" name="usos-tintes" />
        </div>
    </>
);

const OleaginosoFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="parte-utilizada-oleaginoso">Parte utilizada</Label>
            <Select name="parte-utilizada-oleaginoso">
                <SelectTrigger id="parte-utilizada-oleaginoso">
                    <SelectValue placeholder="Seleccione la parte utilizada" />
                </SelectTrigger>
                <SelectContent>
                     {['Semilla', 'Hoja', 'Nueces', 'Frutos', 'Otras'].map(part => <SelectItem key={part} value={part.toLowerCase()}>{part}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="tipo-aceite">Tipo de aceite</Label>
            <Input id="tipo-aceite" name="tipo-aceite" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="metodo-extraccion-aceite">Método de extracción</Label>
            <Textarea id="metodo-extraccion-aceite" name="metodo-extraccion-aceite" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="propiedades-aceite">Propiedades del aceite</Label>
            <Textarea id="propiedades-aceite" name="propiedades-aceite" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="aplicaciones-aceite">Aplicaciones del aceite</Label>
            <Textarea id="aplicaciones-aceite" name="aplicaciones-aceite" />
        </div>
    </>
);

const BiocombustibleFields = () => (
    <>
        <div className="space-y-2">
            <Label htmlFor="tipo-biocombustible">Tipo de biocombustible</Label>
            <Input id="tipo-biocombustible" name="tipo-biocombustible" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="poder-calorifico">Poder calorífico</Label>
            <Input id="poder-calorifico" name="poder-calorifico" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tasa-crecimiento-bio">Tasa de crecimiento</Label>
            <Select name="tasa-crecimiento-bio">
                <SelectTrigger id="tasa-crecimiento-bio">
                    <SelectValue placeholder="Seleccione la tasa de crecimiento" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="baja">Baja</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="muy-alta">Muy alta</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="rendimiento-hectarea">Rendimiento por Hectárea</Label>
            <Input id="rendimiento-hectarea" name="rendimiento-hectarea" />
        </div>
    </>
);

const DynamicFields = ({ category }: { category: UseCategory }) => {
  switch (category) {
    case 'Maderable': return <MaderableFields />;
    case 'Comestible': return <ComestibleFields />;
    case 'Medicinal': return <MedicinalFields />;
    case 'Ornamental': return <OrnamentalFields />;
    case 'Artesanal': return <ArtesanalFields />;
    case 'Agroforestal': return <AgroforestalFields />;
    case 'Restauración Ecológica': return <RestauracionEcologicaFields />;
    case 'Cultural/Ceremonial': return <CulturalCeremonialFields />;
    case 'Melífero': return <MeliferoFields />;
    case 'Protección Ambiental': return <ProteccionAmbientalFields />;
    case 'Tintóreo': return <TintoreoFields />;
    case 'Oleaginoso': return <OleaginosoFields />;
    case 'Biocombustible': return <BiocombustibleFields />;
    default: return null;
  }
};

const registeredUses = [
    { id: 1, species: 'Mangifera indica (Mango)', useName: 'Consumo en fresco', category: 'Comestible', status: 'Activo' },
    { id: 2, species: 'Handroanthus chrysanthus (Guayacán)', useName: 'Construcción de vigas', category: 'Maderable', status: 'Activo' },
    { id: 3, species: 'Ceiba pentandra (Ceiba)', useName: 'Uso en ceremonias', category: 'Cultural/Ceremonial', status: 'Inactivo' },
];

export default function TreeUsesManagementPage() {
  const [category, setCategory] = useState<UseCategory>('');

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Uso de Árbol</CardTitle>
          <CardDescription>
            Añade o edita un tipo de uso para los árboles y sus detalles específicos.
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
            <Label htmlFor="use-name">Nombre del Uso</Label>
            <Input id="use-name" placeholder="Ej: Construcción de muebles" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoría de Uso</Label>
            <Select onValueChange={(value: UseCategory) => setCategory(value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Seleccione una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select defaultValue="active">
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="inactive">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {category && (
            <div className="space-y-6 border-t pt-6">
                 <h3 className="text-lg font-medium text-primary">Detalles de la Categoría: {category}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DynamicFields category={category} />
                 </div>
            </div>
          )}

          <Button>Guardar</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Usos Registrados</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Especie</TableHead>
                <TableHead>Nombre del Uso</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registeredUses.map((use) => (
                <TableRow key={use.id}>
                  <TableCell>{use.id}</TableCell>
                  <TableCell>{use.species}</TableCell>
                  <TableCell>{use.useName}</TableCell>
                  <TableCell><Badge variant="secondary">{use.category}</Badge></TableCell>
                  <TableCell>
                    <Badge
                      variant={use.status === 'Activo' ? 'default' : 'outline'}
                      className={use.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                    >
                      {use.status}
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
