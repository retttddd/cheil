import type { ProductInterface } from '../../interfaces/product'
import { useCartContext } from '../../contexts/card/cart-context'
import { parsePrice } from '../../utils/parse-price'
import { EnergyClass } from '../energy-class'
import { ProductPhoto } from '../product-photo'
import { SelectButton } from '../select-button'
import './product-card.css'

interface ProductCardProps {
  product: ProductInterface
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, setItems } = useCartContext()
  const selected = items.includes(product)
  const { thousands, hundreds, cents } = parsePrice(product.price.value)

  const toggleCart = () => {
    setItems((currentItems) =>
      currentItems.includes(product)
        ? currentItems.filter((item) => item !== product)
        : [...currentItems, product],
    )
  }

  return (
    <article className="product-card">
      <ProductPhoto product={product} />
      <span className="product-card__title">
        {product.code}, {product.name},{' '}
        {(product.titleCapacity ?? product.capacity).toLocaleString('pl-PL')} kg, {product.color}
      </span>
      <div className="product-card__specifications">
        <p>
          Pojemność (kg): <strong>{product.capacity.toLocaleString('pl-PL')}</strong>
        </p>
        <p>
          Wymiary (GxSxW): <strong>{product.dimensions}</strong>
        </p>
        <p>
          Funkcje: <strong>{product.features.join(', ')}</strong>
        </p>
      </div>
      <div className="product-card__energy-class">
        <span>Klasa energetyczna</span>
        <EnergyClass energyClass={product.energyClass} />
      </div>
      <div className="product-card__price-tag">
        <span className="product-card__price-validity">
          Cena obowiązuje: {product.price.validFrom.toLocaleDateString('pl-PL')} -{' '}
          {product.price.validTo.toLocaleDateString('pl-PL')}
        </span>
        <div className="product-card__price">
          <span className="product-card__price-whole">
            {thousands && <span>{thousands}</span>}
            <span>{hundreds}</span>
          </span>
          <span className="product-card__price-suffix">
            <span className="product-card__price-cents">{cents}</span>
            <span className="product-card__price-currency">{product.price.currency}</span>
          </span>
        </div>
        {product.price.installment && (
          <span className="product-card__installment">
            {product.price.installment.value.toLocaleString('pl-PL', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            {product.price.currency} × {product.price.installment.period} rat
          </span>
        )}
        <div className="product-card__button">
          <SelectButton selected={selected} onClick={toggleCart} />
        </div>
      </div>
    </article>
  )
}
