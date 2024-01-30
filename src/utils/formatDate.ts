import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export function formatUtc(date: string) {
  return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
}
