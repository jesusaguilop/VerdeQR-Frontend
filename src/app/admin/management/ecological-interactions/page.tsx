
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
import { useManagement } from '@/components/admin/management-provider';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { EcologicalInteraction } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  id: z.number().optional(),
  species: z.string().min(1, 'La especie es requerida.'),
  type: z.string().min(1, 'El tipo de interacción es requerido.'),
  description: z.string().min(1, 'La descripción es requerida.'),
  status: z.enum(['Activo', 'Inactivo']),
});

type InteractionFormValues = z.infer<typeof formSchema>;

export default function EcologicalInteractionsManagementPage() {
  const { interactions, setInteractions, species: speciesList } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<InteractionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      species: '',
      type: '',
      description: '',
      status: 'Activo',
    },
  });

  const onSubmit: SubmitHandler<InteractionFormValues> = (data) => {
    if (isEditing && data.id) {
      setInteractions(prev => prev.map(inter => inter.id === data.id ? { ...inter, ...data } : inter));
      toast({ title: 'Interacción actualizada', description: 'La interacción ha sido actualizada exitosamente.' });
    } else {
      const newId = interactions.length > 0 ? Math.max(...interactions.map(i => i.id)) + 1 : 1;
      setInteractions(prev => [...prev, { ...data, id: newId }]);
      toast({ title: 'Interacción registrada', description: 'La nueva interacción ha sido registrada.' });
    }
    form.reset();
    setIsEditing(false);
  };

  const handleEdit = (interaction: EcologicalInteraction) => {
    form.reset(interaction);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setInteractions(prev => prev.filter(inter => inter.id !== id));
    toast({ variant: 'destructive', title: 'Interacción eliminada', description: 'La interacción ha sido eliminada.' });
  };

  const handleCancelEdit = () => {
    form.reset();
    setIsEditing(false);
  }

  const interactionTypes = ['Polinización', 'Dispersión de semillas', 'Herbivoría', 'Simbiosis'];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar' : 'Registro de'} Interacciones Ecológicas</CardTitle>
          <CardDescription>
            {isEditing ? 'Modifica los detalles de la interacción.' : 'Añade una nueva interacción ecológica.'}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una especie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {speciesList.map(s => <SelectItem key={s.id} value={`${s.scientificName} (${s.commonName})`}>{s.scientificName} ({s.commonName})</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Interacción</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un tipo de interacción" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {interactionTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                      </SelectContent>
                    </Select>
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
                      <Textarea placeholder="Descripción detallada de la interacción" {...field} />
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
                <Button type="submit">{isEditing ? 'Actualizar' : 'Registrar'} Interacción</Button>
                {isEditing && <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>}
              </div>
            </form>
          </Form>
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
              {interactions.map((interaction) => (
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
                        <DropdownMenuItem onClick={() => handleEdit(interaction)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente la interacción.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(interaction.id)}>Eliminar</AlertDialogAction>
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
