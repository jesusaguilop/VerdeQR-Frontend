'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { QrCode, CameraOff, X } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const QR_REGION_ID = 'qr-reader-region';

export default function QrScannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const { toast } = useToast();

  const cleanup = () => {
    if (html5QrCodeRef.current?.isScanning) {
      html5QrCodeRef.current.stop().catch(console.error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      cleanup();
      setIsScanning(false);
      setHasCameraPermission(null);
    }
  };

  const handleScanSuccess = (decodedText: string, decodedResult: any) => {
    console.log(`Scan result: ${decodedText}`, decodedResult);
    toast({
      title: 'Código QR Escaneado',
      description: `Contenido: ${decodedText}`,
    });
    handleOpenChange(false);
    // You can add navigation logic here, e.g., router.push(decodedText)
  };

  const handleScanError = (errorMessage: string) => {
    // This can get noisy, so we might not want to log every error.
    // console.error(`QR Scanner Error: ${errorMessage}`);
  };

  useEffect(() => {
    if (isOpen) {
      const initScanner = async () => {
        try {
          const devices = await Html5Qrcode.getCameras();
          if (devices && devices.length) {
            setHasCameraPermission(true);
            html5QrCodeRef.current = new Html5Qrcode(QR_REGION_ID);
            html5QrCodeRef.current.start(
              { facingMode: 'environment' },
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
              },
              handleScanSuccess,
              handleScanError
            ).then(() => setIsScanning(true));
          } else {
            setHasCameraPermission(false);
          }
        } catch (err) {
          console.error(err);
          setHasCameraPermission(false);
        }
      };
      initScanner();
    }
    
    return () => {
      if (isScanning) {
        cleanup();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={() => handleOpenChange(true)}
              className="fixed bottom-20 right-8 z-50 rounded-full h-16 w-16 bg-accent text-accent-foreground shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-accent/90"
              aria-label="Escanear Código QR"
            >
              <QrCode className="h-8 w-8" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Identificar QR</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md w-[95vw] p-0 gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <QrCode /> Escanear Código QR
            </DialogTitle>
            <DialogDescription>
              Apunta la cámara al código QR para obtener información sobre el árbol.
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-square w-full bg-muted overflow-hidden relative">
            <div id={QR_REGION_ID} className="w-full h-full" />
            {hasCameraPermission === false && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4">
                  <CameraOff className="h-16 w-16 text-destructive mb-4" />
                  <Alert variant="destructive">
                    <AlertTitle>Acceso a la cámara denegado</AlertTitle>
                    <AlertDescription>
                      Por favor, permite el acceso a la cámara en tu navegador para escanear códigos QR.
                    </AlertDescription>
                  </Alert>
               </div>
            )}
             {hasCameraPermission === null && (
               <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <p>Iniciando cámara...</p>
               </div>
            )}
          </div>
          <DialogFooter className="p-6 pt-4 bg-background">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}