
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useManagement } from '@/components/admin/management-provider';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suggestion } from '@/lib/mock-data';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'El nombre es requerido.'),
  email: z.string().email('Email inválido.'),
  suggestion: z.string().min(10, 'La sugerencia debe tener al menos 10 caracteres.'),
  date: z.string(),
  status: z.enum(['Pendiente', 'Revisado', 'Implementado']),
});

type SuggestionFormValues = z.infer<typeof formSchema>;

export default function SuggestionsManagementPage() {
  const { suggestions, setSuggestions } = useManagement();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<SuggestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      suggestion: '',
      status: 'Pendiente',
    },
  });

  const onSubmit: SubmitHandler<SuggestionFormValues> = (data) => {
    if (isEditing && data.id) {
      setSuggestions(prev => prev.map(s => s.id === data.id ? { ...s, ...data, date: new Date().toISOString().split('T')[0] } : s));
      toast({ title: 'Sugerencia actualizada', description: 'La sugerencia ha sido actualizada.' });
    } else {
      const newId = suggestions.length > 0 ? Math.max(...suggestions.map(s => s.id)) + 1 : 1;
      const newSuggestion = { ...data, id: newId, date: new Date().toISOString().split('T')[0] };
      setSuggestions(prev => [...prev, newSuggestion]);
      toast({ title: 'Sugerencia registrada', description: 'Gracias por tu sugerencia.' });
    }
    form.reset({ name: '', email: '', suggestion: '', status: 'Pendiente' });
    setIsEditing(false);
  };

  const handleEdit = (suggestion: Suggestion) => {
    form.reset(suggestion);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
    toast({ variant: 'destructive', title: 'Sugerencia eliminada', description: 'La sugerencia ha sido eliminada.' });
  };

  const handleCancelEdit = () => {
    form.reset({ name: '', email: '', suggestion: '', status: 'Pendiente' });
    setIsEditing(false);
  };
  
  const handleStatusChange = (suggestionId: number, newStatus: Suggestion['status']) => {
    setSuggestions(prev => prev.map(s => s.id === suggestionId ? {...s, status: newStatus} : s));
  }

  const getStatusBadge = (status: Suggestion['status']) => {
    switch (status) {
      case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'Revisado': return 'bg-blue-100 text-blue-800';
      case 'Implementado': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? 'Editar' : 'Registrar'} Sugerencia</CardTitle>
          <CardDescription>
            {isEditing ? 'Modifica los detalles de la sugerencia.' : 'Añade una nueva sugerencia al sistema.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="correo@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="suggestion" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sugerencia</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Descripción de la sugerencia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {isEditing && (
                 <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Estado" />
                          </SelectTrigger>
                       </FormControl>
                      <SelectContent>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Revisado">Revisado</SelectItem>
                        <SelectItem value="Implementado">Implementado</SelectItem>
                      </SelectContent>
                    </Select>
                     <FormMessage />
                  </FormItem>
                 )} />
              )}
              <div className="flex gap-2">
                <Button type="submit">{isEditing ? 'Actualizar' : 'Registrar'} Sugerencia</Button>
                {isEditing && <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Sugerencias</CardTitle>
          <CardDescription>
            Revisa y gestiona las sugerencias enviadas por los usuarios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Sugerencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suggestions.map((suggestion) => (
                <TableRow key={suggestion.id}>
                  <TableCell>{suggestion.id}</TableCell>
                  <TableCell>{suggestion.name}</TableCell>
                  <TableCell>{suggestion.email}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{suggestion.suggestion}</TableCell>
                  <TableCell>{suggestion.date}</TableCell>
                  <TableCell>
                    <Select value={suggestion.status} onValueChange={(newStatus: Suggestion['status']) => handleStatusChange(suggestion.id, newStatus)}>
                      <SelectTrigger className="w-[120px] focus:ring-0 border-0 shadow-none">
                        <SelectValue>
                           <Badge className={`${getStatusBadge(suggestion.status)} hover:${getStatusBadge(suggestion.status)}`}>{suggestion.status}</Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Revisado">Revisado</SelectItem>
                        <SelectItem value="Implementado">Implementado</SelectItem>
                      </SelectContent>
                    </Select>
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
                        <DropdownMenuItem onClick={() => handleEdit(suggestion)}>Editar</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">Eliminar</DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción no se puede deshacer. Esto eliminará permanentemente la sugerencia.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(suggestion.id)}>Eliminar</AlertDialogAction>
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
