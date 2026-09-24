import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { ProductInterface } from '../interfaces/product'

interface CartContextType {
  items: ProductInterface[]
  setItems: Dispatch<SetStateAction<ProductInterface[]>>
}

export const CartContext = createContext<CartContextType | null>(null)

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
