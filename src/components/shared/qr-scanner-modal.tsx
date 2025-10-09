
'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
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
import { QrCode, CameraOff, Move, RefreshCw } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const QR_REGION_ID = 'qr-reader-region';

export default function QrScannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const initialX = window.innerWidth - 80;
    const initialY = window.innerHeight - 80;
    setPosition({ x: initialX, y: initialY });
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!buttonRef.current) return;
    setIsDragging(true);
    setIsMoved(false);
    const buttonRect = buttonRef.current.getBoundingClientRect();
    dragStartPos.current = {
      x: clientX - buttonRect.left,
      y: clientY - buttonRect.top,
    };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    setIsMoved(true);

    let newX = clientX - dragStartPos.current.x;
    let newY = clientY - dragStartPos.current.y;

    newX = Math.max(0, Math.min(newX, window.innerWidth - 64));
    newY = Math.max(0, Math.min(newY, window.innerHeight - 64));

    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handlePointerUp = () => {
    if (!isMoved) {
      handleOpenChange(true);
    }
    handleDragEnd();
  };

  const cleanup = () => {
    if (html5QrCodeRef.current?.isScanning) {
      html5QrCodeRef.current.stop().catch(console.error);
    }
    setIsScanning(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      cleanup();
      setHasCameraPermission(null);
      setScanResult(null);
    }
  };

  const startScanner = async () => {
    setScanResult(null);
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        setHasCameraPermission(true);
        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode(QR_REGION_ID);
        }
        
        if (html5QrCodeRef.current && !html5QrCodeRef.current.isScanning) {
            html5QrCodeRef.current.start(
            { facingMode: 'environment' },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
            },
            (decodedText) => {
              cleanup();
              setScanResult(decodedText);
            },
            () => {}
          ).then(() => setIsScanning(true))
          .catch((err) => {
            console.error("Error starting scanner:", err);
            setHasCameraPermission(false);
          });
        }
      } else {
        setHasCameraPermission(false);
      }
    } catch (err) {
      console.error("Camera permissions error:", err);
      setHasCameraPermission(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      startScanner();
    }
    return () => {
      if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
        cleanup();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const isValidUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip open={isDragging ? false : undefined}>
          <TooltipTrigger asChild>
            <button
              ref={buttonRef}
              onMouseDown={(e: MouseEvent) => handleDragStart(e.clientX, e.clientY)}
              onMouseMove={(e: MouseEvent) => handleDragMove(e.clientX, e.clientY)}
              onMouseUp={handlePointerUp}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e: TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e: TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={handlePointerUp}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                touchAction: 'none',
              }}
              className={cn(
                "fixed z-50 rounded-full h-16 w-16 bg-accent text-accent-foreground shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-accent/90",
                { 'cursor-grabbing': isDragging }
              )}
              aria-label="Escanear Código QR o arrastrar"
            >
              <QrCode className="h-8 w-8" />
              <Move className="absolute h-4 w-4 bottom-1 right-1 text-accent-foreground/50" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Identificar QR</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md w-[95vw] p-0 gap-0 overflow-hidden">
          {!scanResult ? (
            <>
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
                {hasCameraPermission === null && !isScanning && (
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
            </>
          ) : (
            <>
              <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-2xl font-bold text-primary">
                  Resultado del Escaneo
                </DialogTitle>
                <DialogDescription>
                  Se ha obtenido la siguiente información del código QR.
                </DialogDescription>
              </DialogHeader>
              <div className="p-6 pt-0">
                <div className="bg-muted p-4 rounded-md text-sm break-words">
                  {scanResult}
                </div>
                {isValidUrl(scanResult) && (
                  <Button asChild className="w-full mt-4">
                    <Link href={scanResult} target="_blank" rel="noopener noreferrer">
                      Abrir Enlace
                    </Link>
                  </Button>
                )}
              </div>
              <DialogFooter className="p-6 pt-4 bg-background grid grid-cols-2 gap-2">
                 <Button type="button" variant="secondary" onClick={startScanner} className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Escanear de nuevo
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline" className="w-full">
                    Cerrar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
