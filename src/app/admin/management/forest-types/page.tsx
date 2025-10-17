
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
import { useManagement } from '@/components/admin/management-provider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ForestType } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'El nombre es requerido.'),
  description: z.string().min(1, 'La descripción es requerida.'),
});

type ForestTypeFormValues = z.infer<typeof formSchema>;

export default function ForestTypesManagementPage() {
  const { forestTypes, setForestTypes } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ForestTypeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<ForestTypeFormValues> = (data) => {
    if (isEditing && data.id) {
      setForestTypes(prev => prev.map(ft => ft.id === data.id ? { ...ft, ...data } : ft));
      toast({ title: 'Tipo de bosque actualizado', description: 'El tipo de bosque ha sido actualizado.' });
    } else {
      const newId = forestTypes.length > 0 ? Math.max(...forestTypes.map(ft => ft.id)) + 1 : 1;
      setForestTypes(prev => [...prev, { ...data, id: newId }]);
      toast({ title: 'Tipo de bosque guardado', description: 'El nuevo tipo de bosque ha sido guardado.' });
    }
    form.reset();
    setIsEditing(false);
  };

  const handleEdit = (forestType: ForestType) => {
    form.reset(forestType);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setForestTypes(prev => prev.filter(ft => ft.id !== id));
    toast({ variant: 'destructive', title: 'Tipo de bosque eliminado', description: 'El tipo de bosque ha sido eliminado.' });
  };

  const handleCancelEdit = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar' : 'Añadir'} Tipo de Bosque</CardTitle>
          <CardDescription>
            {isEditing ? 'Modifica los detalles del tipo de bosque.' : 'Añade un nuevo tipo de bosque.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Tipo de Bosque</FormLabel>
                    <FormControl>
                      <Input id="forest-name" placeholder="Ej: Bosque seco tropical" {...field} />
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
                      <Textarea id="description" placeholder="Breve descripción del tipo de bosque" {...field} />
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
              {forestTypes.map((forest) => (
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
                        <DropdownMenuItem onClick={() => handleEdit(forest)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el tipo de bosque.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(forest.id)}>Eliminar</AlertDialogAction>
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
