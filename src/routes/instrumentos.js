const express = require('express')
const { instrumentos, instrumento, crearInstrumento, actualizarInstrumento, borrarInstrumento } = require('../controllers/instrumento')
const { idInstrumento, validacionCrearInstrumento, validacionActualizarInstrumento } = require('../validations/instrumentos')
const router = express.Router()

/**
 * @api {get} /instrumentos/ Obtener todos los instrumentos
 */
router.get('/', instrumentos)

/**
 * @api {get} /instrumentos/:idInstrumento Obtener un instrumento
 */
router.get('/:idInstrumento', idInstrumento, instrumento)

/**
 * @api {post} /instrumentos/ Crear un instrumento
 */
router.post('/', validacionCrearInstrumento, crearInstrumento)

/**
 * @api {put} /instrumentos/:idInstrumento Actualizar un instrumento
*/
router.put('/:idInstrumento', idInstrumento, validacionActualizarInstrumento, actualizarInstrumento)

/**
 * @api {delete} /instrumentos/:idInstrumento Eliminar un instrumento
*/
router.delete('/:idInstrumento', idInstrumento, borrarInstrumento)

module.exports = router
