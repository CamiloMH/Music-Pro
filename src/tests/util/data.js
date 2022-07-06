
const familia =
  {
    nombre: 'cuerdas'
  }

const tiposInstrumentos = [
  {
    nombre: 'guitarras',
    idFamilia: 1
  },
  {
    nombre: 'bajo',
    idFamilia: 1
  }
]

const instrumentos = [
  {
    marca: 'Ibanez',
    precio: 500000,
    modelo: 'RGA42FNE',
    idTipoInstrumento: 1
  },
  {
    marca: 'Marshall',
    precio: 1000000,
    modelo: 'Acton II',
    idTipoInstrumento: 2
  }
]

const newInstrumento = {
  marca: 'YAMAHA',
  precio: 500000,
  modelo: 'C40',
  idTipoInstrumento: 1
}

module.exports = {
  familia,
  tiposInstrumentos,
  instrumentos,
  newInstrumento
}
