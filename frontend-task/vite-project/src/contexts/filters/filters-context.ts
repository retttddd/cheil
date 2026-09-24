import { createContext, useContext } from 'react'
import type { Capacity, EnergyClass, Features } from '../../interfaces/product'

export type Sort = 'price' | 'capacity'

export interface FiltersContextType {
  query: string
  setQuery: (query: string) => void
  filters: {
    sort: Sort | ''
    capacity: Capacity | ''
    energyClass: EnergyClass[]
    feature: Features[]
  }
  setFilters: (filters: FiltersContextType['filters']) => void
}

export const FiltersContext = createContext<FiltersContextType | null>(null)

export function useFilterContext() {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFilterContext must be used within a FiltersProvider')
  }
  return context
}
