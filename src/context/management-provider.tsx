'use client';

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react';
import {
  initialCenters,
  initialEcologicalInteractions,
  initialForestTypes,
  initialFunFacts,
  initialSpecies,
  initialSuggestions,
  initialTrees,
  initialTreeUses,
  initialUsers,
  initialGeneratedQrs,
  Center,
  EcologicalInteraction,
  ForestType,
  FunFact,
  Specie,
  Suggestion,
  Tree,
  TreeUse,
  User,
  GeneratedQr,
} from '@/lib/mock-data';

export type ManagementContextType = {
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  centers: Center[];
  setCenters: Dispatch<SetStateAction<Center[]>>;
  interactions: EcologicalInteraction[];
  setInteractions: Dispatch<SetStateAction<EcologicalInteraction[]>>;
  forestTypes: ForestType[];
  setForestTypes: Dispatch<SetStateAction<ForestType[]>>;
  funFacts: FunFact[];
  setFunFacts: Dispatch<SetStateAction<FunFact[]>>;
  species: Specie[];
  setSpecies: Dispatch<SetStateAction<Specie[]>>;
  suggestions: Suggestion[];
  setSuggestions: Dispatch<SetStateAction<Suggestion[]>>;
  trees: Tree[];
  setTrees: Dispatch<SetStateAction<Tree[]>>;
  treeUses: TreeUse[];
  setTreeUses: Dispatch<SetStateAction<TreeUse[]>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  generatedQrs: GeneratedQr[];
  setGeneratedQrs: Dispatch<SetStateAction<GeneratedQr[]>>;
};

export const ManagementContext = createContext<ManagementContextType | undefined>(
  undefined
);

export function ManagementProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [centers, setCenters] = useState<Center[]>(initialCenters);
  const [interactions, setInteractions] = useState<EcologicalInteraction[]>(initialEcologicalInteractions);
  const [forestTypes, setForestTypes] = useState<ForestType[]>(initialForestTypes);
  const [funFacts, setFunFacts] = useState<FunFact[]>(initialFunFacts);
  const [species, setSpecies] = useState<Specie[]>(initialSpecies);
  const [suggestions, setSuggestions] = useState<Suggestion[]>(initialSuggestions);
  const [trees, setTrees] = useState<Tree[]>(initialTrees);
  const [treeUses, setTreeUses] = useState<TreeUse[]>(initialTreeUses);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [generatedQrs, setGeneratedQrs] = useState<GeneratedQr[]>(initialGeneratedQrs);


  const value = {
    isExpanded,
    setIsExpanded,
    centers,
    setCenters,
    interactions,
    setInteractions,
    forestTypes,
    setForestTypes,
    funFacts,
    setFunFacts,
    species,
    setSpecies,
    suggestions,
    setSuggestions,
    trees,
    setTrees,
    treeUses,
    setTreeUses,
    users,
    setUsers,
    generatedQrs,
    setGeneratedQrs,
  };

  return (
    <ManagementContext.Provider value={value}>
      <div className={cn('group/provider', isExpanded && 'is-expanded')}>
        {children}
      </div>
    </ManagementContext.Provider>
  );
}

// Helper to add the 'cn' function if it's not globally available
// In most Next.js projects with shadcn/ui, this is not needed in this file.
function cn(...inputs: any[]) {
  // A simple version of clsx + twMerge for client components
  const classes = inputs.filter(Boolean).join(' ');
  return classes;
}
