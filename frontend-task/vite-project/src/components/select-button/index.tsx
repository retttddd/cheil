import './select-button.css'

interface SelectButtonProps {
  selected?: boolean
  onClick?: () => void
}

export function SelectButton({ selected = false, onClick }: SelectButtonProps) {
  return (
    <button
      className={`select-button${selected ? ' select-button--selected' : ''}`}
      type="button"
      onClick={onClick}
    >
      {selected ? 'Wybrane' : 'Wybierz'}
    </button>
  )
}
