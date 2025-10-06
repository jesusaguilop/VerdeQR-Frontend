'use client';

import { Leaf, Sprout } from 'lucide-react';
import styles from './floating-plants.module.css';

const Plant = ({ style, icon: Icon, className }: { style: React.CSSProperties, icon: React.ElementType, className: string }) => (
  <Icon
    className={`${styles.plant} ${className}`}
    style={style}
  />
);

export default function FloatingPlants() {
  const plants = [
    { id: 1, style: { top: '15%', left: '10%', animationDelay: '0s' }, icon: Leaf, className: styles.plant1 },
    { id: 2, style: { top: '50%', left: '5%', animationDelay: '2s' }, icon: Sprout, className: styles.plant2 },
    { id: 3, style: { top: '80%', left: '15%', animationDelay: '4s' }, icon: Leaf, className: styles.plant3 },
    { id: 4, style: { top: '10%', left: '90%', animationDelay: '1s' }, icon: Sprout, className: styles.plant4 },
    { id: 5, style: { top: '60%', left: '95%', animationDelay: '3s' }, icon: Leaf, className: styles.plant1 },
    { id: 6, style: { top: '90%', left: '85%', animationDelay: '5s' }, icon: Sprout, className: styles.plant2 },
    { id: 7, style: { top: '30%', left: '50%', animationDelay: '1.5s' }, icon: Leaf, className: styles.plant3 },
  ];

  return (
    <div className={styles.container}>
      {plants.map(plant => (
        <Plant key={plant.id} style={plant.style} icon={plant.icon} className={plant.className} />
      ))}
    </div>
  );
}
