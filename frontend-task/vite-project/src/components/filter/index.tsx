import { useId, useRef, useState } from 'react'
import './filter.css'

type FilterProps = {
  title: string
  values: { value: string; label: string }[]
  placeholder?: string
} & (
  | { multiple?: false; currentValue: string; setter: (value: string) => void }
  | { multiple: true; currentValue: string[]; setter: (value: string[]) => void }
)

export function Filter(props: FilterProps) {
  const { title, values, placeholder = 'Pokaż wszystkie' } = props
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const selectedValues = props.multiple
    ? props.currentValue
    : props.currentValue ? [props.currentValue] : []
  const selectedLabel = values
    .filter(({ value }) => selectedValues.includes(value))
    .map(({ label }) => label)
    .join(', ') || placeholder

  const selectValue = (value: string) => {
    if (props.multiple) {
      props.setter(
        !value
          ? []
          : selectedValues.includes(value)
            ? selectedValues.filter((selected) => selected !== value)
            : [...selectedValues, value],
      )
    } else {
      props.setter(value)
      setIsOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <div
      className="filter"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false)
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setIsOpen(false)
          triggerRef.current?.focus()
        }
      }}
    >
      <span className="filter__title" id={`${id}-title`}>
        {title}
      </span>
      <button
        ref={triggerRef}
        type="button"
        className="filter__trigger"
        aria-expanded={isOpen}
        aria-controls={`${id}-options`}
        aria-labelledby={`${id}-title ${id}-value`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="filter__value" id={`${id}-value`} title={selectedLabel}>
          {selectedLabel}
        </span>
      </button>
      <div
        className={`filter__options${isOpen ? ' filter__options--open' : ''}`}
        id={`${id}-options`}
        role="group"
        aria-labelledby={`${id}-title`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        {values.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className="filter__option"
            aria-pressed={value ? selectedValues.includes(value) : selectedValues.length === 0}
            onClick={() => selectValue(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
