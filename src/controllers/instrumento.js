const Instrumentos = require('../models/instrumentos')
const TipoInstrumento = require('../models/tipoInstrumento')
const { Familia } = require('../models/index')

const instrumentos = async (req, res) => {
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
      }
    })

    res.status(200).json(instrumentos)
  } catch (error) {
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
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
    console.log(error)
  }
}

module.exports = {
  instrumentos,
  instrumento,
  crearInstrumento,
  actualizarInstrumento,
  borrarInstrumento
}
