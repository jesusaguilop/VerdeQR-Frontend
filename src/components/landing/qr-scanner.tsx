'use client';

import { ScanLine } from 'lucide-react';
import styles from './qr-scanner.module.css';

export default function QrScanner() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl p-4 bg-background/30 dark:bg-card/20 backdrop-blur-sm border-2 border-primary/30 shadow-2xl flex items-center justify-center">
      <ScanLine className="w-32 h-32 text-primary/80" strokeWidth={1} />
      {/* Corner Brackets */}
      <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-accent rounded-tl-lg"></div>
      <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-accent rounded-tr-lg"></div>
      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-accent rounded-bl-lg"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-accent rounded-br-lg"></div>

      {/* Animated Scan Line */}
      <div className={styles.scanLine}></div>
    </div>
  );
}
