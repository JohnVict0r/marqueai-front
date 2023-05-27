const textMonths: any = {
  1: 'Janeiro',
  2: 'Fevereiro',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}

export const dateFormated = (date: any) => {
  return date.format('YYYY-MM-DD')
}

export const dateWithoutTimestamp = (date: any) => {
  if (!date) return ''
  return date.split('T')[0]
}

export const dateExtend = (date: any) => {
  const [year, month, day] = date.split('T')[0].split('-')
  return `Dia ${day} de ${textMonths[Number(month)]} de ${year}`
}

export const dateInitial = (date: any) => {
  const [year, month, day] = date.split('T')[0].split('-')

  return `${day}/${month}/${year}`
}

export const minutesToHourString = (minutes: number): string => {
  const hourCalc = Math.trunc(minutes / 60)

  if (!hourCalc) return `${minutes}min`

  const minutesCalc = minutes % 60

  if (!minutesCalc) return `${hourCalc}h`

  const minutesWithZero = addZero(minutes % 60)

  return `${hourCalc}h${minutesWithZero}min`
}

export const minutesToHourFormated = (minutes: number): string => {
  const hourCalc = Math.trunc(minutes / 60)
  const minutesCalc = minutes % 60

  const minutesWithZero = addZero(minutesCalc)
  const hoursWithZero = addZero(hourCalc)

  return `${hoursWithZero}:${minutesWithZero}`
}

function addZero(numero: any) {
  if (numero <= 9) return '0' + numero
  else return numero
}

export const priceToCurrencyString = (price: any) => {
  return `R$${price},00`
}
