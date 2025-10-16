
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
import { QrCode as QrCodeIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useToast } from '@/hooks/use-toast';
import { useManagement } from '@/components/admin/management-provider';
import Image from 'next/image';

export default function QrCodeManagementPage() {
  const { trees } = useManagement();
  const [selectedTreeId, setSelectedTreeId] = useState<string>('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
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

    const tree = trees.find((t) => t.id === parseInt(selectedTreeId, 10));
    if (!tree) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Árbol no encontrado.',
      });
      return;
    }

    const qrCodeContent = JSON.stringify({
      id: tree.id,
      commonName: tree.commonName,
      species: tree.species,
      description: tree.description,
      characteristics: tree.characteristics,
      ecoServices: tree.ecoServices,
      forestType: tree.forestType,
      center: tree.center,
    });

    QRCode.toDataURL(qrCodeContent, {
      width: 256,
      margin: 2,
      color: {
        dark: '#2E7D32',
        light: '#FFFFFF',
      },
    })
      .then((url) => {
        setQrCodeDataUrl(url);
        toast({
          title: '¡QR Generado!',
          description: `Código QR para "${tree.commonName}" creado exitosamente.`,
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

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Generación de Código QR</CardTitle>
          <CardDescription>
            Genera un código QR para un árbol específico.
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
            Generar QR
          </Button>

          {qrCodeDataUrl && (
            <div className="pt-4 animate-in fade-in duration-500">
              <h3 className="font-semibold mb-2">QR Generado:</h3>
              <div className="w-48 h-48 bg-muted rounded-md flex items-center justify-center p-2 border">
                <Image
                  src={qrCodeDataUrl}
                  alt="Generated QR Code"
                  width={180}
                  height={180}
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                asChild
              >
                <a href={qrCodeDataUrl} download={`qr-arbol-${selectedTreeId}.png`}>
                  Descargar QR
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
