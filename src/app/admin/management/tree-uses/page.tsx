
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
import { useManagement } from '@/components/admin/management-provider';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TreeUse } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


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

// We can define schemas for each category, but for simplicity we will use a single dynamic one.
const baseSchema = z.object({
  id: z.number().optional(),
  species: z.string().min(1, 'La especie es requerida.'),
  useName: z.string().min(1, 'El nombre del uso es requerido.'),
  category: z.string().min(1, 'La categoría es requerida.'),
  status: z.enum(['Activo', 'Inactivo']),
  details: z.any().optional(), // For simplicity, we'll keep details as `any`
});

type TreeUseFormValues = z.infer<typeof baseSchema>;

const MaderableFields = () => (
  <>
    {/* Dynamic fields can be built here if needed, or kept simple */}
  </>
);
// Define other field components...
const DynamicFields = ({ category }: { category: UseCategory }) => {
  // Return null for now, can be expanded
  return null;
};

export default function TreeUsesManagementPage() {
  const { treeUses, setTreeUses, species: speciesList } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<UseCategory>('');

  const formMethods = useForm<TreeUseFormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      species: '',
      useName: '',
      category: '',
      status: 'Activo',
      details: {},
    },
  });

  const onSubmit: SubmitHandler<TreeUseFormValues> = (data) => {
    const dataWithCategory = { ...data, category: selectedCategory };

    if (isEditing && data.id) {
      setTreeUses(prev => prev.map(u => u.id === data.id ? { ...u, ...dataWithCategory } as TreeUse : u));
      toast({ title: 'Uso actualizado', description: 'El uso del árbol ha sido actualizado.' });
    } else {
      const newId = treeUses.length > 0 ? Math.max(...treeUses.map(u => u.id)) + 1 : 1;
      setTreeUses(prev => [...prev, { ...dataWithCategory, id: newId } as TreeUse]);
      toast({ title: 'Uso guardado', description: 'El nuevo uso ha sido guardado.' });
    }
    formMethods.reset();
    setSelectedCategory('');
    setIsEditing(false);
  };

  const handleEdit = (use: TreeUse) => {
    formMethods.reset(use);
    setSelectedCategory(use.category as UseCategory);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setTreeUses(prev => prev.filter(u => u.id !== id));
    toast({ variant: 'destructive', title: 'Uso eliminado', description: 'El uso del árbol ha sido eliminado.' });
  };

  const handleCancelEdit = () => {
    formMethods.reset();
    setSelectedCategory('');
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-8">
      <FormProvider {...formMethods}>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Editar' : 'Añadir'} Uso de Árbol</CardTitle>
            <CardDescription>
              {isEditing ? 'Modifica los detalles del uso.' : 'Añade un nuevo tipo de uso para los árboles.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={formMethods.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especie</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una especie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {speciesList.map(s => <SelectItem key={s.id} value={s.scientificName}>{`${s.scientificName} (${s.commonName})`}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="useName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Uso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Construcción de muebles" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría de Uso</FormLabel>
                      <Select onValueChange={(value: UseCategory) => {field.onChange(value); setSelectedCategory(value)}} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una categoría" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Inactivo">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedCategory && (
                  <div className="space-y-6 border-t pt-6">
                    <h3 className="text-lg font-medium text-primary">Detalles de la Categoría: {selectedCategory}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DynamicFields category={selectedCategory} />
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button type="submit">{isEditing ? 'Actualizar' : 'Guardar'}</Button>
                  {isEditing && <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </FormProvider>
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
              {treeUses.map((use) => (
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
                        <DropdownMenuItem onClick={() => handleEdit(use)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el uso.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(use.id)}>Eliminar</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
