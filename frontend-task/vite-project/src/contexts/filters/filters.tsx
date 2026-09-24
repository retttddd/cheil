import { useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import { FiltersContext } from './filters-context'
import type { FiltersContextType } from './filters-context'

export function FiltersProvider({ children }: PropsWithChildren) {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<FiltersContextType['filters']>({
    sort: '',
    capacity: '',
    energyClass: [],
    feature: [],
  })
  const value = useMemo(
    () => ({ query, setQuery, filters, setFilters }),
    [query, filters],
  )

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
}
