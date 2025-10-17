
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
import { useManagement } from '@/components/admin/management-provider';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tree } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  id: z.number().optional(),
  species: z.string().min(1, 'La especie es requerida.'),
  commonName: z.string().min(1, 'El nombre común es requerido.'),
  description: z.string().min(1, 'La descripción es requerida.'),
  characteristics: z.string().min(1, 'Las características son requeridas.'),
  ecoServices: z.string().min(1, 'Los servicios ecosistémicos son requeridos.'),
  forestType: z.string().min(1, 'El tipo de bosque es requerido.'),
  center: z.string().min(1, 'El centro es requerido.'),
  status: z.enum(['Activo', 'Inactivo']),
});

type TreeFormValues = z.infer<typeof formSchema>;

export default function TreesManagementPage() {
  const { trees, setTrees, species: speciesList, forestTypes, centers } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<TreeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      species: '',
      commonName: '',
      description: '',
      characteristics: '',
      ecoServices: '',
      forestType: '',
      center: '',
      status: 'Activo',
    },
  });
  
  const handleSpeciesChange = (scientificName: string) => {
    const selectedSpecie = speciesList.find(s => s.scientificName === scientificName);
    if(selectedSpecie) {
      form.setValue('species', selectedSpecie.scientificName);
      form.setValue('commonName', selectedSpecie.commonName);
    }
  }

  const onSubmit: SubmitHandler<TreeFormValues> = (data) => {
    if (isEditing && data.id) {
      setTrees(prev => prev.map(t => t.id === data.id ? { ...t, ...data } : t));
      toast({ title: 'Árbol actualizado', description: 'El árbol ha sido actualizado exitosamente.' });
    } else {
      const newId = trees.length > 0 ? Math.max(...trees.map(t => t.id)) + 1 : 1;
      setTrees(prev => [...prev, { ...data, id: newId }]);
      toast({ title: 'Árbol añadido', description: 'El nuevo árbol ha sido añadido exitosamente.' });
    }
    form.reset();
    setIsEditing(false);
    setImagePreview(null);
  };

  const handleEdit = (tree: Tree) => {
    form.reset(tree);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setTrees(prev => prev.filter(t => t.id !== id));
    toast({ variant: 'destructive', title: 'Árbol eliminado', description: 'El árbol ha sido eliminado.' });
  };

  const handleCancelEdit = () => {
    form.reset();
    setIsEditing(false);
    setImagePreview(null);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar' : 'Añadir'} Árbol</CardTitle>
          <CardDescription>
            {isEditing ? 'Modifica los detalles del árbol.' : 'Añade un nuevo árbol al sistema.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <FormField
                control={form.control}
                name="species"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especie</FormLabel>
                    <Select onValueChange={(value) => handleSpeciesChange(value)} value={field.value}>
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

              <FormField control={form.control} name="commonName" render={({ field }) => ( <FormItem><FormLabel>Nombre Común</FormLabel><FormControl><Input {...field} readOnly className="bg-muted" /></FormControl><FormMessage /></FormItem>)} />
              
              <FormField
                control={form.control}
                name="characteristics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Características</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describa las características físicas del árbol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ecoServices"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servicios Ecosistémicos</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describa los servicios ecosistémicos que proporciona este árbol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="forestType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Bosque</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de bosque" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {forestTypes.map(ft => <SelectItem key={ft.id} value={ft.name}>{ft.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="center"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Centro</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un centro" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {centers.filter(c=>c.status==='Activo').map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <Label htmlFor="tree-image">Imagen del Árbol</Label>
                <Input id="tree-image" type="file" accept="image/*" onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    setImagePreview(URL.createObjectURL(file));
                  }
                }} />
                <p className="text-sm text-muted-foreground">
                  Formatos permitidos: JPG, PNG, GIF.
                </p>
                {imagePreview && <img src={imagePreview} alt="Vista previa" className="mt-2 h-32 w-32 object-cover rounded-md" />}
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Breve descripción del árbol" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
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
              <div className="flex gap-2">
                <Button type="submit">{isEditing ? 'Actualizar' : 'Guardar'} Árbol</Button>
                {isEditing && <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>}
              </div>
            </form>
          </Form>
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
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trees.map((tree) => (
                <TableRow key={tree.id}>
                  <TableCell>{tree.id}</TableCell>
                  <TableCell>{tree.species}</TableCell>
                  <TableCell>{tree.commonName}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-[150px] truncate">
                    {tree.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        tree.status === 'Activo' ? 'default' : 'outline'
                      }
                       className={
                        tree.status === 'Activo'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
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
                        <DropdownMenuItem onClick={() => handleEdit(tree)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el árbol.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(tree.id)}>Eliminar</AlertDialogAction>
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
