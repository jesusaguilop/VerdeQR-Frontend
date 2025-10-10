
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
import { QrCode } from 'lucide-react';

export default function QrCodeManagementPage() {
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
            <Select>
              <SelectTrigger id="tree-select">
                <SelectValue placeholder="Selecciona un árbol registrado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9">ID 9 - Cañaguate (Tabebuia sp)</SelectItem>
                <SelectItem value="8">ID 8 - Yatu (Jacquinia armillaris)</SelectItem>
                <SelectItem value="7">ID 7 - Rabo de iguana (Machaerium biovulatum)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Generar QR
            </Button>

            <div className="pt-4">
                <h3 className="font-semibold mb-2">QR Generado:</h3>
                <div className="w-48 h-48 bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground text-sm">Aquí aparecerá el QR</p>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
