export function parsePrice(value: number) {
  const parts = new Intl.NumberFormat('pl-PL', {
    useGrouping: true,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).formatToParts(value)
  const integerGroups = parts.filter((part) => part.type === 'integer').map((part) => part.value)
  const groupSeparator = parts.find((part) => part.type === 'group')?.value ?? ''

  return {
    thousands: integerGroups.slice(0, -1).join(groupSeparator),
    hundreds: integerGroups.at(-1) ?? '0',
    cents: parts.find((part) => part.type === 'fraction')?.value ?? '00',
  }
}
