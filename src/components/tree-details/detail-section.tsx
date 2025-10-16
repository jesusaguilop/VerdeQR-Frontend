
import { cn } from '@/lib/utils';
import React from 'react';

type DetailSectionProps = {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
};

export default function DetailSection({
  title,
  children,
  icon: Icon,
  className,
}: DetailSectionProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold text-primary flex items-center gap-2 border-b pb-2 mb-4">
        {Icon && <Icon className="h-5 w-5" />}
        {title}
      </h3>
      {children}
    </div>
  );
}
