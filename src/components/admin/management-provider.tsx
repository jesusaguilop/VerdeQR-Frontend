'use client';

import { cn } from '@/lib/utils';
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';

type ManagementContextType = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

const ManagementContext = createContext<ManagementContextType | undefined>(
  undefined
);

export function ManagementProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ManagementContext.Provider value={{ isExpanded, setIsExpanded }}>
      <div className={cn('group/provider', isExpanded && 'is-expanded')}>
        {children}
      </div>
    </ManagementContext.Provider>
  );
}

export function useManagement() {
  const context = useContext(ManagementContext);
  if (context === undefined) {
    throw new Error('useManagement must be used within a ManagementProvider');
  }
  return context;
}
