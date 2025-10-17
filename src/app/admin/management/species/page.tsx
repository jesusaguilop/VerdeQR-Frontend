
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
import { useManagement } from '@/components/admin/management-provider';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Specie } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  id: z.number().optional(),
  scientificName: z.string().min(1, 'El nombre científico es requerido.'),
  commonName: z.string().min(1, 'El nombre común es requerido.'),
  description: z.string().min(1, 'La descripción es requerida.'),
});

type SpecieFormValues = z.infer<typeof formSchema>;

export default function SpeciesManagementPage() {
  const { species, setSpecies } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<SpecieFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scientificName: '',
      commonName: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<SpecieFormValues> = (data) => {
    if (isEditing && data.id) {
      setSpecies(prev => prev.map(s => s.id === data.id ? { ...s, ...data } : s));
      toast({ title: 'Especie actualizada', description: 'La especie ha sido actualizada exitosamente.' });
    } else {
      const newId = species.length > 0 ? Math.max(...species.map(s => s.id)) + 1 : 1;
      setSpecies(prev => [...prev, { ...data, id: newId }]);
      toast({ title: 'Especie guardada', description: 'La nueva especie ha sido guardada.' });
    }
    form.reset();
    setIsEditing(false);
  };

  const handleEdit = (specie: Specie) => {
    form.reset(specie);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setSpecies(prev => prev.filter(s => s.id !== id));
    toast({ variant: 'destructive', title: 'Especie eliminada', description: 'La especie ha sido eliminada.' });
  };

  const handleCancelEdit = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar' : 'Añadir'} Especie</CardTitle>
          <CardDescription>
            {isEditing ? 'Modifica los detalles de la especie.' : 'Añade una nueva especie de árbol.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="scientificName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Científico</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Mangifera indica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="commonName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre Común</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Mango" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Breve descripción de la especie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">{isEditing ? 'Actualizar' : 'Guardar'}</Button>
                {isEditing && <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>}
              </div>
            </form>
          </Form>
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
              {species.map((specie) => (
                <TableRow key={specie.id}>
                  <TableCell>{specie.id}</TableCell>
                  <TableCell className="font-medium">{specie.scientificName}</TableCell>
                  <TableCell>{specie.commonName}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{specie.description}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(specie)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente la especie.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(specie.id)}>Eliminar</AlertDialogAction>
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
