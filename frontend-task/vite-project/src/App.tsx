import { ProductCard } from './components/product-card'
import { mockData } from './mock/data'

function App() {
  return (
    <>
      <header />
      <main>
        <div className="product-cards">
          {mockData.map((product, index) => (
            <ProductCard key={`${product.code}-${index}`} product={product} />
          ))}
        </div>
      </main>
      <footer />
    </>
  )
}

export default App
