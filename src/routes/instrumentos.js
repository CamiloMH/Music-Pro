const express = require('express')
const { instrumentos, instrumento, crearInstrumento } = require('../controllers/instrumento')
const router = express.Router()

/**
 * @api {get} /instrumentos/ Obtener todos los instrumentos
 */
router.get('/', instrumentos)

/**
 * @api {get} /instrumentos/:idInstrumento Obtener un instrumento
 */
router.get('/:idInstrumento', instrumento)

/**
 * @api {post} /instrumentos/ Crear un instrumento
 */
router.post('/', crearInstrumento)

/**
 * @api {put} /instrumentos/:idInstrumento Actualizar un instrumento
*/
router.put('/:idInstrumento',)

/**
 * @api {delete} /instrumentos/:idInstrumento Eliminar un instrumento
*/
router.delete('/:idInstrumento',)

module.exports = router