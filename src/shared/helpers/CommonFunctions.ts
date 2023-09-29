import { differenceInMonths } from 'date-fns'

function hasRequiredProperties(obj: any, props: string[]): boolean {
  for (const prop of props) {
    if (obj[prop] === undefined) {
      return false
    }
  }
  return true
}

function removeSpacesFromObjectProperties(obj: any) {
  const newObj: { [key: string]: string } = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.trim()
      newObj[newKey] = obj[key].trim()
    }
  }
  return newObj
}

function formatDateBrl(date: Date): string {
  if (!date) {
    return ''
  }
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

function dateDiffInMonth(startDate: Date) {
  const today = new Date()

  const months = differenceInMonths(today, startDate)
  return months
}

function formatDateStringDDMMYYYToDate(dateString: string) {
  const [day, month, year] = dateString.split('/')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}

export {
  hasRequiredProperties,
  removeSpacesFromObjectProperties,
  formatDateBrl,
  dateDiffInMonth,
  formatDateStringDDMMYYYToDate,
}
