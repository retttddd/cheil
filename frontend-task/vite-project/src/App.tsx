import { useState } from 'react'
import { Filter } from './components/filter'
import { ProductCard } from './components/product-card'
import { mockData } from './mock/data'

const allValues = { value: '', label: 'Wszystkie' }
const sortValues = [
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
    value: String(capacity),
    label: `${capacity}kg`,
  })),
]

function App() {
  const [sort, setSort] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [energyClasses, setEnergyClasses] = useState<string[]>([])
  const [capacity, setCapacity] = useState('')
  const [showAll, setShowAll] = useState(false)

  const products = mockData.filter(
    (product) =>
      features.every((feature) => product.features.includes(feature)) &&
      (energyClasses.length === 0 || energyClasses.includes(product.energyClass)) &&
      (!capacity || String(product.capacity) === capacity),
  )

  if (sort === 'price') {
    products.sort((a, b) => a.price.value - b.price.value)
  } else if (sort === 'capacity') {
    products.sort((a, b) => a.capacity - b.capacity)
  }

  return (
    <>
      <header>
        <h1>Wybierz urządzenie</h1>
      </header>
      <main>
        <div className="filter-block">
          <Filter
            title="Sortuj po:"
            values={sortValues}
            currentValue={sort}
            setter={(value) => {
              setSort(value)
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
              setFeatures(value)
              setShowAll(false)
            }}
          />
          <Filter
            title="Klasa energetyczna:"
            multiple
            values={energyClassValues}
            currentValue={energyClasses}
            setter={(value) => {
              setEnergyClasses(value)
              setShowAll(false)
            }}
          />
          <Filter
            title="Pojemność:"
            values={capacityValues}
            currentValue={capacity}
            setter={(value) => {
              setCapacity(value)
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
