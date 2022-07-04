const Instrumentos = require("../models/instrumentos")
const TipoInstrumento = require("../models/tipoInstrumento")
const Familia = require("../models/familia")

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
        console.log(error);
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

        if(!instrumento) return res.status(404).json({ message: 'Instrumento no encontrado' })

        res.status(200).json(instrumento)
    } catch (error) {
        console.log(error)
    }
}

const crearInstrumento = async (req, res) => {
    try {
        const { marca, precio, idTipoInstrumento } = req.body
        const instrumento = {
            marca,
            precio,
            idTipoInstrumento,
            createdDate: new Date(),
        }

        const nuevoInstrumento = await Instrumentos.create(instrumento)
        res.status(201).json({ message: 'Instrumento creado', instrumento: nuevoInstrumento })
    } catch (error) {
        console.log(error)
    }
}

const actualizarInstrumento  = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const borrarInstrumento = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    instrumentos,
    instrumento,
    crearInstrumento,
    actualizarInstrumento,
    borrarInstrumento
}

