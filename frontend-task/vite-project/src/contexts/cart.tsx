import { useMemo, useState } from 'react'
import type { PropsWithChildren } from 'react'
import type { ProductInterface } from '../interfaces/product'
import { CartContext } from './cart-context'

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<ProductInterface[]>([])
  const value = useMemo(() => ({ items, setItems }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
