export const dateToString = (date: Date) => {
  const dateLocal = new Date(date)
  const dd = dateLocal.getDate() < 10 ? `0${dateLocal.getDate()}` : dateLocal.getDate() 
  const mm = dateLocal.getMonth() + 1 < 10 ? `0${dateLocal.getMonth() + 1}` : dateLocal.getMonth() + 1
  const yyyy = dateLocal.getFullYear()
  const hh = dateLocal.getHours() < 10 ? `0${dateLocal.getHours()}` : dateLocal.getHours()
  const mimi = dateLocal.getMinutes() < 10 ? `0${dateLocal.getMinutes()}` : dateLocal.getMinutes()
  const dd_mm_yyyy = `${dd}-${mm}-${yyyy}`
  const hh_mimi = `${hh}:${mimi}`
  return [dd_mm_yyyy, hh_mimi]
}