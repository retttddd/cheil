import { useState } from 'react'
import { Filter } from './components/filter'
import { ProductCard } from './components/product-card'
import { ProductSearch } from './components/product-search'
import { useFilterContext } from './contexts/filters/filters-context'
import type { Sort } from './contexts/filters/filters-context'
import type { ProductInterface } from './interfaces/product'
import { mockData } from './mock/data'

const sortComparators: Record<Sort, (a: ProductInterface, b: ProductInterface) => number> = {
  price: (a, b) => a.price.value - b.price.value,
  capacity: (a, b) => a.capacity - b.capacity,
}

const allValues = { value: '' as const, label: 'Wszystkie' }
const sortValues: { value: Sort | ''; label: string }[] = [
  allValues,
  { value: 'price', label: 'Cena' },
  { value: 'capacity', label: 'Pojemność' },
]
const featureValues = [
  allValues,
  ...[...new Set(mockData.flatMap((product) => product.features))].map((feature) => ({
    value: feature,
    label: feature,
  })),
]
const energyClassValues = [
  allValues,
  ...[...new Set(mockData.map((product) => product.energyClass))].map((energyClass) => ({
    value: energyClass,
    label: energyClass,
  })),
]
const capacityValues = [
  allValues,
  ...[...new Set(mockData.map((product) => product.capacity))].map((capacity) => ({
    value: capacity,
    label: `${capacity}kg`,
  })),
]

function App() {
  const { query, setQuery, filters, setFilters } = useFilterContext()
  const { sort, feature: features, energyClass: energyClasses, capacity } = filters
  const [showAll, setShowAll] = useState(false)
  const searchQuery = query.trim().toLowerCase()

  const products = mockData.filter(
    (product) =>
      `${product.code} ${product.name}`.toLowerCase().includes(searchQuery) &&
      features.every((feature) => product.features.includes(feature)) &&
      (energyClasses.length === 0 || energyClasses.includes(product.energyClass)) &&
      (capacity === '' || product.capacity === capacity),
  )

  if (sort) {
    products.sort(sortComparators[sort])
  }

  return (
    <>
      <header>
        <h1>Wybierz urządzenie</h1>
      </header>
      <main>
        <ProductSearch
          value={query}
          onChange={(value) => {
            setQuery(value)
            setShowAll(false)
          }}
        />
        <div className="filter-block">
          <Filter
            title="Sortuj po:"
            values={sortValues}
            currentValue={sort}
            setter={(value) => {
              setFilters({ ...filters, sort: value })
              setShowAll(false)
            }}
            placeholder="Popularność"
          />
          <Filter
            title="Funkcje:"
            multiple
            values={featureValues}
            currentValue={features}
            setter={(value) => {
              setFilters({ ...filters, feature: value })
              setShowAll(false)
            }}
          />
          <Filter
            title="Klasa energetyczna:"
            multiple
            values={energyClassValues}
            currentValue={energyClasses}
            setter={(value) => {
              setFilters({ ...filters, energyClass: value })
              setShowAll(false)
            }}
          />
          <Filter
            title="Pojemność:"
            values={capacityValues}
            currentValue={capacity}
            setter={(value) => {
              setFilters({ ...filters, capacity: value })
              setShowAll(false)
            }}
          />
        </div>
        <p className="results-count" role="status">
          Liczba wyników: {products.length}
        </p>
        <div className="product-cards">
          {products.length === 0 && <p>Brak produktów spełniających wybrane kryteria.</p>}
          {products.slice(0, showAll ? products.length : 6).map((product, index) => (
            <ProductCard key={`${product.code}-${index}`} product={product} />
          ))}
        </div>
        {!showAll && products.length > 6 && (
          <button className="show-more" type="button" onClick={() => setShowAll(true)}>
            Pokaż więcej
          </button>
        )}
      </main>
      <footer />
    </>
  )
}

export default App
