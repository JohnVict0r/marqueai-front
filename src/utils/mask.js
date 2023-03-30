export const maskDate = value => {
  let v = value.slice(0, 10)
  if (v.length >= 5) {
    return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4)}`
  } else if (v.length >= 3) {
    return `${v.slice(0, 2)}/${v.slice(2)}`
  }
  return v
}

export const maskCPF = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

export const maskCNS = value => {
  return value
}

export const maskPhone = value => {
  return value
  .replace(/\D/g, '')
  .replace(/(\d)(\d)/, '($1$2)')
  .replace(/(\d{5})(\d{4})/, '$1-$2')
}

export const maskCEP = value => {
  return value
  .replace(/\D/g, '')
  .replace(/(\d{5})(\d{3})/, '$1-$2')
}

export const maskNumber = value => {
  return value
}
