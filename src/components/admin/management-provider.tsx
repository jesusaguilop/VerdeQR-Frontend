'use client';
import { useContext } from 'react';
import { ManagementContext } from '@/context/management-provider';

export function useManagement() {
  const context = useContext(ManagementContext);
  if (context === undefined) {
    throw new Error('useManagement must be used within a ManagementProvider');
  }
  return context;
}
