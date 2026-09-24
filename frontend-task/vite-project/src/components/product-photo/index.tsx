import { useState } from 'react'
import type { ProductInterface } from '../../interfaces/product'
import './product-photo.css'

interface ProductPhotoProps {
  product: Pick<ProductInterface, 'image' | 'name'>
}

export function ProductPhoto({ product }: ProductPhotoProps) {
  const imageUrl = product.image.trim()
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)

  if (!imageUrl || failedImageUrl === imageUrl) {
    return (
      <div
        className="product-photo product-photo--placeholder"
        role="img"
        aria-label={`Brak zdjęcia produktu ${product.name}`}
      >
      </div>
    )
  }

  return (
    <img
      className="product-photo"
      src={imageUrl}
      alt={product.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailedImageUrl(imageUrl)}
    />
  )
}
