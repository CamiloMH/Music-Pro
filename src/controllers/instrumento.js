const Instrumentos = require('../models/instrumentos')
const TipoInstrumento = require('../models/tipoInstrumento')
const { Familia } = require('../models/index')
const { handleError } = require('../utils/handleError')

const instrumentos = async (req, res) => {
  let { limit = 20, pagination = 1 } = req.query
  limit = parseInt(limit) || 20
  pagination = parseInt(pagination) || 1
  try {
    const instrumentos = await Instrumentos.findAll({
      include: {
        model: TipoInstrumento,
        attributes: {
          exclude: ['createdDate', 'updatedDate', 'idTipoInstrumento', 'idFamilia']
        },
        include: {
          model: Familia,
          attributes: {
            exclude: ['createdDate', 'updatedDate', 'idFamilia']
          }
        }
      },
      limit,
      offset: (pagination - 1) * limit
    })

    res.status(200).json(instrumentos)
  } catch (error) {
    handleError(error, 500, res)
  }
}

const instrumento = async (req, res) => {
  try {
    const { idInstrumento } = req.params
    const instrumento = await Instrumentos.findByPk(idInstrumento, {
      include: {
        model: TipoInstrumento,
        attributes: {
          exclude: ['createdDate', 'updatedDate', 'idTipoInstrumento', 'idFamilia']
        },
        include: {
          model: Familia,
          attributes: {
            exclude: ['createdDate', 'updatedDate', 'idFamilia']
          }
        }
      }
    })

    res.status(200).json(instrumento)
  } catch (error) {
    handleError(error, 500, res)
  }
}

const crearInstrumento = async (req, res) => {
  try {
    const { marca, precio, modelo, idTipoInstrumento } = req.body
    const instrumento = {
      marca,
      precio,
      modelo,
      idTipoInstrumento,
      createdDate: new Date()
    }

    await Instrumentos.create(instrumento)
    res.status(201).json({ message: 'Instrumento creado' })
  } catch (error) {
    handleError(error, 500, res)
  }
}

const actualizarInstrumento = async (req, res) => {
  try {
    const { idInstrumento } = req.params
    const { marca, precio, modelo, idTipoInstrumento } = req.body

    const instrumento = {
      marca,
      precio,
      modelo,
      idTipoInstrumento,
      updatedDate: new Date()
    }

    await Instrumentos.update(instrumento, {
      where: {
        idInstrumento
      }
    })

    res.status(200).json({ message: 'Instrumento actualizado' })
  } catch (error) {
    handleError(error, 500, res)
  }
}

const borrarInstrumento = async (req, res) => {
  try {
    const { idInstrumento = null } = req.params

    await Instrumentos.destroy({
      where: {
        idInstrumento
      }
    })

    res.status(200).json({ message: 'Instrumento eliminado' })
  } catch (error) {
    handleError(error, 500, res)
  }
}

module.exports = {
  instrumentos,
  instrumento,
  crearInstrumento,
  actualizarInstrumento,
  borrarInstrumento
}
