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

export const minutesToHourString = (minutes: any) => {
  if (!minutes) return
  const hours = Math.trunc(minutes / 60);
  const min = minutes % 60

  return `${hours}h ${min}min`
}

export const dateExtend = (date: any) => {
  const [year, month, day] = date.split('T')[0].split('-')

  return `Dia ${day} de ${textMonths[Number(month)]} de ${year}`
}

export const dateInitial = (date: any) => {
  const [year, month, day] = date.split('T')[0].split('-')

  return `${day}/${month}/${year}`
}
