
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { QrCode as QrCodeIcon, MoreHorizontal, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import QRCode from 'qrcode';
import { useToast } from '@/hooks/use-toast';
import { useManagement } from '@/components/admin/management-provider';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { GeneratedQr } from '@/lib/mock-data';

export default function QrCodeManagementPage() {
  const { trees, generatedQrs, setGeneratedQrs } = useManagement();
  const [selectedTreeId, setSelectedTreeId] = useState<string>('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalQr, setModalQr] = useState<GeneratedQr | null>(null);
  const { toast } = useToast();

  const generateQrCode = () => {
    if (!selectedTreeId) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Por favor, selecciona un árbol para generar el código QR.',
      });
      return;
    }

    if (generatedQrs.some(qr => qr.treeId === parseInt(selectedTreeId, 10))) {
        toast({
          variant: 'destructive',
          title: 'QR ya existe',
          description: 'Ya se ha generado un código QR para este árbol. Puedes verlo en la tabla de abajo.',
        });
        return;
    }

    const tree = trees.find((t) => t.id === parseInt(selectedTreeId, 10));
    if (!tree) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Árbol no encontrado.',
      });
      return;
    }

    const qrCodeContent = `/ver_arbol/${tree.id}`;

    QRCode.toDataURL(qrCodeContent, {
      width: 512,
      margin: 2,
      color: {
        dark: '#2E7D32',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        const newId = generatedQrs.length > 0 ? Math.max(...generatedQrs.map((q) => q.id)) + 1 : 1;
        const newQr: GeneratedQr = {
          id: newId,
          treeId: tree.id,
          qrCodeDataUrl: url,
        };
        setGeneratedQrs((prev) => [...prev, newQr]);
        setQrCodeDataUrl(url); // Muestra el QR recién generado
        toast({
          title: '¡QR Generado y Guardado!',
          description: `Código QR para "${tree.commonName}" creado y añadido a la tabla.`,
        });
      })
      .catch((err) => {
        console.error(err);
        toast({
          variant: 'destructive',
          title: 'Error de generación',
          description: 'No se pudo generar el código QR.',
        });
      });
  };

  const handleDelete = (qrId: number) => {
    setGeneratedQrs(prev => prev.filter(qr => qr.id !== qrId));
    toast({
        variant: 'destructive',
        title: 'QR Eliminado',
        description: 'El código QR ha sido eliminado de la lista.',
    });
  }

  const handleViewQr = (qr: GeneratedQr) => {
    setModalQr(qr);
    setIsModalOpen(true);
  }

  const getTreeById = (treeId: number) => {
    return trees.find(t => t.id === treeId);
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Generación de Código QR</CardTitle>
          <CardDescription>
            Genera y guarda un código QR que enlaza a la página de detalles de un árbol.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tree-select">Seleccionar Árbol</Label>
            <Select onValueChange={setSelectedTreeId} value={selectedTreeId}>
              <SelectTrigger id="tree-select">
                <SelectValue placeholder="Selecciona un árbol registrado" />
              </SelectTrigger>
              <SelectContent>
                {trees.map((tree) => (
                  <SelectItem key={tree.id} value={String(tree.id)}>
                    ID {tree.id} - {tree.commonName} ({tree.species})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generateQrCode}>
            <QrCodeIcon className="mr-2 h-4 w-4" />
            Generar y Guardar QR
          </Button>

          {qrCodeDataUrl && (
            <div className="pt-4 animate-in fade-in duration-500">
              <h3 className="font-semibold mb-2">QR Recién Generado:</h3>
              <div className="w-48 h-48 bg-muted rounded-md flex items-center justify-center p-2 border">
                <Image
                  src={qrCodeDataUrl}
                  alt="Generated QR Code"
                  width={180}
                  height={180}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>QRs Guardados</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID Árbol</TableHead>
                        <TableHead>Nombre Común</TableHead>
                        <TableHead>Nombre Científico</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {generatedQrs.map((qr) => {
                        const tree = getTreeById(qr.treeId);
                        if (!tree) return null;
                        return (
                            <TableRow key={qr.id}>
                                <TableCell>{tree.id}</TableCell>
                                <TableCell className="font-medium">{tree.commonName}</TableCell>
                                <TableCell>{tree.species}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={tree.status === 'Activo' ? 'default' : 'outline'}
                                        className={tree.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                                    >
                                        {tree.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="flex gap-2">
                                     <Button variant="outline" size="sm" onClick={() => handleViewQr(qr)}>
                                        <Eye className="mr-2 h-4 w-4"/> Ver QR
                                     </Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                         <Button variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/> Eliminar</Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            Esta acción no se puede deshacer. Esto eliminará permanentemente el QR guardado.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDelete(qr.id)}>Eliminar</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Código QR para: {modalQr ? getTreeById(modalQr.treeId)?.commonName : ''}</DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center p-4">
                {modalQr && (
                    <Image src={modalQr.qrCodeDataUrl} alt="Saved QR Code" width={300} height={300} />
                )}
            </div>
            <DialogFooter className="sm:justify-between">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cerrar</Button>
                </DialogClose>
                 {modalQr && (
                    <Button asChild>
                        <a href={modalQr.qrCodeDataUrl} download={`qr-arbol-${modalQr.treeId}.png`}>
                            Descargar QR
                        </a>
                    </Button>
                 )}
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
