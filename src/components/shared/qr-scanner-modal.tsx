
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
import { QrCode, CameraOff, RefreshCw } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const QR_REGION_ID = 'qr-reader-region';

export default function QrScannerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const router = useRouter();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);


   useEffect(() => {
    const savedX = localStorage.getItem('qr-button-pos-x');
    const savedY = localStorage.getItem('qr-button-pos-y');
    
    if (savedX === null || savedY === null) {
        const initialX = window.innerWidth - 72 - 24; // window - button_width - margin_right
        const initialY = window.innerHeight - 72 - 24; // window - button_height - margin_bottom
        setPosition({ x: initialX, y: initialY });
    } else {
      setPosition({ x: parseInt(savedX, 10), y: parseInt(savedY, 10) });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setWasDragged(false);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    setIsDragging(true);
    setWasDragged(false);
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !buttonRef.current) return;
    setWasDragged(true);
    const dx = e.clientX - dragStartPos.current.x;
    const dy = e.clientY - dragStartPos.current.y;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    setPosition(prevPos => {
      const newX = Math.max(0, Math.min(window.innerWidth - buttonRef.current!.offsetWidth, prevPos.x + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - buttonRef.current!.offsetHeight, prevPos.y + dy));
      return { x: newX, y: newY };
    });
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !buttonRef.current) return;
    setWasDragged(true);
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartPos.current.x;
    const dy = touch.clientY - dragStartPos.current.y;
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };

     setPosition(prevPos => {
      const newX = Math.max(0, Math.min(window.innerWidth - buttonRef.current!.offsetWidth, prevPos.x + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - buttonRef.current!.offsetHeight, prevPos.y + dy));
      return { x: newX, y: newY };
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if(wasDragged) {
        localStorage.setItem('qr-button-pos-x', String(position.x));
        localStorage.setItem('qr-button-pos-y', String(position.y));
      }
    }
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!wasDragged) {
      handleOpenChange(true);
    }
  };

  const handleTouchEnd = () => {
    if (!wasDragged) {
      handleOpenChange(true);
    }
    handleMouseUp();
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);


  const cleanup = () => {
    if (html5QrCodeRef.current?.isScanning) {
      html5QrCodeRef.current.stop().catch(console.error);
    }
    setIsScanning(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (isDragging) return;
    setIsOpen(open);
    if (!open) {
      cleanup();
      setHasCameraPermission(null);
      setScanResult(null);
    }
  };

  const onScanSuccess = (decodedText: string) => {
    cleanup();
    setScanResult(decodedText);
  };

  const startScanner = async () => {
    setScanResult(null);
    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length) {
        setHasCameraPermission(true);
        if (!html5QrCodeRef.current) {
          html5QrCodeRef.current = new Html5Qrcode(QR_REGION_ID, {
            verbose: false,
          });
        }
        
        if (html5QrCodeRef.current && !html5QrCodeRef.current.isScanning) {
            html5QrCodeRef.current.start(
            { facingMode: 'environment' },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
            },
            onScanSuccess,
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

  const isValidUrl = (text: string | null): text is string => {
    if (!text) return false;
    try {
      // Check for full URLs
      new URL(text);
      return true;
    } catch (_) {
      // Check for relative paths starting with /
      return text.startsWith('/');
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
                ref={buttonRef}
                style={{
                    position: 'fixed',
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    touchAction: 'none',
                }}
                onClick={handleMouseClick}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={cn(
                  'z-50 rounded-full h-16 w-16 bg-primary text-primary-foreground shadow-lg flex items-center justify-center cursor-grab transition-transform duration-300',
                  isDragging 
                    ? 'scale-110 shadow-2xl cursor-grabbing' 
                    : 'animate-pulse-slow hover:scale-105 hover:shadow-xl hover:animate-none'
                )}
                aria-label="Escanear Código QR"
              >
              <QrCode className="h-8 w-8" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Escanear QR</p>
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
                  <Button asChild className="w-full mt-4" onClick={() => handleOpenChange(false)}>
                    <Link href={scanResult} target={scanResult.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
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
