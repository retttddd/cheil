import './product-search.css'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <input
      className="product-search"
      type="search"
      aria-label="Szukaj produktów"
      placeholder="Search..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}
