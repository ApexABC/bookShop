import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export function formatUtc(date: string) {
  return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
}

export function formatRate(rate: number) {
  if (String(rate).length === 1) {
    const arr = []
    arr[0] = rate
    arr.push('.')
    arr.push('0')
    return arr.join('')
  } else return rate
}

export function arraySortByTime(arr: any[], filedName: string) {
  arr.sort((a: any, b: any) => {
    if (a[filedName] > b[filedName]) return -1
    else if (a[filedName] < b[filedName]) return 1
    else return 0
  })
  return arr
}