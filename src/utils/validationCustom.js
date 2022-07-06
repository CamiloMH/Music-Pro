const Instrumentos = require('../models/instrumentos')
const TipoInstrumento = require('../models/tipoInstrumento')
const { Op } = require('sequelize')

const buscarPorIdInstrumento = async (idInstrumento) => {
  idInstrumento = parseInt(idInstrumento)

  const instrumento = await Instrumentos.findOne({
    where: {
      idInstrumento
    }
  })

  if (!instrumento) throw new Error('Instrumento no encontrado')

  return true
}

const buscarPorTipoInstrumento = async (idTipoInstrumento) => {
  if (typeof idTipoInstrumento === 'string') throw new Error('El IdTipoInstrumento debe ser un número')

  if (idTipoInstrumento <= 0) throw new Error('El IdTipoInstrumento debe ser mayor a 0')
  if (idTipoInstrumento > 99) throw new Error('El IdTipoInstrumento debe ser menor a 2 digitos')

  const tipoInstrumento = await TipoInstrumento.findOne({
    where: {
      idTipoInstrumento
    }
  })

  if (!tipoInstrumento) throw new Error('TipoInstrumento no encontrado')

  return true
}

const validarModeloExiste = async (modelo, idInstrumento) => {
  if (!idInstrumento) {
    const instrumento = await Instrumentos.findOne({
      where: {
        modelo
      }
    })

    if (instrumento) throw new Error('El modelo ya existe')
  }

  const buscarInstrumentoPorIdInstrumento = await Instrumentos.findOne({
    where: {
      idInstrumento: {
        [Op.ne]: idInstrumento
      },
      modelo
    }
  })

  if (buscarInstrumentoPorIdInstrumento) throw new Error('El modelo ya existe')

  return true
}

const validarPrecio = async (precio) => {
  if (typeof precio === 'string') throw new Error('El precio debe ser un número')

  if (precio <= 0) throw new Error('El precio debe ser mayor a 0')
  if (precio > 99999999) throw new Error('El precio debe ser menor a 8 digitos')
  return true
}

module.exports = {
  buscarPorIdInstrumento,
  validarPrecio,
  buscarPorTipoInstrumento,
  validarModeloExiste
}
