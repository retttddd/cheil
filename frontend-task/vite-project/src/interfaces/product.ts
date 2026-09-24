export type EnergyClass = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export type Capacity = 8 | 9 | 10.5

export type Features =
  | 'Drzwi AddWash™'
  | 'Panel AI Control'
  | 'Silnik inwerterowy'
  | 'Wyświetlacz elektroniczny'

export interface ProductInterface {
  image: string
  code: string
  name: string
  color: string
  capacity: Capacity
  titleCapacity?: Capacity
  dimensions: string
  features: Features[]
  energyClass: EnergyClass
  price: {
    value: number
    currency: string
    installment?: {
      value: number
      period: number
    }
    validFrom: Date
    validTo: Date
  }
}
