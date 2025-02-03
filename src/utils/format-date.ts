export function FormatDate(date: string) {
  const d = new Date(date)
  const day = d.getDate() + 1
  const month = d.getMonth() + 1
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}