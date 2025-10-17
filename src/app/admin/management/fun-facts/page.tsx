
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
import { useManagement } from '@/components/admin/management-provider';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FunFact } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  id: z.number().optional(),
  species: z.string().min(1, 'La especie es requerida.'),
  fact: z.string().min(10, 'El dato curioso debe tener al menos 10 caracteres.'),
});

type FunFactFormValues = z.infer<typeof formSchema>;

export default function FunFactsManagementPage() {
  const { funFacts, setFunFacts, species: speciesList } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<FunFactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      species: '',
      fact: '',
    },
  });

  const onSubmit: SubmitHandler<FunFactFormValues> = (data) => {
    if (isEditing && data.id) {
      setFunFacts(prev => prev.map(ff => ff.id === data.id ? { ...ff, ...data } : ff));
      toast({ title: 'Curiosidad actualizada', description: 'El dato curioso ha sido actualizado.' });
    } else {
      const newId = funFacts.length > 0 ? Math.max(...funFacts.map(ff => ff.id)) + 1 : 1;
      setFunFacts(prev => [...prev, { ...data, id: newId }]);
      toast({ title: 'Curiosidad guardada', description: 'El nuevo dato curioso ha sido guardado.' });
    }
    form.reset();
    setIsEditing(false);
  };

  const handleEdit = (funFact: FunFact) => {
    form.reset(funFact);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setFunFacts(prev => prev.filter(ff => ff.id !== id));
    toast({ variant: 'destructive', title: 'Curiosidad eliminada', description: 'El dato curioso ha sido eliminado.' });
  };

  const handleCancelEdit = () => {
    form.reset();
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar' : 'Añadir'} Curiosidad</CardTitle>
          <CardDescription>
            {isEditing ? 'Modifica la curiosidad sobre un árbol o especie.' : 'Añade una nueva curiosidad sobre un árbol o especie.'}
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
                    <FormLabel>Especie Relacionada</FormLabel>
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
                name="fact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dato Curioso</FormLabel>
                    <FormControl>
                      <Textarea id="fun-fact" placeholder="Escribe aquí el dato curioso..." {...field} />
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
              {funFacts.map((fact) => (
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
                        <DropdownMenuItem onClick={() => handleEdit(fact)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente el dato curioso.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(fact.id)}>Eliminar</AlertDialogAction>
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
