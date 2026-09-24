import type { EnergyClass as EnergyClassValue } from '../../interfaces/product'
import './energy-class.css'

interface EnergyClassProps {
  energyClass: EnergyClassValue
}

export function EnergyClass({ energyClass }: EnergyClassProps) {
  return (
    <span
      className="energy-class"
      aria-label={`Klasa energetyczna ${energyClass}`}
    >
      {energyClass}
    </span>
  )
}
